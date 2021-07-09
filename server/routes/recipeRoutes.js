import express from 'express';
import {
  getRecipeNames,
  getRecipes,
  getRecipesAdvancedSearchAll,
  getMyRecipes,
  getMySavedRecipes,
  getRecipeById,
  deleteRecipe,
  createRecipe,
  updateRecipe,
  createRecipeUpvote,
  createRecipeDownvote,
  saveRecipe,
  unsaveRecipe,
  saveIngredients,
  saveRecipeToCookbook,
} from '../controllers/recipeController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getRecipes)
  .post(protect, createRecipe)
router.route('/recipeNames')
  .get(getRecipeNames)
router.route('/advanced-search-results')
  .get(getRecipesAdvancedSearchAll)
router.route('/myrecipes')
  .get(protect, getMyRecipes)
router.route('/savedrecipes')
  .get(protect, getMySavedRecipes)
router.route('/:id/upvotes')
  .post(protect, createRecipeUpvote)
router.route('/:id/downvotes')
  .post(protect, createRecipeDownvote)
router.route('/:id/save')
  .post(protect, saveRecipe)
  .delete(protect, unsaveRecipe)
router.route('/:id/saveIngredients')
  .post(protect, saveIngredients)
router.route('/:id')
  .get(getRecipeById)
  .delete(protect, deleteRecipe)
  .put(protect, updateRecipe)
  router.route('/:id/saveToCookbook')
    .post(protect, saveRecipeToCookbook)

export default router;
