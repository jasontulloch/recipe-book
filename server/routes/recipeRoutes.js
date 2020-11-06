import express from 'express';
import {
  getRecipes,
  getRecipeById,
  deleteRecipe,
  createRecipe,
} from '../controllers/recipeController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getRecipes)
  .post(protect, createRecipe)
router.route('/:id')
  .get(getRecipeById)
  .delete(protect, deleteRecipe)

export default router;
