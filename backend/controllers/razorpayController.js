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

    const order = await razorpay.orders.create({
      amount: planPricesUSD[plan] * 100, // convert to paise (USD * 100)
      currency: 'USD',                   // ← change to USD
      receipt: `rec_${agentId.slice(-8)}_${Date.now().toString().slice(-6)}`,
      notes: { agentId, plan }
    });

    res.json({
      success: true,
      orderId: order.id,
      amount: order.amount
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
  starter: 1,     // $149
  professional: 499,
  elite: 999
};