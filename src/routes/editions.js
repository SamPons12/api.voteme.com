import express from 'express';
import { editionController } from '../controllers/editionController.js';
const router = express.Router();

router.get('/', editionController.getAllEditions)
router.get('/active/categories', editionController.getActiveEditionCategories)

export default router