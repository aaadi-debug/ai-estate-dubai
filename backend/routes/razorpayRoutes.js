// backend/routes/razorpayRoutes.js
import express from 'express';
import { createOrder, verifyPayment, handleSubscriptionWebhook } from '../controllers/razorpayController.js';

const router = express.Router();

router.post('/create-order', createOrder);
router.post('/verify-payment', verifyPayment);
router.post('/webhook', express.raw({ type: 'application/json' }), handleSubscriptionWebhook); // ← NEW

export default router;