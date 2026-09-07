import express from 'express';

import {
  getAllUsers,
  getOneUser,
  postUser,
  putUser,
  deleteUser,
} from '../controllers/user-controller.js';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getOneUser);
router.post('/', postUser);
router.put('/:id', putUser);
router.delete('/:id', deleteUser);

export default router;
