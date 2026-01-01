//backend/routes/leadRoutes.js
import express from 'express';
// import { createLead } from '../controllers/leadController.js';
import { createLead, getAgentLeads, updateLeadStatus } from '../controllers/leadController.js';

const router = express.Router();

router.post('/new', createLead);
router.get('/agent', getAgentLeads); // New route
router.patch('/:id/status', updateLeadStatus); // For marking contacted

export default router;