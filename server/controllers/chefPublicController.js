import asyncHandler from 'express-async-handler';
import Recipe from '../models/recipeModel.js';
import Chef from '../models/chefModel.js';

// @description Fetch all public chef profiles
// @route GET /api/chefs
// @access Public
const getChefs = asyncHandler(async (req, res) => {
  const pageSize = 20
  const page = Number(req.query.pageNumber) || 1

  const isVisible = true ? {
    isVisible: {
      $eq: 'true'
    }
  } : {}

  const count = await Chef.countDocuments({
    $and: [
      {...isVisible}
    ]
  })

  // Sort will order createdAt from newest to older (-1) to flip
  //const netVotesSort = req.query.netVotesSort
  //const createdAtSort = req.query.createdAtSort
  //const trendingSort = 0

  const chefs = await Chef.find({
    $and: [
      {...isVisible}
    ]
  })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ chefs, page, pages: Math.ceil(count / pageSize) })
})

// matching the Chef Model Id with whats in the URL
// @description Fetch single chef
// @route GET /api/chefs/:id
// @access Public
const getChefById = asyncHandler(async (req, res) => {
  const page = Number(req.query.pageNumber) || 1

  const recipeCount = 10
  const chef = await Chef.findById(req.params.id)

  const isPublished = true ? {
    isPublished: {
      $eq: 'true'
    }
  } : {}

  const keywordChefId = chef ? {
    chef: {
      $in: req.params.id
    }
  } : {}

  const recipes = await Recipe.find({
    //and below is finding both (don't technically need the and)
    $and: [
      {...isPublished},
      {...keywordChefId},
    ]
  })
    .limit(recipeCount)
    .skip(recipeCount * (page - 1))

  const count = await Recipe.countDocuments({
    $and: [
      {...isPublished},
      {...keywordChefId},
    ]
  })

  if (chef) {
    res.json({
      chef,
      recipes,
      count,
      page,
      pages: Math.ceil(count / recipeCount)
    })
  } else {
    res.status(404)
    throw new Error('Chef not found')
  }
})

export {
  getChefs,
  getChefById,
}
