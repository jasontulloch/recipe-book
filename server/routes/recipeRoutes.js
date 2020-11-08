import express from 'express';
import {
  getRecipes,
  getRecipeById,
  deleteRecipe,
  createRecipe,
  updateRecipe,
} from '../controllers/recipeController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getRecipes)
  .post(protect, createRecipe)
router.route('/:id')
  .get(getRecipeById)
  .delete(protect, deleteRecipe)
  .put(protect, updateRecipe)

export default router;
