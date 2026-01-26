// backend/routes/agentRoutes.js
import express from 'express';
import {
  getProfile,
  updateProfile,
  getUsageStats,
  updateNotifications,
  deleteAccount,
  getAllAgents
  // incrementConversation
} from '../controllers/agentController.js';

import { adminOnly } from '../middleware/admin.js';

const router = express.Router();

// Profile routes
router.get('/profile/:agentId', getProfile);
router.put('/profile/:agentId', updateProfile);

// Usage / plan stats
router.get('/usage/:agentId', getUsageStats);

// Keep your test route if you want
router.get('/test', (req, res) => {
  res.json({ message: 'Agent routes working' });
});

router.put('/notifications/:agentId', updateNotifications);
// router.post('/conversation/increment', incrementConversation);

router.post('/delete/:agentId', deleteAccount);

router.get('/all', adminOnly, getAllAgents); // Add this

export default router;