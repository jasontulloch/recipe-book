import asyncHandler from 'express-async-handler';
import Recipe from '../models/recipeModel.js';
import Chef from '../models/chefModel.js';

// @description Fetch all recipes
// @route GET /api/recipes
// @access Public
const getRecipes = asyncHandler(async (req, res) => {
  const pageSize = 20
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

  // Sort will order createdAt from newest to older (-1) to flip
  const netVotesSort = req.query.netVotesSort
  const createdAtSort = req.query.createdAtSort
  const trendingSort = 0

  const recipes = await Recipe.find({ ...keywordRecipeName })
    .sort({'netVotes':netVotesSort, 'createdAt': createdAtSort})
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ recipes, page, pages: Math.ceil(count / pageSize) })
})

// @description Fetch all recipes (advanced search)
// @route GET /api/recipes/search
// @access Public
const getRecipesAdvancedSearchAll = asyncHandler(async (req, res) => {
  const pageSize = 20
  const page = Number(req.query.pageNumber) || 1

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

  const keywordChefName = [req.query.keywordChefName]
  let keywordChefNameClean = ''
  if (keywordChefName && req.query.keywordChefName.length > 0) {
    keywordChefNameClean = keywordChefName.toString().toLowerCase().trim()
  }
  const chefs = await Chef.find({ })
  const findChef = chefs.filter(function(chef) {
    return chef.username.toLowerCase().includes(keywordChefNameClean)
  })
  const findChefId = findChef.map(id => id._id)

  const keywordChefId = findChefId ? {
    chef: {
      $in: findChefId
    }
  } : {}

  const keywordCookTimeMin = req.query.keywordCookTimeMin ? {
    cook_time: {
      $gte: req.query.keywordCookTimeMin
    }
  } : {}

  const keywordCookTimeMax = req.query.keywordCookTimeMax ? {
    cook_time: {
      $lte: req.query.keywordCookTimeMax
    }
  } : {}

  const keywordIsVegan = req.query.keywordIsVegan ? {
    isVegan: {
      $eq: req.query.keywordIsVegan
    }
  } : {}

  const keywordIsVegetarian = req.query.keywordIsVegetarian ? {
    isVegetarian: {
      $eq: req.query.keywordIsVegetarian
    }
  } : {}

  const keywordIsGlutenFree = req.query.keywordIsGlutenFree ? {
    isGlutenFree: {
      $eq: req.query.keywordIsGlutenFree
    }
  } : {}

  const keywordIsKetogenic = req.query.keywordIsKetogenic ? {
    isKetogenic: {
      $eq: req.query.keywordIsKetogenic
    }
  } : {}

  const keywordIsPescatarian = req.query.keywordIsPescatarian ? {
    isPescatarian: {
      $eq: req.query.keywordIsPescatarian
    }
  } : {}

  let flipDairy = req.query['keywordIsDairy']
  if (req.query['keywordIsDairy'] == 'false') {
    flipDairy = 'true'
  } else {
    flipDairy = 'false'
  }
  const keywordIsDairy = (req.query.keywordIsDairy && req.query['keywordIsDairy'] == 'true') ? {
    isDairy: {
      $eq: flipDairy
    }
  } : {}

  // req.query['keywordIsDairy'] - string
  // flipDairy - boolean
  //console.log(req.query['keywordIsDairy'])
  //console.log(flipDairy)

  let flipEgg = req.query['keywordIsEgg']
  if (req.query['keywordIsEgg'] == 'false') {
    flipEgg = 'true'
  } else {
    flipEgg = 'false'
  }
  const keywordIsEgg = (req.query.keywordIsEgg && req.query['keywordIsEgg'] == 'true') ? {
    isEgg: {
      $eq: flipEgg
    }
  } : {}

  let flipNuts = req.query['keywordIsNuts']
  if (req.query['keywordIsNuts'] == 'false') {
    flipNuts = 'true'
  } else {
    flipNuts = 'false'
  }
  const keywordIsNuts = (req.query.keywordIsNuts && req.query['keywordIsNuts'] == 'true') ? {
    isNuts: {
      $eq: flipNuts
    }
  } : {}

  let flipShellfish = req.query['keywordIsShellfish']
  if (req.query['keywordIsShellfish'] == 'false') {
    flipShellfish = 'true'
  } else {
    flipShellfish = 'false'
  }
  const keywordIsShellfish = (req.query.keywordIsShellfish && req.query['keywordIsShellfish'] == 'true') ? {
    isShellfish: {
      $eq: flipShellfish
    }
  } : {}

  // if soy is true we want to exclude it from results
  let flipSoy = req.query['keywordIsSoy']
  if (req.query['keywordIsSoy'] == 'false') {
    flipSoy = 'true'
  } else {
    flipSoy = 'false'
  }
  const keywordIsSoy = (req.query.keywordIsSoy && req.query['keywordIsSoy'] == 'true') ? {
    isSoy: {
      $eq: flipSoy
    }
  } : {}

  let flipWheat = req.query['keywordIsWheat']
  if (req.query['keywordIsWheat'] == 'false') {
    flipWheat = 'true'
  } else {
    flipWheat = 'false'
  }
  const keywordIsWheat = (req.query.keywordIsWheat && req.query['keywordIsWheat'] == 'true') ? {
    isWheat: {
      $eq: flipWheat
    }
  } : {}

  const keywordIsBreakfastBrunch = (req.query.keywordIsBreakfastBrunch && req.query['keywordIsBreakfastBrunch'] == 'true') ? {
    isBreakfastBrunch: {
      $eq: req.query.keywordIsBreakfastBrunch
    }
  } : {}

  const keywordIsMainDish = (req.query.keywordIsMainDish && req.query['keywordIsMainDish'] == 'true') ? {
    isMainDish: {
      $eq: req.query.keywordIsMainDish
    }
  } : {}
  const keywordIsSideSauce = (req.query.keywordIsSideSauce && req.query['keywordIsSideSauce'] == 'true') ? {
    isSideSauce: {
      $eq: req.query.keywordIsSideSauce
    }
  } : {}
  const keywordIsDessert = (req.query.keywordIsDessert && req.query['keywordIsDessert'] == 'true') ? {
    isDessert: {
      $eq: req.query.keywordIsDessert
    }
  } : {}
  const keywordIsSnack = (req.query.keywordIsSnack && req.query['keywordIsSnack'] == 'true') ? {
    isSnack: {
      $eq: req.query.keywordIsSnack
    }
  } : {}
  const keywordIsAppetizer = (req.query.keywordIsAppetizer && req.query['keywordIsAppetizer'] == 'true') ? {
    isAppetizer: {
      $eq: req.query.keywordIsAppetizer
    }
  } : {}
  const keywordIsDrink = (req.query.keywordIsDrink && req.query['keywordIsDrink'] == 'true') ? {
    isDrink: {
      $eq: req.query.keywordIsDrink
    }
  } : {}

  // Sort will order createdAt from newest to older (-1) to flip
  const netVotesSort = req.query.netVotesSort
  const createdAtSort = req.query.createdAtSort
  const trendingSort = 0

  const count = await Recipe.countDocuments({
    $and: [
      {...keywordRecipeName},
      {...keywordCountry},
      {...keywordChefId},
      {...keywordCookTimeMin},
      {...keywordCookTimeMax},
      {...keywordIsVegan},
      {...keywordIsVegetarian},
      {...keywordIsGlutenFree},
      {...keywordIsKetogenic},
      {...keywordIsPescatarian},
      {...keywordIsDairy},
      {...keywordIsEgg},
      {...keywordIsNuts},
      {...keywordIsShellfish},
      {...keywordIsSoy},
      {...keywordIsWheat},
      {...keywordIsBreakfastBrunch},
      {...keywordIsMainDish},
      {...keywordIsSideSauce},
      {...keywordIsDessert},
      {...keywordIsSnack},
      {...keywordIsAppetizer},
      {...keywordIsDrink}
    ]
  })

  // This works as of 4/5/21
  const recipes = await Recipe.find({
    //and below is finding both (don't technically need the and)
    $and: [
      {...keywordRecipeName},
      {...keywordCountry},
      {...keywordChefId},
      {...keywordCookTimeMin},
      {...keywordCookTimeMax},
      {...keywordIsVegan},
      {...keywordIsVegetarian},
      {...keywordIsGlutenFree},
      {...keywordIsKetogenic},
      {...keywordIsPescatarian},
      {...keywordIsDairy},
      {...keywordIsEgg},
      {...keywordIsNuts},
      {...keywordIsShellfish},
      {...keywordIsSoy},
      {...keywordIsWheat},
      {...keywordIsBreakfastBrunch},
      {...keywordIsMainDish},
      {...keywordIsSideSauce},
      {...keywordIsDessert},
      {...keywordIsSnack},
      {...keywordIsAppetizer},
      {...keywordIsDrink}
    ],
  })
  .sort({'createdAt': createdAtSort, 'netVotes':netVotesSort})
  .limit(pageSize)
  .skip(pageSize * (page - 1))

  res.json({ recipes, page, pages: Math.ceil(count / pageSize) })

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
    const chef = await Chef.findById(recipe.chef)
    const chefUsername = chef.username
    res.json({recipe, chefUsername})
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
    recipe_cover_image: '/images/defaultRecipeCoverImage.jpg',
    steps: [' '],
    ingredients: [["1","Tablespoon","Paprika"]],
    country: ' ',
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
    isPescatarian,
    isDairy,
    isEgg,
    isNuts,
    isShellfish,
    isSoy,
    isWheat,
    isBreakfastBrunch,
    isMainDish,
    isSideSauce,
    isDessert,
    isSnack,
    isAppetizer,
    isDrink,
    recipe_cover_image,
    notes,
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
    recipe.isPescatarian = isPescatarian
    recipe.isDairy = isDairy
    recipe.isEgg = isEgg
    recipe.isNuts = isNuts
    recipe.isShellfish = isShellfish
    recipe.isSoy = isSoy
    recipe.isWheat = isWheat
    recipe.isBreakfastBrunch = isBreakfastBrunch
    recipe.isMainDish = isMainDish
    recipe.isSideSauce = isSideSauce
    recipe.isDessert = isDessert
    recipe.isSnack = isSnack
    recipe.isAppetizer = isAppetizer
    recipe.isDrink = isDrink
    recipe.recipe_cover_image = recipe_cover_image
    recipe.notes = notes

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

// @description Save a recipes ingredients
// @route POST /api/recipes/:id/saveIngredients
// @access Private
const saveIngredients = asyncHandler(async (req, res) => {
  const {
    ingredients
  } = req.body

  const recipe = await Recipe.find({ '_id': req.params.id })
  const chef = await Chef.findById(req.chef._id)

  if(recipe) {

    const ingredientList = {
      savedIngredients: recipe[0].ingredients
    }

      chef.savedIngredients.push(...ingredientList.savedIngredients)

      await chef.save()

      res.status(201).json({ message: 'Recipe ingredients saved'})
    } else {
      res.status(400)
      throw new Error('Recipe ingredients not found')
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
  saveIngredients
}
