import asyncHandler from 'express-async-handler';
import Recipe from '../models/recipeModel.js';
import Chef from '../models/chefModel.js';

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

// @description Update a recipe
// @route PUT /api/:id
// @access Private
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
    isSoy,
    recipe_cover_image,
  } = req.body

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
    recipe.recipe_cover_image = recipe_cover_image

    const updatedRecipe = await recipe.save()
    res.json(updatedRecipe)

  } else {
      res.status(404)
      throw new Error('Recipe not found')
  }
})

// @description Upvote recipe
// @route POST /api/recipes/:id/upvotes
// @access Private
const createRecipeUpvote = asyncHandler(async (req, res) => {
  const {
    rating
  } = req.body

  const recipe = await Recipe.findById(req.params.id)

  if(recipe) {
    const alreadyUpvoted = recipe.votes.find(
      r => (r.chef.toString() === req.chef._id.toString() && r.rating === 1)
    )

    if(alreadyUpvoted) {
      res.status(400)
      throw new Error('Recipe has already been upvoted')
    }

    const changeFromDownvote = recipe.votes.find(
      r => ((r.chef.toString() === req.chef._id.toString()) && r.rating === -1)
    )

    if(changeFromDownvote) {
      await changeFromDownvote.remove()
      res.json({ message: 'Recipe removed'})
    }

    const vote = {
      username: req.chef.username,
      rating: 1,
      chef: req.chef._id
    }

    recipe.votes.push(vote)

    recipe.netVotes = recipe.votes.reduce((acc, item) => item.rating + acc, 0)

    await recipe.save()

    res.status(201).json({ message: 'Recipe upvoted'})
  } else {
    res.status(400)
    throw new Error('Recipe not found')
  }
})

// @description Downvote recipe
// @route POST /api/recipes/:id/downvotes
// @access Private
const createRecipeDownvote = asyncHandler(async (req, res) => {
  const {
    rating
  } = req.body

  const recipe = await Recipe.findById(req.params.id)

  if(recipe) {
    const alreadyDownvoted = recipe.votes.find(
      r => ((r.chef.toString() === req.chef._id.toString()) && r.rating === -1)
    )

    if(alreadyDownvoted) {
      res.status(400)
      throw new Error('Recipe has already been downvoted')
    }

    const changeFromUpvote = recipe.votes.find(
      r => ((r.chef.toString() === req.chef._id.toString()) && r.rating === 1)
    )

    if(changeFromUpvote) {
      await changeFromUpvote.remove()
      res.json({ message: 'Recipe removed'})
    }

    const vote = {
      username: req.chef.username,
      rating: -1,
      chef: req.chef._id
    }

    recipe.votes.push(vote)

    recipe.netVotes = recipe.votes.reduce((acc, item) => item.rating + acc, 0)

    await recipe.save()

    res.status(201).json({ message: 'Recipe downvoted'})
  } else {
    res.status(400)
    throw new Error('Recipe not found')
  }
})

// @description Save a recipe
// @route POST /api/recipes/:id/save
// @access Private
const saveRecipe = asyncHandler(async (req, res) => {
  const {
    recipe_name
  } = req.body

  const recipe = await Recipe.findById(req.params.id)
  const chef = await Chef.findById(req.chef._id)

  if(recipe) {
    const alreadySaved = chef.savedRecipes.find(
      r => (r._id.toString() === recipe._id.toString())
    )

    if(alreadySaved) {
      res.status(400)
      throw new Error('Recipe has already been saved')
    }

    const savedRecipe = {
      recipe_name: req.recipe
    }

    chef.savedRecipes.push(recipe)

    await chef.save()

    res.status(201).json({ message: 'Recipe saved'})
  } else {
    res.status(400)
    throw new Error('Recipe not saved')
  }
})

export {
  getRecipes,
  getRecipeById,
  deleteRecipe,
  createRecipe,
  updateRecipe,
  createRecipeUpvote,
  createRecipeDownvote,
  saveRecipe
}
