// backend/routes/contactRoutes.js
import express from 'express';
import { submitContact, getAllMessages, updateMessageStatus } from '../controllers/contactController.js';
import { protect } from '../middleware/auth.js'; // Reuse your existing auth middleware
import { adminOnly } from '../middleware/admin.js';

const router = express.Router();

// Public route - anyone can submit
router.post('/', submitContact);

// Admin-only routes
router.get('/', protect, adminOnly, getAllMessages);
router.patch('/:id/status', protect, adminOnly, updateMessageStatus);

export default router;