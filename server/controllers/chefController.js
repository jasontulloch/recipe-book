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
      isMetric: chef.isMetric,
      useTeaspoons: chef.useTeaspoons,
      useTablespoons: chef.useTablespoons,
      useFluidOunces: chef.useFluidOunces,
      useCups: chef.useCups,
      usePints: chef.usePints,
      useQuarts: chef.useQuarts,
      useGallons: chef.useGallons,
      useOunces: chef.useOunces,
      usePounds: chef.usePounds,
      useInches: chef.useInches,
      useMillilitres: chef.useMillilitres,
      useLitres: chef.useLitres,
      useGrams: chef.useGrams,
      useKilograms: chef.useKilograms,
      useCentimetres: chef.useCentimetres,
      useMillimetres: chef.useMillilitres,
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
      isMetric: chef.isMetric,
      useTeaspoons: chef.useTeaspoons,
      useTablespoons: chef.useTablespoons,
      useFluidOunces: chef.useFluidOunces,
      useCups: chef.useCups,
      usePints: chef.usePints,
      useQuarts: chef.useQuarts,
      useGallons: chef.useGallons,
      useOunces: chef.useOunces,
      usePounds: chef.usePounds,
      useInches: chef.useInches,
      useMillilitres: chef.useMillilitres,
      useLitres: chef.useLitres,
      useGrams: chef.useGrams,
      useKilograms: chef.useKilograms,
      useCentimetres: chef.useCentimetres,
      useMillimetres: chef.useMillimetres,
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
    isWheat,
    isMetric,
    useTeaspoons,
    useTablespoons,
    useFluidOunces,
    useCups,
    usePints,
    useQuarts,
    useGallons,
    useOunces,
    usePounds,
    useInches,
    useMillilitres,
    useLitres,
    useGrams,
    useKilograms,
    useCentimetres,
    useMillimetres,
  } = req.body

  const chef = await Chef.findById(req.chef._id)


  if(chef) {
    chef.first_name = req.body.first_name || chef.first_name
    chef.last_name = req.body.last_name || chef.last_name
    chef.username = req.body.username || chef.username
    chef.email = req.body.email || chef.email
    chef.bio = req.body.bio || chef.bio
    chef.isVegan = req.body.isVegan || chef.isVegan
    chef.isVegetarian = req.body.isVegetarian || chef.isVegetarian
    chef.isGlutenFree = req.body.isGlutenFree || chef.isGlutenFree
    chef.isKetogenic = req.body.isKetogenic || chef.isKetogenic
    chef.isDairy = req.body.isDairy || chef.isDairy
    chef.isEgg = req.body.isEgg || chef.isEgg
    chef.isNuts = req.body.isNuts || chef.isNuts
    chef.isShellfish = req.body.isShellfish || chef.isShellfish
    chef.isSoy = req.body.isSoy || chef.isSoy
    chef.isWheat = req.body.isWheat || chef.isWheat
    chef.isMetric = req.body.isMetric || chef.isMetric
    chef.useTeaspoons = req.body.useTeaspoons || chef.useTeaspoons
    chef.useTablespoons = req.body.useTablespoons || chef.useTablespoons
    chef.useFluidOunces = req.body.useFluidOunces || chef.useFluidOunces
    chef.useCups = req.body.useCups || chef.useCups
    chef.usePints = req.body.usePints || chef.usePints
    chef.useQuarts = req.body.useQuarts || chef.useQuarts
    chef.useGallons = req.body.useGallons || chef.useGallons
    chef.useOunces = req.body.useOunces || chef.useOunces
    chef.usePounds = req.body.usePounds || chef.usePounds
    chef.useInches = req.body.useInches || chef.useInches
    chef.useMillilitres = req.body.useMillilitres || chef.useMillilitres
    chef.useLitres = req.body.useLitres || chef.useLitres
    chef.useGrams = req.body.useGrams || chef.useGrams
    chef.useKilograms = req.body.useKilograms || chef.useKilograms
    chef.useCentimetres = req.body.useCentimetres || chef.useCentimetres
    chef.useMillimetres = req.body.useMillimetres || chef.useMillilitres

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
      isMetric: updatedChef.isMetric,
      useTeaspoons: updatedChef.useTeaspoons,
      useTablespoons: updatedChef.useTablespoons,
      useFluidOunces: updatedChef.useFluidOunces,
      useCups: updatedChef.useCups,
      usePints: updatedChef.usePints,
      useQuarts: updatedChef.useQuarts,
      useGallons: updatedChef.useGallons,
      useOunces: updatedChef.useOunces,
      usePounds: updatedChef.usePounds,
      useInches: updatedChef.useInches,
      useMillilitres: updatedChef.useMillilitres,
      useLitres: updatedChef.useLitres,
      useGrams: updatedChef.useGrams,
      useKilograms: updatedChef.useKilograms,
      useCentimetres: updatedChef.useCentimetres,
      useMillimetres: updatedChef.useMillimetres,

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
