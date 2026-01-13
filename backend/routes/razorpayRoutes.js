// backend/routes/razorpayRoutes.js
import express from 'express';
import { createSubscription, handleSubscriptionWebhook, verifyPayment } from '../controllers/razorpayController.js';

const router = express.Router();

router.post('/create-subscription', createSubscription); // NEW
router.post('/verify-payment', verifyPayment); // Optional
router.post('/webhook', handleSubscriptionWebhook); // Add this

export default router;