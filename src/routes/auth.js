import express from 'express';
import { authController } from '../controllers/authController.js';
import verifyTurnstileToken from '../middlewares/verifyTurnstileToken.js';

const router = express.Router();

router.post('/register', verifyTurnstileToken, authController.register)
router.post('/login', authController.login)
router.get('/verify-email', authController.verifyEmail);

export default router