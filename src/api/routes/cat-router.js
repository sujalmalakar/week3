import express from 'express';

import {
  getAllCats,
  getOneCat,
  postCat,
  putCat,
  deleteCat,
} from '../controllers/cat-controller.js';

const router = express.Router();

router.get('/', getAllCats);
router.get('/:id', getOneCat);
router.post('/', postCat);
router.put('/:id', putCat);
router.delete('/:id', deleteCat);

export default router;
