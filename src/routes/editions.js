import express from 'express';
import { editionController } from '../controllers/editionController.js';
import verifyToken from '../middlewares/verifyToken.js';
import isAdmin from '../middlewares/isAdmin.js';
const router = express.Router();

router.get('/', verifyToken, isAdmin, editionController.getAllEditions)
router.post('/', verifyToken, isAdmin, editionController.createEdition)
router.get('/active/categories', verifyToken, editionController.getActiveEditionCategories)
router.get('/categories', editionController.getLastEditionCategories)
router.get('/:editionId/categories', verifyToken, isAdmin, editionController.getEditionCategories)
router.get('/:editionId/available-categories', verifyToken, isAdmin, editionController.getAvailableCategoriesForEdition)
router.get('/:editionCategoryId/nominees', verifyToken, isAdmin, editionController.getEditionCategoryNominees)
router.get('/:editionCategoryId/available-nominees', verifyToken, isAdmin, editionController.getAvailableNominees)
router.post('/:editionId/categories/:categoryId', verifyToken, isAdmin, editionController.addCategoryToEdition)
router.post('/:editionCategoryId/nominees', verifyToken, isAdmin, editionController.addNomineeToEditionCategory)
router.delete('/:editionId/categories/:categoryId', verifyToken, isAdmin, editionController.removeCategoryFromEdition)
router.delete('/:id/nominee', verifyToken, isAdmin, editionController.removeNomineeFromEditionCategory)
router.delete('/:id', verifyToken, isAdmin, editionController.deleteEdition)
router.put('/:id', verifyToken, isAdmin, editionController.updateEdition)

export default router