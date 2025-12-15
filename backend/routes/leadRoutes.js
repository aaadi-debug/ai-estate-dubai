//backend/routes/leadRoutes.js
import express from 'express';
import { createLead } from '../controllers/leadController.js';

const router = express.Router();

router.post('/new', createLead);

export default router;