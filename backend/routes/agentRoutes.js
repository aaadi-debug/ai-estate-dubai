// backend/routes/agentRoutes.js
import express from 'express';
import {
  getProfile,
  updateProfile,
  getUsageStats,
  updateNotifications,
  // incrementConversation
} from '../controllers/agentController.js';

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

export default router;