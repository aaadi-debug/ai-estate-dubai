//backend/routes/leadRoutes.js
import express from 'express';
// import { createLead } from '../controllers/leadController.js';
import { createLead, getAgentLeads, updateLeadStatus, addNote, deleteLead, deleteNote, getAnalytics, getAllLeads } from '../controllers/leadController.js';

import { adminOnly } from '../middleware/admin.js';

const router = express.Router();

router.post('/new', createLead);
router.get('/agent', getAgentLeads); // New route
router.patch('/:id/status', updateLeadStatus); // For marking contacted
router.delete('/:id', deleteLead);

//  Notes
router.post('/:id/notes', addNote);
router.delete('/:leadId/notes/:noteId', deleteNote);

// Analytics
router.get('/analytics', getAnalytics);

router.get('/all', adminOnly, getAllLeads); // Add this

export default router;