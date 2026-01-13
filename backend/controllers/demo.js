// backend/controllers/razorpayController.js  

import Agent from '../models/Agent.js';
import crypto from 'crypto';

// ──────────────────────── IMPORTANT: NO TOP-LEVEL RAZORPAY INSTANCE ────────────────────────

let razorpayInstance = null;

async function getRazorpay() {
  if (!razorpayInstance) {
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      throw new Error('Razorpay keys are missing! Check your .env file.');
    }

    // Dynamic import for ESM compatibility
    const { default: Razorpay } = await import('razorpay');

    razorpayInstance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    console.log('✓ Razorpay instance created successfully');
  }
  return razorpayInstance;
}

// ──────────────────────────────────────────────────────────────────────────────────────────────

export const createOrder = async (req, res) => {
  try {
    const razorpay = await getRazorpay(); // ← safe here, after dotenv has run

    const { plan, agentId } = req.body;

    if (!plan || !agentId || !planPrices[plan]) {
      return res.status(400).json({ error: 'Invalid plan or agentId' });
    }

    // Monthly amount
    const monthlyAmount = planPricesUSD[plan]; // e.g. 149

    // One-time setup fee per plan (in USD)
    const setupFees = {
      starter: 0,
      professional: 199,
      elite: 499,
    };

    const oneTimeFee = setupFees[plan] || 0;

    // Total first payment = monthly + one-time (in USD)
    const totalFirstPayment = monthlyAmount + oneTimeFee;

    // Convert to paise (Razorpay uses smallest unit)
    const amountInPaise = totalFirstPayment * 100;

    const order = await razorpay.orders.create({
      amount: amountInPaise, // convert to paise (USD * 100)
      currency: 'USD',                   // ← change to USD
      receipt: `rec_${agentId.slice(-8)}_${Date.now().toString().slice(-6)}`,
      notes: { 
        agentId, 
        plan,
        monthlyAmount,
        oneTimeFee,
        totalFirstPayment 
      }
    });

    res.json({
      success: true,
      orderId: order.id,
      amount: order.amount,              // total amount sent to Razorpay
      displayAmount: totalFirstPayment,  // optional: for frontend display
      monthlyAmount,
      oneTimeFee,
    });
  } catch (error) {
    console.error('Create order failed:', error);
    res.status(500).json({ error: 'Failed to create Razorpay order' });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      agentId,
      plan
    } = req.body;

    const sign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (sign === razorpay_signature) {
      await Agent.findByIdAndUpdate(agentId, { plan });
      return res.json({ success: true, message: 'Payment verified & plan activated' });
    }

    return res.status(400).json({ success: false, error: 'Invalid signature' });
  } catch (error) {
    console.error('Verify payment failed:', error);
    res.status(500).json({ error: 'Payment verification failed' });
  }
};

// You can keep these if you want (but move them outside functions)
const planPrices = {
  starter: 14900,
  professional: 49900,
  elite: 99900
};

const planPricesUSD = {
  starter: 149,     // $149
  professional: 499,
  elite: 999
};

// ──────────────────────────────────────────────────────────────────────────────────────────────
export const handleSubscriptionWebhook = async (req, res) => {
  try {
    const signature = req.headers['x-razorpay-signature'];
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

    if (!webhookSecret) {
      console.error('Webhook secret missing in .env');
      return res.status(500).send('Server error');
    }

    // Verify signature
    const isValid = crypto
      .createHmac('sha256', webhookSecret)
      .update(JSON.stringify(req.body))
      .digest('hex') === signature;

    if (!isValid) {
      console.error('Invalid webhook signature');
      return res.status(400).send('Invalid signature');
    }

    const event = req.body.event;
    const payload = req.body.payload;

    console.log('[WEBHOOK] Received event:', event);

    if (event === 'subscription.activated') {
      const sub = payload.subscription.entity;
      const notes = sub.notes;
      const agentId = notes.agentId;
      const plan = notes.plan;

      if (agentId && plan) {
        await Agent.findByIdAndUpdate(agentId, {
          plan,
          planExpiry: new Date(sub.current_end * 1000), // next billing date
        });
        console.log(`[WEBHOOK] Plan activated for agent ${agentId}: ${plan}`);
      } else {
        console.error('[WEBHOOK] Missing agentId or plan in notes');
      }
    }

    if (event === 'subscription.cancelled') {
      const sub = payload.subscription.entity;
      const agentId = sub.notes?.agentId;

      if (agentId) {
        await Agent.findByIdAndUpdate(agentId, { plan: 'none' });
        console.log(`[WEBHOOK] Subscription cancelled for agent ${agentId}`);
      }
    }

    if (event === 'payment.failed') {
      // Optional: notify admin/agent
      console.log('[WEBHOOK] Payment failed:', payload.payment.entity.id);
    }

    res.status(200).send('Webhook received');
  } catch (error) {
    console.error('[WEBHOOK] Error:', error);
    res.status(500).send('Webhook error');
  }
};