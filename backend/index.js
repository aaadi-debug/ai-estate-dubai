// backend/index.js
import dotenv from 'dotenv';
dotenv.config();

// Now all imports will have access to env vars
import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import { rateLimit, ipKeyGenerator } from 'express-rate-limit';

// Routes (we'll create soon)
import agentRoutes from './routes/agentRoutes.js';
import leadRoutes from './routes/leadRoutes.js';
import authRoutes from './routes/authRoutes.js';
import razorpayRoutes from './routes/razorpayRoutes.js';
import { handleSubscriptionWebhook } from './controllers/razorpayController.js';

// console.log("RAZORPAY_KEY_ID     →", process.env.RAZORPAY_KEY_ID ? 'exists' : 'MISSING!');
// console.log("RAZORPAY_KEY_SECRET →", process.env.RAZORPAY_KEY_SECRET ? 'exists' : 'MISSING!');
// Debug env loading (add this after dotenv.config)
console.log('ENV LOADED SUCCESSFULLY:');
console.log('RAZORPAY_KEY_ID exists:', !!process.env.RAZORPAY_KEY_ID);
console.log('RAZORPAY_PLAN_STARTER:', process.env.RAZORPAY_PLAN_STARTER);
console.log('RAZORPAY_PLAN_PROFESSIONAL:', process.env.RAZORPAY_PLAN_PROFESSIONAL);
console.log('RAZORPAY_PLAN_ELITE:', process.env.RAZORPAY_PLAN_ELITE);

// At the top, after dotenv.config()
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

const app = express();

// Middleware
// app.use(cors({
//   origin: true,
//   credentials: true
// }));
app.use(cors({
  origin: FRONTEND_URL,  // ← your frontend URL (hardcode in dev)
  credentials: true,                // ← MUST be true for cookies
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use(cookieParser());

// Connect to DB
connectDB();

// Rate limiting: max 5 leads per IP per hour
// const leadLimiter = rateLimit({
//   windowMs: 60 * 60 * 1000, // 1 hour
//   max: 3, // limit each IP to 5 requests
//   message: { error: 'Too many submissions from this IP. Please try again later.' },
//   standardHeaders: true, // return rate limit info in headers
//   legacyHeaders: false,
//   keyGenerator: (req) => req.ip || 'anonymous', // fallback if no IP
// });
const leadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  limit: 3,                 // ← note: it's now called 'limit' (not 'max')
  message: { error: 'Too many submissions from this IP. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
  
  keyGenerator: (req) => {
    // your fallback logic
    return req.ip ? ipKeyGenerator(req.ip) : 'anonymous';
    //                                        ^^^^^^^^^^^^^^^
    //      this applies proper IPv6 subnet masking
  },
});

// Routes
app.use('/api/agents', agentRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/auth', authRoutes);

// Apply only to leads endpoint
app.use('/api/leads/new', leadLimiter);

// Razorpay routes (with raw for webhook)
app.use('/api/razorpay', razorpayRoutes);
app.post('/api/razorpay/webhook', express.raw({ type: 'application/json' }), handleSubscriptionWebhook); // raw body for signature

app.get('/', (req, res) => {
  res.send('🚀 AI Estate Dubai Backend Running!');
});

// Server Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
