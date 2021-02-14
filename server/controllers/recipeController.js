import asyncHandler from 'express-async-handler';
import Recipe from '../models/recipeModel.js';
import Chef from '../models/chefModel.js';

// @description Fetch all recipes
// @route GET /api/recipes
// @access Public
const getRecipes = asyncHandler(async (req, res) => {
  const pageSize = 4
  const page = Number(req.query.pageNumber) || 1

  // If there is a keyword query, then return
  // regex will let us take partial searches (e.g. "pizz")
  // options 'i' is case insensitive
  const keywordRecipeName = req.query.keywordRecipeName ? {
    recipe_name: {
      $regex: req.query.keywordRecipeName,
      $options: 'i'
    }
  } : {}

  const count = await Recipe.countDocuments({ ...keywordRecipeName })

  const recipes = await Recipe.find({ ...keywordRecipeName })
    //.limit(pageSize)
    //.skip(pageSize * (page - 1))

  res.json({ recipes })
  //res.json({ recipes, page, pages: Math.ceil(count / pageSize) })
})

// @description Fetch all recipes (advanced search)
// @route GET /api/recipes/search
// @access Public
const getRecipesAdvancedSearchAll = asyncHandler(async (req, res) => {
  //const pageSize = 4
  //const page = Number(req.query.pageNumber) || 1

  //const recipesInitial = await Recipe.find({ })

  //const keywordRecipeName = [req.query.keywordRecipeName]
  //const keywordRecipeNameClean = keywordRecipeName.toString().toLowerCase().trim()
  //const keywordCountry = [req.query.keywordCountry]
  //const keywordCountryClean = keywordCountry.toString().toLowerCase().trim()

  //const newRecipeNameRecipes = recipesInitial.filter(function(recipe) {
  //  return recipe.recipe_name.toLowerCase().includes(keywordRecipeNameClean)
  //})

  //const recipes = newRecipeNameRecipes.filter(function(recipe) {
  //  return recipe.country.toLowerCase().includes(keywordCountryClean)
  //})

  //const recipes = recipesInitial.filter(function(recipe) {
  //  return (
  //    recipe.country.toLowerCase().includes(keywordCountryClean) &&
  //    recipe.recipe_name.toLowerCase().includes(keywordRecipeNameClean)
  //  )
  //})


  //const recipes = recipesInitial.filter(function(recipe) {
  //  return (
  //    recipe.recipe_name.toLowerCase().indexOf(req.query.keywordRecipeName.toLowerCase()) >= 0 ||
  //    recipe.country.toLowerCase().indexOf(req.query.keywordCountry.toLowerCase()) >= 0
  //  )
  //})

  //Note we only need the image and maybe a few other pieces (don't get full recipe)

  //const finalSearch = newCountryRecipes
  //  .limit(pageSize)
  //  .skip(pageSize * (page - 1))

  // Note: This is how you count, below
  //const count = newCountryRecipes.length

  const keywordRecipeName = req.query.keywordRecipeName ? {
    recipe_name: {
      $regex: req.query.keywordRecipeName,
      $options: 'i'
    }
  } : {}

  const keywordCountry = req.query.keywordCountry ? {
    country: {
      $regex: req.query.keywordCountry,
      $options: 'i'
    }
  } : {}

  //const keywordCookTime = req.query.keywordCookTime ? {
  //  cook_time: {
  //    $eq: req.query.keywordCookTime
  //  }
  //} : {}

  const keywordChefName = [req.query.keywordChefName]
  const keywordChefNameClean = keywordChefName.toString().toLowerCase().trim()
  const chefs = await Chef.find({ })
  const findChef = chefs.filter(function(chef) {
    return chef.first_name.toLowerCase().includes(keywordChefNameClean)
  })
  const findChefId = findChef.map(id => id._id)

  const keywordChefId = findChefId ? {
    chef: {
      $eq: findChefId
    }
  } : {}

  //const pageSize = 4
  //const page = Number(req.query.pageNumber) || 1

  // If there is a keyword query, then return
  // regex will let us take partial searches (e.g. "pizz")
  // options 'i' is case insensitive
  //const keywordRecipeName = req.query.keywordRecipeName ? {
  //  recipe_name: {
  //    $regex: req.query.keywordRecipeName,
  //    $options: 'i'
  // }
  //} : {}

  //const keywordCountry = req.query.keywordCountry ? {
  //  country: {
  //    $regex: req.query.keywordCountry,
  //    $options: 'i'
  //  }
  //} : {}

  const recipes = await Recipe.find({
    //and below is finding both (don't technically need the and)
    $and: [
      {...keywordRecipeName},
      {...keywordCountry},
      {...keywordChefId}
    ],
  })

  //const count = await Recipe.countDocuments({ ...keywordRecipeName }).countDocuments({ ...keywordCountry })

  res.json({ recipes })

  //const count = await Recipe.countDocuments({ ...keywordRecipeName }).countDocuments({ ...keywordCountry })

  //const recipes = await Recipe.find({ ...keywordRecipeName }).find({ ...keywordCountry })
  //  .limit(pageSize)
  //  .skip(pageSize * (page - 1))

  //  res.json({ recipes, page, pages: Math.ceil(count / pageSize) })

})


// @description Fetch my recipes
// @route GET /api/recipe/myrecipes
// @access Private
const getMyRecipes = asyncHandler(async (req, res) => {
  // Returns all recipes
  const recipes = await Recipe.find({})
  // Returns the current chef
  const chef = await Chef.findById(req.chef._id)
  // Returns all distinct values as an array
  const myRecipesId = await [... new Set(chef.myRecipes.map(id => id._id))]
  // Convert the array values to a string
  const myRecipesIdToString = myRecipesId.toString()
  // Filter all recipes to find the ones that match the array of string IDs
  const myRecipes = recipes.filter(function(recipe) {
    return myRecipesIdToString.indexOf(recipe._id) !== -1
  })
  // Returns the filtered array as a JSON object
  res.json(myRecipes)
})

// @description Fetch my saved recipes
// @route GET /api/recipe/savedrecipes
// @access Private
const getMySavedRecipes = asyncHandler(async (req, res) => {
  // Returns all recipes
  const recipes = await Recipe.find({})
  // Returns the current chef
  const chef = await Chef.findById(req.chef._id)
  // Returns all distinct values as an array
  const mySavedRecipesId = await [... new Set(chef.savedRecipes.map(id => id._id))]
  // Convert the array values to a string
  const mySavedRecipesIdToString = mySavedRecipesId.toString()
  // Filter all recipes to find the ones that match the array of string IDs
  const mySavedRecipes = recipes.filter(function(recipe) {
    return mySavedRecipesIdToString.indexOf(recipe._id) !== -1
  })
  // Returns the filtered array as a JSON object
  res.json(mySavedRecipes)
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
  const chef = await Chef.findById(req.chef._id)

  if(recipe) {
    await recipe.remove()

    const removeFromMyRecipes = chef.myRecipes.find(
      r => (r._id.toString() === recipe._id.toString())
    )

    if(removeFromMyRecipes) {
        chef.myRecipes.remove(recipe._id)
        await chef.save()
    }

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

  const chef = await Chef.findById(req.chef._id)
  if(recipe) {
    const alreadyInMyRecipes = chef.myRecipes.find(
      r => (r._id.toString() === recipe._id.toString())
    )

    if(alreadyInMyRecipes) {
      res.status(400)
      throw new Error('Recipe has already been created')
    }

    chef.myRecipes.push(recipe._id)
    await chef.save()

  } else {
    res.status(400)
    throw new Error('Recipe not created')
  }
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

// @description Unsave a recipe
// @route DELETE /api/recipes/:id/save
// @access Private
const unsaveRecipe = asyncHandler(async (req, res) => {
  // Find current recipe
  const recipe = await Recipe.findById(req.params.id)
  // Find current chef
  const chef = await Chef.findById(req.chef._id)
  // Returns all distinct values as an array
  const savedRecipesId = await [... new Set(chef.savedRecipes.map(id => id._id))]
  // Convert the array values to a string
  const savedRecipesIdToString = savedRecipesId.toString()
  // Filter all saved recipes in array to find the one that matches the current recipe ID
  const unsaveRecipe = chef.savedRecipes.find(
    r => (r._id.toString() === recipe._id.toString())
  )

  if(unsaveRecipe) {
    await chef.savedRecipes.remove(unsaveRecipe)
    await chef.save()
    res.json({ message: 'Recipe removed'})
  } else {
    res.status(404)
    throw new Error('Recipe not found')
  }
})

export {
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
}
