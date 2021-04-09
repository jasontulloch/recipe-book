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
      phone_number: chef.phone_number,
      bio: chef.bio,
      isVegan: chef.isVegan,
      isVegetarian: chef.isVegetarian,
      isGlutenFree: chef.isGlutenFree,
      isKetogenic: chef.isKetogenic,
      isPescatarian: chef.isPescatarian,
      isDairy: chef.isDairy,
      isEgg: chef.isEgg,
      isNuts: chef.isNuts,
      isShellfish: chef.isShellfish,
      isSoy: chef.isSoy,
      isWheat: chef.isWheat,
      isBreakfastBrunch: chef.isBreakfastBrunch,
      isMainDish: chef.isMainDish,
      isSideSauce: chef.isSideSauce,
      isDessert: chef.isDessert,
      isSnack: chef.isSnack,
      isAppetizer: chef.isAppetizer,
      isDrink: chef.isDrink,
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
      savedIngredients: chef.savedIngredients,
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
    phone_number,
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
    phone_number,
    password
  })

  if (chef) {
    res.status(201).json({
      _id: chef._id,
      first_name: chef.first_name,
      last_name: chef.last_name,
      username: chef.username,
      email: chef.email,
      phone_number: chef.phone_number,
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
      phone_number: chef.phone_number,
      bio: chef.bio,
      isVegan: chef.isVegan,
      isVegetarian: chef.isVegetarian,
      isGlutenFree: chef.isGlutenFree,
      isKetogenic: chef.isKetogenic,
      isPescatarian: chef.isPescatarian,
      isDairy: chef.isDairy,
      isEgg: chef.isEgg,
      isNuts: chef.isNuts,
      isShellfish: chef.isShellfish,
      isSoy: chef.isSoy,
      isWheat: chef.isWheat,
      isBreakfastBrunch: chef.isBreakfastBrunch,
      isMainDish: chef.isMainDish,
      isSideSauce: chef.isSideSauce,
      isDessert: chef.isDessert,
      isSnack: chef.isSnack,
      isAppetizer: chef.isAppetizer,
      isDrink: chef.isDrink,
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
      savedIngredients: chef.savedIngredients
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
    phone_number,
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
    savedIngredients
  } = req.body

  const chef = await Chef.findById(req.chef._id)

  // STOP - Any boolean values don't need req.body or chef.
  if(chef) {
    chef.first_name = req.body.first_name || chef.first_name
    chef.last_name = req.body.last_name || chef.last_name
    chef.username = req.body.username || chef.username
    chef.email = req.body.email || chef.email
    chef.phone_number = req.body.phone_number || chef.phone_number
    chef.bio = req.body.bio || chef.bio
    chef.isVegan = isVegan
    chef.isVegetarian = isVegetarian
    chef.isGlutenFree = isGlutenFree
    chef.isKetogenic = isKetogenic
    chef.isPescatarian = isPescatarian
    chef.isDairy = isDairy
    chef.isEgg = isEgg
    chef.isNuts = isNuts
    chef.isShellfish = isShellfish
    chef.isSoy = isSoy
    chef.isWheat = isWheat
    chef.isBreakfastBrunch = isBreakfastBrunch
    chef.isMainDish = isMainDish
    chef.isSideSauce = isSideSauce
    chef.isDessert = isDessert
    chef.isSnack = isSnack
    chef.isAppetizer = isAppetizer
    chef.isDrink = isDrink
    chef.isMetric = isMetric
    chef.useTeaspoons = useTeaspoons
    chef.useTablespoons = useTablespoons
    chef.useFluidOunces = useFluidOunces
    chef.useCups = useCups
    chef.usePints = usePints
    chef.useQuarts = useQuarts
    chef.useGallons = useGallons
    chef.useOunces = useOunces
    chef.usePounds = usePounds
    chef.useInches = useInches
    chef.useMillilitres = useMillilitres
    chef.useLitres = useLitres
    chef.useGrams = useGrams
    chef.useKilograms = useKilograms
    chef.useCentimetres = useCentimetres
    chef.useMillimetres = useMillimetres
    chef.savedIngredients = req.body.savedIngredients || chef.savedIngredients

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
      phone_number: updatedChef.phone_number,
      bio: updatedChef.bio,
      isVegan: updatedChef.isVegan,
      isVegetarian: updatedChef.isVegetarian,
      isGlutenFree: updatedChef.isGlutenFree,
      isKetogenic: updatedChef.isKetogenic,
      isPescatarian: updatedChef.isPescatarian,
      isDairy: updatedChef.isDairy,
      isEgg: updatedChef.isEgg,
      isNuts: updatedChef.isNuts,
      isShellfish: updatedChef.isShellfish,
      isSoy: updatedChef.isSoy,
      isWheat: updatedChef.isWheat,
      isBreakfastBrunch: updatedChef.isBreakfastBrunch,
      isMainDish: updatedChef.isMainDish,
      isSideSauce: updatedChef.isSideSauce,
      isDessert: updatedChef.isDessert,
      isSnack: updatedChef.isSnack,
      isAppetizer: updatedChef.isAppetizer,
      isDrink: updatedChef.isDrink,
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
      savedIngredients: updatedChef.savedIngredients,
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
    chef.phone_number = req.body.phone_number || chef.phone_number
    chef.bio = req.body.bio || chef.bio
    chef.diets = req.body.diets || chef.diets

    const updatedChef = await chef.save()

    res.json({
      _id: updatedChef._id,
      first_name: updatedChef.first_name,
      last_name: updatedChef.last_name,
      username: updatedChef.username,
      email: updatedChef.email,
      phone_number: updatedChef.phone_number,
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
