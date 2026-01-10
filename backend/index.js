// backend/index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import { rateLimit, ipKeyGenerator } from 'express-rate-limit';

// Routes (we'll create soon)
import agentRoutes from './routes/agentRoutes.js';
import leadRoutes from './routes/leadRoutes.js';
import authRoutes from './routes/authRoutes.js';
import razorpayRoutes from './routes/razorpayRoutes.js';

dotenv.config();
console.log("RAZORPAY_KEY_ID     →", process.env.RAZORPAY_KEY_ID ? 'exists' : 'MISSING!');
console.log("RAZORPAY_KEY_SECRET →", process.env.RAZORPAY_KEY_SECRET ? 'exists' : 'MISSING!');

const app = express();

// Middleware
app.use(cors({
  origin: true,
  credentials: true
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
app.use('/api/razorpay', razorpayRoutes);

app.get('/', (req, res) => {
  res.send('🚀 AI Estate Dubai Backend Running!');
});

// Server Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
