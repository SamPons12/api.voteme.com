import express from 'express';
import { voteController } from '../controllers/voteController.js';
import verifyToken from '../middlewares/verifyToken.js';
import isAdmin from '../middlewares/isAdmin.js';

const router = express.Router();

router.get('/', verifyToken, isAdmin, voteController.getAllVotes);
router.get('/mine', verifyToken, voteController.getUserVotes);
router.post('/save', verifyToken, voteController.saveVotes)
router.post('/me', verifyToken, voteController.hasUserVoted)

export default router