// backend/routes/agentRoutes.js
import express from 'express';
const router = express.Router();

// Temporary route
router.get('/test', (req, res) => {
  res.json({ message: 'Agent routes working' });
});

export default router;