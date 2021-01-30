import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import Chef from '../models/chefModel.js';

// @description Auth chef & get token
// @route POST /api/chefs/login
// @access Public
const authChef = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const chef = await Chef.findOne({ email })

  if (chef && (await chef.matchPassword(password))) {
    res.json({
      _id: chef._id,
      first_name: chef.first_name,
      last_name: chef.last_name,
      username: chef.username,
      email: chef.email,
      bio: chef.bio,
      isVegan: chef.isVegan,
      isVegetarian: chef.isVegetarian,
      isGlutenFree: chef.isGlutenFree,
      isKetogenic: chef.isKetogenic,
      isDairy: chef.isDairy,
      isEgg: chef.isEgg,
      isNuts: chef.isNuts,
      isShellfish: chef.isShellfish,
      isSoy: chef.isSoy,
      isWheat: chef.isWheat,
      isPremium: chef.isPremium,
      isAdmin: chef.isAdmin,
      savedRecipes: chef.savedRecipes,
      myRecipes: chef.myRecipes,
      token: generateToken(chef._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

// @description Register a new chef
// @route POST /api/chefs
// @access Public
const registerChef = asyncHandler(async (req, res) => {
  const {
    first_name,
    last_name,
    username,
    email,
    password
  } = req.body

  const chefUsernameExists = await Chef.findOne({ username })
  const chefEmailExists = await Chef.findOne({ email })

  if (chefUsernameExists) {
    res.status(400)
    throw new Error('Username already exists, please use a different username or login')
  }

  if (chefEmailExists) {
    res.status(400)
    throw new Error('Email already exists, please use a different email or login')
  }

  const chef = await Chef.create({
    first_name,
    last_name,
    username,
    email,
    password
  })

  if (chef) {
    res.status(201).json({
      _id: chef._id,
      first_name: chef.first_name,
      last_name: chef.last_name,
      username: chef.username,
      email: chef.email,
      token: generateToken(chef._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @description Get chef profile
// @route GET /api/chefs/profile
// @access Private
const getChefProfile = asyncHandler(async (req, res) => {
  const chef = await Chef.findById(req.chef._id)

  if(chef) {
    res.json({
      _id: chef._id,
      first_name: chef.first_name,
      last_name: chef.last_name,
      username: chef.username,
      email: chef.email,
      bio: chef.bio,
      isVegan: chef.isVegan,
      isVegetarian: chef.isVegetarian,
      isGlutenFree: chef.isGlutenFree,
      isKetogenic: chef.isKetogenic,
      isDairy: chef.isDairy,
      isEgg: chef.isEgg,
      isNuts: chef.isNuts,
      isShellfish: chef.isShellfish,
      isSoy: chef.isSoy,
      isWheat: chef.isWheat,
      savedRecipes: chef.savedRecipes,
      myRecipes: chef.myRecipes,
    })
  } else {
    res.status(404)
    throw new Error('Chef not found')
  }
})

// @description Update chef profile
// @route PUT /api/chefs/profile
// @access Private
const updateChefProfile = asyncHandler(async (req, res) => {
  const {
    isVegan,
    isVegetarian,
    isGlutenFree,
    isKetogenic,
    isDairy,
    isEgg,
    isNuts,
    isShellfish,
    isSoy,
    isWheat
  } = req.body

  const chef = await Chef.findById(req.chef._id)


  if(chef) {
    chef.first_name = req.body.first_name || chef.first_name
    chef.last_name = req.body.last_name || chef.last_name
    chef.username = req.body.username || chef.username
    chef.email = req.body.email || chef.email
    chef.bio = req.body.bio || chef.bio
    chef.isVegan = isVegan
    chef.isVegetarian = isVegetarian
    chef.isGlutenFree = isGlutenFree
    chef.isKetogenic = isKetogenic
    chef.isDairy = isDairy
    chef.isEgg = isEgg
    chef.isNuts = isNuts
    chef.isShellfish = isShellfish
    chef.isSoy = isSoy
    chef.isWheat = isWheat

    if (req.body.password) {
      chef.password = req.body.password
    }

    const updatedChef = await chef.save()

    res.json({
      _id: updatedChef._id,
      first_name: updatedChef.first_name,
      last_name: updatedChef.last_name,
      username: updatedChef.username,
      email: updatedChef.email,
      bio: updatedChef.bio,
      isVegan: updatedChef.isVegan,
      isVegetarian: updatedChef.isVegetarian,
      isGlutenFree: updatedChef.isGlutenFree,
      isKetogenic: updatedChef.isKetogenic,
      isDairy: updatedChef.isDairy,
      isEgg: updatedChef.isEgg,
      isNuts: updatedChef.isNuts,
      isShellfish: updatedChef.isShellfish,
      isSoy: updatedChef.isSoy,
      isWheat: updatedChef.isWheat,
      token: generateToken(updatedChef._id),
    })

  } else {
    res.status(404)
    throw new Error('Chef not found')
  }
})

// @description Get all chefs
// @route GET /api/chefs/
// @access Private and Admin
const getChefs = asyncHandler(async (req, res) => {
  const chefs = await Chef.find({})
  res.json(chefs)
})

// @description Delete chef
// @route DELETE /api/chefs/:id
// @access Private and Admin
const deleteChef = asyncHandler(async (req, res) => {
  const chef = await Chef.findById(req.params.id)

  if(chef && !chef.isAdmin) {
    await chef.remove()
    res.json({ message: 'Chef removed'})
  } else {
    res.status(404)
    throw new Error('Chef not found or is an admin')
  }
})

// @description Get chef by ID
// @route GET /api/chefs/:id
// @access Private and Admin
const getChefByIdAdmin = asyncHandler(async (req, res) => {
  const chef = await Chef.findById(req.params.id).select('-password')
  if (chef) {
    res.json(chef)
  } else {
    res.status(404)
    throw new Error('Chef not found')
  }
})

// @description Get chef by ID
// @route GET /api/chefs/:id
// @access Private and Admin
const getChefById = asyncHandler(async (req, res) => {
  const chef = await Chef.findById(req.params.id).select('-password').select('-isAdmin')
  if (chef) {
    res.json(chef)
  } else {
    res.status(404)
    throw new Error('Chef not found')
  }
})

// @description Update chef
// @route PUT /api/chefs/:id
// @access Private or Admin
const updateChef = asyncHandler(async (req, res) => {
  const chef = await Chef.findById(req.params.id)

  if(chef) {
    chef.first_name = req.body.first_name || chef.first_name
    chef.last_name = req.body.last_name || chef.last_name
    chef.username = req.body.username || chef.username
    chef.email = req.body.email || chef.email
    chef.bio = req.body.bio || chef.bio
    chef.diets = req.body.diets || chef.diets

    const updatedChef = await chef.save()

    res.json({
      _id: updatedChef._id,
      first_name: updatedChef.first_name,
      last_name: updatedChef.last_name,
      username: updatedChef.username,
      email: updatedChef.email,
      bio: updatedChef.bio,
      diets: updatedChef.diets,
    })

  } else {
    res.status(404)
    throw new Error('Chef not found')
  }
})

export {
  authChef,
  registerChef,
  getChefProfile,
  updateChefProfile,
  getChefs,
  deleteChef,
  getChefByIdAdmin,
  getChefById,
  updateChef
}
