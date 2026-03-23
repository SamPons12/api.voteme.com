import express from 'express'
import { categoryController } from '../controllers/categoryController.js';
import isAdmin from '../middlewares/isAdmin.js';
import verifyToken from '../middlewares/verifyToken.js';

const router = express.Router();

router.get('/', verifyToken, isAdmin, categoryController.getAll)
router.post('/', verifyToken, isAdmin, categoryController.createCategory)
router.put('/:id', verifyToken, isAdmin, categoryController.updateCategory)
router.delete('/:id', verifyToken, isAdmin, categoryController.deleteCategory)

export default router