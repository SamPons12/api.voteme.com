import express from 'express'
import { nomineesController } from '../controllers/nomineeController.js';
const router = express.Router();

router.get('/:categoryId', nomineesController.getNomineeByCategory)

export default router