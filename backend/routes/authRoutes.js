import express from 'express';
import { signup, login, logout, changePassword } from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.post('/change-password/:agentId', changePassword);

export default router;