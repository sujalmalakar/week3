import { body } from 'express-validator';
import { upload } from '../../middlewares/upload.js';
import { authenticateToken } from '../../middlewares/authentication.js';
import { validationErrors } from '../../middlewares/error-handlers.js';
import express from 'express';

import {
  getAllCats,
  getOneCat,
  getCatsByUser,
  postCat,
  putCat,
  deleteCat,
} from '../controllers/cat-controller.js';

const router = express.Router();

router.get('/', getAllCats);
router.get('/user/:userId', getCatsByUser);
router.get('/:id', getOneCat);

router.post(
  '/',
  authenticateToken,
  (req, res, next) => {
    upload.single('cat')(req, res, (err) => {
      if (err) {
        err.status = 400;
        return next(err);
      }

      next();
    });
  },
  body('cat_name')
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage('Cat name must be 3-50 characters'),
  body('weight').isNumeric().withMessage('Weight must be a number'),
  body('birthdate').isDate().withMessage('Birthdate must be a valid date'),
  validationErrors,
  postCat,
);

export default router;
