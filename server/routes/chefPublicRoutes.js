import express from 'express';
import {
  getChefs,
  getChefById
} from '../controllers/chefPublicController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getChefs)
router.route('/:id')
  .get(getChefById)

export default router;
