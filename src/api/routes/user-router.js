import express from 'express';

import {
  getAllUsers,
  getOneUser,
  postUser,
  putUser,
  deleteUser,
} from '../controllers/user-controller.js';
import { authenticateToken } from '../../middlewares/authentication.js';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getOneUser);
router.post('/', postUser);
router.put('/:id', authenticateToken, putUser);
router.delete('/:id', authenticateToken, deleteUser);

export default router;
