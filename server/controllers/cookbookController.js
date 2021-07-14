import asyncHandler from 'express-async-handler';
import Cookbook from '../models/cookbookModel.js';
import Chef from '../models/chefModel.js';
import Recipe from '../models/recipeModel.js';

// @description Create a cookbook
// @route POST /api/cookbook
// @access Private
const createCookbook = asyncHandler(async (req, res) => {
  const cookbook = new Cookbook({
    chef: req.chef._id,
    cookbook_name: 'Sample Cookbook',
    isPrivate: true,
    isPremium: false,
    recipes: [],
    description: '',
    cookbook_cover_image: '/images/defaultRecipeCoverImage.jpg',
  })

  const createdCookbook = await cookbook.save()
  res.status(201).json(createdCookbook)

  const chef = await Chef.findById(req.chef._id)
  if(cookbook) {
    const cookbookAlreadyExists = chef.cookbooks.find(
      r => (r._id.toString() === cookbook._id.toString())
    )

    if(cookbookAlreadyExists) {
      res.status(400)
      throw new Error('Cookbook has already been created')
    }

    chef.cookbooks.push(cookbook._id)
    await chef.save()

  } else {
    res.status(400)
    throw new Error('Cookbook not created')
  }
})

// @description Fetch my cookbooks
// @route GET /api/recipe/mycookbooks
// @access Private
const getMyCookbooks = asyncHandler(async (req, res) => {
  // Returns all cookbooks
  const cookbooks = await Cookbook.find({})
  // Returns the current chef
  const chef = await Chef.findById(req.chef._id)
  // Returns all distinct values as an array
  const myCookbookId = await [... new Set(chef.cookbooks.map(id => id._id))]
  // Convert the array values to a string
  const myCookbookIdToString = myCookbookId.toString()
  // Filter all cookbooks to find the ones that match the array of string IDs
  const myCookbooks = cookbooks.filter(function(cookbook) {
    return myCookbookIdToString.indexOf(cookbook._id) !== -1
  })
  // Returns the filtered array as a JSON object
  res.json(myCookbooks)
})

// matching the Cookbook Model Id with whats in the URL
// @description Fetch single cookbook
// @route GET /api/cookbooks/:id
// @access Public
const getCookbookById = asyncHandler(async (req, res) => {
  const cookbook = await Cookbook.findById(req.params.id)

  if (cookbook) {

      // Returns all recipes
      const recipes = await Recipe.find({

      }, {

      })
    // Returns all distinct id values as an array
    const cookbookRecipeIds = await [... new Set(cookbook.recipes.map(id => id._id))]
    // Convert the array values to a string
    const myCookbookRecipeIdsToString = cookbookRecipeIds.toString()
    // Filter all recipes to find the ones that match the array of string IDs
    const myCookbookRecipes = recipes.filter(function(recipe) {
      return myCookbookRecipeIdsToString.indexOf(recipe._id) !== -1
    })

    // Returns all distinct recipe chef id values as an array
    const cookbookRecipeChefIds = await [... new Set(myCookbookRecipes.map(recipe => recipe.chef))]
    // For each chef id return the id and the username --- filtering to get the name on the front end
    const chefNames = await Chef.find({
      "_id": { "$in": cookbookRecipeChefIds }
    }, {
      username: 1
    })

    // Returns the filtered array as a JSON object
    res.json({ cookbook, myCookbookRecipes, chefNames })
  } else {
    res.status(404)
    throw new Error('Cookbook not found')
  }
})

// @description Update a recipe
// @route PUT /api/cookbooks/:id
// @access Private
const updateCookbook = asyncHandler(async (req, res) => {
  const {
    cookbook_name,
    description,
    isPrivate,
    isPremium,
    cookbook_cover_image
  } = req.body

  const cookbook = await Cookbook.findById(req.params.id)

  if(cookbook) {
    cookbook.cookbook_name = cookbook_name
    cookbook.description = description
    cookbook.isPrivate = isPrivate
    cookbook.isPremium = isPremium
    cookbook.cookbook_cover_image = cookbook_cover_image

    const updatedCookbook = await cookbook.save()
    res.json(updatedCookbook)

  } else {
      res.status(404)
      throw new Error('Cookbook not found')
  }
})

// @description Delete a cookbook
// @route DELETE /api/cookbooks/:id
// @access Private
const deleteCookbook = asyncHandler(async (req, res) => {
  const cookbook = await Cookbook.findById(req.params.id)
  const chef = await Chef.findById(req.chef._id)

  if(cookbook) {
    await cookbook.remove()

    const removeFromMyCookbooks = chef.cookbooks.find(
      r => (r._id.toString() === cookbook._id.toString())
    )

    if(removeFromMyCookbooks) {
        chef.cookbooks.remove(cookbook._id)
        await chef.save()
    }

    res.json({ message: 'Cookbook removed'})
  } else {
    res.status(404)
    throw new Error('Cookbook not found')
  }
})

export {
  createCookbook,
  getMyCookbooks,
  getCookbookById,
  updateCookbook,
  deleteCookbook
}
