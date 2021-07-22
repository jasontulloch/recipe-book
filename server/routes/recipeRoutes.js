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
  removeRecipeFromCookbook,
  getMostRecentRecipesLimited,
  getMostRecentRecipes,
  getHighestRatedRecipesLimited,
  getHighestRatedRecipes,
  getFiveIngredientsOrFewerRecipes,
  getTenIngredientsOrFewerRecipes,
  getFiveStepsOrFewerRecipes,
  getTenStepsOrFewerRecipes,
  getThirtyMinutesAndUnderRecipes,
  getSixtyMinutesAndUnderRecipes,
} from '../controllers/recipeController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Note that route order matters, tried putting mostRecentRecipes at end and had issues
router.route('/')
  .get(getRecipes)
  .post(protect, createRecipe)
router.route('/recipeNames').get(getRecipeNames)
router.route('/advanced-search-results').get(getRecipesAdvancedSearchAll)
router.route('/myrecipes').get(protect, getMyRecipes)
router.route('/savedrecipes').get(protect, getMySavedRecipes)
router.route('/mostRecentRecipesLimited').get(getMostRecentRecipesLimited)
router.route('/mostRecentRecipes').get(getMostRecentRecipes)
router.route('/highestRatedRecipesLimited').get(getHighestRatedRecipesLimited)
router.route('/highestRatedRecipes').get(getHighestRatedRecipes)
router.route('/fiveIngredientsOrFewerRecipes').get(getFiveIngredientsOrFewerRecipes)
router.route('/tenIngredientsOrFewerRecipes').get(getTenIngredientsOrFewerRecipes)
router.route('/fiveStepsOrFewerRecipes').get(getFiveStepsOrFewerRecipes)
router.route('/tenStepsOrFewerRecipes').get(getTenStepsOrFewerRecipes)
router.route('/thirtyMinutesAndUnderRecipes').get(getThirtyMinutesAndUnderRecipes)
router.route('/sixtyMinutesAndUnderRecipes').get(getSixtyMinutesAndUnderRecipes)
router.route('/:id/upvotes').post(protect, createRecipeUpvote)
router.route('/:id/downvotes').post(protect, createRecipeDownvote)
router.route('/:id/save')
  .post(protect, saveRecipe)
  .delete(protect, unsaveRecipe)
router.route('/:id/saveIngredients').post(protect, saveIngredients)
router.route('/:id')
  .get(getRecipeById)
  .delete(protect, deleteRecipe)
  .put(protect, updateRecipe)
router.route('/:id/saveToCookbook').post(protect, saveRecipeToCookbook)
router.route('/:id/removeFromCookbook').delete(protect, removeRecipeFromCookbook)


export default router;
