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
    steps: ['Please enter at least 1 step'],
    ingredient_1: 'Please enter at least 1 ingredient',
    country: 'n/a',
    cook_time: 60,
    serving_size: 4
  })

  const createdRecipe = await recipe.save()
  res.status(201).json(createdRecipe)
})

const updateRecipe = asyncHandler(async (req, res) => {
  const {
    recipe_name,
    country,
    cook_time,
    serving_size,
    steps,
    ingredients,
    isVegan,
    isVegetarian,
    isGlutenFree,
    isKetogenic,
    isDairy,
    isEgg,
    isNuts,
    isShellfish,
    isSoy
  } = req. body

  const recipe = await Recipe.findById(req.params.id)

  if(recipe) {
    recipe.recipe_name = recipe_name
    recipe.country = country
    recipe.cook_time = cook_time
    recipe.serving_size = serving_size
    recipe.steps = steps
    recipe.ingredients = ingredients
    recipe.isVegan = isVegan
    recipe.isVegetarian = isVegetarian
    recipe.isGlutenFree = isGlutenFree
    recipe.isKetogenic = isKetogenic
    recipe.isDairy = isDairy
    recipe.isEgg = isEgg
    recipe.isNuts = isNuts
    recipe.isShellfish = isShellfish
    recipe.isSoy = isSoy

    const updatedRecipe = await recipe.save()
    res.json(updatedRecipe)

  } else {
      res.status(404)
      throw new Error('Recipe not found')
  }
})

export { getRecipes, getRecipeById, deleteRecipe, createRecipe, updateRecipe }
