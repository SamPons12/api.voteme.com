import express from 'express';
import { editionController } from '../controllers/editionController.js';
import verifyToken from '../middlewares/verifyToken.js';
import isAdmin from '../middlewares/isAdmin.js';
const router = express.Router();

router.get('/', verifyToken, isAdmin, editionController.getAllEditions)
router.post('/', verifyToken, isAdmin, editionController.createEdition)
router.get('/active/categories', verifyToken, editionController.getActiveEditionCategories)
router.delete('/:id', verifyToken, isAdmin, editionController.deleteEdition)
router.put('/:id', verifyToken, isAdmin, editionController.updateEdition)

export default router