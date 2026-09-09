import { authenticateToken } from '../../middlewares/authentication.js';
import multer from 'multer';
import express from 'express';

import {
  getAllCats,
  getOneCat,
  getCatsByUser,
  postCat,
  putCat,
  deleteCat,
} from '../controllers/cat-controller.js';

const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.get('/', getAllCats);
router.get('/user/:userId', getCatsByUser);
router.get('/:id', getOneCat);

router.post('/', authenticateToken, upload.single('cat'), postCat);

router.put('/:id', authenticateToken, putCat);
router.delete('/:id', authenticateToken, deleteCat);

export default router;
