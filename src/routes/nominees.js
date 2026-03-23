import express from 'express'
import { nomineesController } from '../controllers/nomineeController.js';
import verifyToken from '../middlewares/verifyToken.js';
import isAdmin from '../middlewares/isAdmin.js';
import { uploadNomineeImage } from '../config/upload.js';
const router = express.Router();

router.get('/', verifyToken, isAdmin, nomineesController.getAllNominees)
router.post('/', verifyToken, isAdmin, uploadNomineeImage.single('image'), nomineesController.createNominee)
router.get('/:nomineeId', verifyToken, nomineesController.getNomineeById)
router.put('/:nomineeId', verifyToken, isAdmin, uploadNomineeImage.single('image'), nomineesController.updateNominee)
router.delete('/:nomineeId', verifyToken, isAdmin, nomineesController.deleteNominee)
router.get('/category/:categoryId', nomineesController.getNomineeByCategory)

export default router