import asyncHandler from 'express-async-handler';
import Recipe from '../models/recipeModel.js';

// @description Fetch all recipes
// @route GET /api/recipes
// @access Public
const getRecipes = asyncHandler(async (req, res) => {
  const recipes = await Recipe.find({})
  res.json(recipes)
})

// matching the Recipe Model Id with whats in the URL
// @description Fetch single recipe
// @route GET /api/recipe/:id
// @access Public
const getRecipeById = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id)

  if (recipe) {
    res.json(recipe)
  } else {
    res.status(404)
    throw new Error('Recipe not found')
  }
})

// @description Delete a recipe
// @route DELETE /api/recipes/:id
// @access Private
const deleteRecipe = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id)

  if(recipe) {
    await recipe.remove()
    res.json({ message: 'Recipe removed'})
  } else {
    res.status(404)
    throw new Error('Recipe not found')
  }
})

// @description Create a recipe
// @route POST /api/recipes
// @access Private
const createRecipe = asyncHandler(async (req, res) => {
  const recipe = new Recipe({
    chef: req.chef._id,
    recipe_name: 'Sample recipe',
    recipe_cover_image: '/images/sample.jpg',
    step_1: 'Please enter at least 1 step',
    ingredient_1: 'Please enter at least 1 ingredient',
    country: 'n/a',
    cook_time: 60,
    serving_size: 4
  })

  const createdRecipe = await recipe.save()
  res.status(201).json(createdRecipe)
})

export { getRecipes, getRecipeById, deleteRecipe, createRecipe }
