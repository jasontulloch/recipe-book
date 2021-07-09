import express from 'express';
import {
  createCookbook,
  getMyCookbooks,
  getCookbookById,
} from '../controllers/cookbookController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createCookbook)
router.route('/mycookbooks')
  .get(protect, getMyCookbooks)
  router.route('/:id')
    .get(getCookbookById)

export default router;
