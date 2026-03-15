import express from 'express';
import { voteController } from '../controllers/voteController.js';
import verifyToken from '../middlewares/verifyToken.js';

const router = express.Router();

router.post('/save', verifyToken, voteController.saveVotes)
router.post('/me', verifyToken, voteController.hasUserVoted)

export default router