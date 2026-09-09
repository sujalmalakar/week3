import { body } from 'express-validator';
import express from 'express';

import {
  getAllUsers,
  getOneUser,
  postUser,
  putUser,
  deleteUser,
} from '../controllers/user-controller.js';
import { authenticateToken } from '../../middlewares/authentication.js';
import { validationErrors } from '../../middlewares/error-handlers.js';

const router = express.Router();

router.post(
  '/',
  body('email').trim().isEmail().withMessage('Valid email is required'),
  body('username')
    .trim()
    .isLength({ min: 3, max: 20 })
    .isAlphanumeric()
    .withMessage('Username must be 3-20 alphanumeric characters'),
  body('password')
    .trim()
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters'),
  validationErrors,
  postUser,
);
router.put('/:id', authenticateToken, putUser);
router.delete('/:id', authenticateToken, deleteUser);

export default router;
