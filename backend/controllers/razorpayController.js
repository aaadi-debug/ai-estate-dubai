// backend/controllers/razorpayController.js  
import Agent from '../models/Agent.js';
import crypto from 'crypto';

// ──────────────────────── Razorpay Instance ────────────────────────
let razorpayInstance = null;

async function getRazorpay() {
  if (!razorpayInstance) {
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      throw new Error('Razorpay keys are missing! Check your .env file.');
    }

    const { default: Razorpay } = await import('razorpay');

    razorpayInstance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    console.log('✓ Razorpay instance created successfully');
  }
  return razorpayInstance;
}

// ──────────────────────── Plan Configurations ────────────────────────
// Monthly amounts in USD (without cents multiplication)
const planPricesUSD = {
  starter: 149,
  professional: 349,
  elite: 499
};

// One-time setup fees in USD
const setupFees = {
  starter: 0,
  professional: 199,
  elite: 499
};

// Razorpay Plan IDs from .env (paste from dashboard)
// const PLAN_IDS = {
//   starter: process.env.RAZORPAY_PLAN_STARTER,
//   professional: process.env.RAZORPAY_PLAN_PROFESSIONAL,
//   elite: process.env.RAZORPAY_PLAN_ELITE
// };

// ──────────────────────── Create Subscription ────────────────────────
export const createSubscription = async (req, res) => {
  try {
    const razorpay = await getRazorpay();

    const { plan, agentId } = req.body;

    // Define PLAN_IDS here — now it reads env at runtime
    const PLAN_IDS = {
      starter: process.env.RAZORPAY_PLAN_STARTER,
      professional: process.env.RAZORPAY_PLAN_PROFESSIONAL,
      elite: process.env.RAZORPAY_PLAN_ELITE,
    };

    console.log('[CREATE-SUB] Received body:', req.body); // ← ADD THIS
    console.log('[CREATE-SUB] Plan:', plan);
    console.log('[CREATE-SUB] AgentId:', agentId);
    console.log('[CREATE-SUB] PLAN_IDS:', PLAN_IDS); // ← shows your .env values

    if (!plan || !agentId || !PLAN_IDS[plan]) {
      console.log('[CREATE-SUB] Validation failed - missing:', {
        planMissing: !plan,
        agentIdMissing: !agentId,
        planIdNotFound: !PLAN_IDS[plan]
      });
      return res.status(400).json({ error: 'Invalid plan or agent' });
    }

    const monthlyAmount = planPricesUSD[plan];
    // const setupFee = setupFees[plan];

    // Create subscription - starts IMMEDIATELY (no start_at)
    const subscription = await razorpay.subscriptions.create({
      plan_id: PLAN_IDS[plan],
      total_count: 999, // Practically unlimited (Razorpay max is 999)
      quantity: 1,
      customer_notify: 1, // Send emails/SMS to customer
      // start_at: Math.floor(Date.now() / 1000) + 300, // Start after 5 mins (for testing)
      notes: {
        agentId,
        plan,
        monthlyAmount,
        // setupFee
      },
      // addons: setupFee > 0 ? [{
      //   item: {
      //     name: `${plan} Setup Fee`,
      //     amount: setupFee * 100, // in paise/cent
      //     currency: 'USD',
      //   }
      // }] : [],
    });

    res.json({
      success: true,
      subscriptionId: subscription.id,
      short_url: subscription.short_url, // Razorpay hosted payment page URL
      firstPaymentAmount: monthlyAmount * 100, // total first in paise
      monthlyAmount,          // ← add this
      // setupFee                // ← add this
    });
  } catch (error) {
    console.error('Create subscription failed:', error);
    // Better error message for frontend
    const message = error?.error?.description || 'Razorpay subscription error';
    res.status(500).json({ error: message });
  }
};

// ──────────────────────── Verify Payment (Optional for Subscriptions) ────────────────────────
export const verifyPayment = async (req, res) => {
  // Keep if you need manual verification, but subscriptions handle via webhook
  // ... your existing code ...
};

// ──────────────────────── Webhook Handler ────────────────────────
export const handleSubscriptionWebhook = async (req, res) => {
  try {
    const signature = req.headers['x-razorpay-signature'];
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

    // Verify signature
    const isValid = crypto
      .createHmac('sha256', webhookSecret)
      .update(req.body)
      .digest('hex') === signature;

    if (!isValid) {
      console.error('Invalid webhook signature');
      return res.status(400).send('Invalid signature');
    }

    const event = req.body.event;
    const payload = req.body.payload;

    console.log('[WEBHOOK] Event:', event);

    if (event === 'subscription.activated') {
      const sub = payload.subscription.entity;
      const notes = sub.notes || {};
      const agentId = notes.agentId;
      const plan = notes.plan;

      if (agentId && plan) {
        const nextBilling = new Date(sub.current_end * 1000);
        await Agent.findByIdAndUpdate(agentId, {
          plan,
          planExpiry: nextBilling,
        });
        console.log(`[WEBHOOK] Activated ${plan} for agent ${agentId} - first charge successful, next due: ${nextBilling}`);
      }
    }

    if (event === 'subscription.cancelled') {
      const sub = payload.subscription.entity;
      const agentId = sub.notes?.agentId;

      if (agentId) {
        await Agent.findByIdAndUpdate(agentId, { plan: 'none' });
        console.log(`[WEBHOOK] Cancelled subscription for agent ${agentId}`);
      }
    }

    res.status(200).send('OK');
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).send('Webhook error');
  }
};

// Remove old planPrices (not needed for subscriptions)