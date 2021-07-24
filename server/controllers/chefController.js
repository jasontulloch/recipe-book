import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import Chef from '../models/chefModel.js';
import Recipe from '../models/recipeModel.js';

// @description Auth chef & get token
// @route POST /api/chef/login
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
      connect_first_name: chef.connect_first_name,
      connect_last_name: chef.connect_last_name,
      connect_email: chef.connect_email,
      connect_phone_number: chef.connect_phone_number,
      bio: chef.bio,
      chefPicture: chef.chefPicture,
      isVisible: chef.isVisible,
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
      following: chef.following,
      token: generateToken(chef._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

// @description Register a new chef
// @route POST /api/chef
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
    connect_first_name: '',
    connect_last_name: '',
    connect_email: '',
    connect_phone_number: '',
    chefPicture: '/images/defaultRecipeCoverImage.jpg',
    isVegan: false,
    isVegetarian: false,
    isGlutenFree: false,
    isKetogenic: false,
    isPescatarian: false,
    isDairy: false,
    isEgg: false,
    isNuts: false,
    isShellfish: false,
    isSoy: false,
    isWheat: false,
    isBreakfastBrunch: false,
    isMainDish: true,
    isSideSauce: false,
    isDessert: false,
    isSnack: false,
    isAppetizer: false,
    isDrink: false,
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
      connect_first_name: chef.connect_first_name,
      connect_last_name: chef.connect_last_name,
      connect_email: chef.connect_email,
      connect_phone_number: chef.connect_phone_number,
      chefPicture: chef.chefPicture,
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
      token: generateToken(chef._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @description Get chef profile
// @route GET /api/chef/profile
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
      connect_first_name: chef.connect_first_name,
      connect_last_name: chef.connect_last_name,
      connect_email: chef.connect_email,
      connect_phone_number: chef.connect_phone_number,
      bio: chef.bio,
      chefPicture: chef.chefPicture,
      isVisible: chef.isVisible,
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
      savedIngredients: chef.savedIngredients,
      following: chef.following
    })
  } else {
    res.status(404)
    throw new Error('Chef not found')
  }
})

// @description Update chef profile
// @route PUT /api/chef/profile
// @access Private
const updateChefProfile = asyncHandler(async (req, res) => {
  const {
    phone_number,
    chefPicture,
    isVisible,
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
    savedIngredients,
    following
  } = req.body

  const chef = await Chef.findById(req.chef._id)

  // STOP - Any boolean values don't need req.body or chef.
  if(chef) {
    chef.first_name = req.body.first_name || chef.first_name
    chef.last_name = req.body.last_name || chef.last_name
    chef.username = req.body.username || chef.username
    chef.email = req.body.email || chef.email
    chef.phone_number = req.body.phone_number || chef.phone_number
    chef.connect_first_name = req.body.connect_first_name || chef.connect_first_name
    chef.connect_last_name = req.body.connect_last_name || chef.connect_last_name
    chef.connect_email = req.body.connect_email || chef.connect_email
    chef.connect_phone_number = req.body.connect_phone_number || chef.phone_number
    chef.bio = req.body.bio || chef.bio
    chef.chefPicture = req.body.chefPicture || chef.chefPicture
    chef.isVisible = isVisible
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
    chef.following = req.body.following || chef.following

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
      connect_first_name: updatedChef.connect_first_name,
      connect_last_name: updatedChef.connect_last_name,
      connect_email: updatedChef.connect_email,
      connect_phone_number: updatedChef.connect_phone_number,
      bio: updatedChef.bio,
      chefPicture: updatedChef.chefPicture,
      isVisible: updatedChef.isVisible,
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
      following: updatedChef.following,
      token: generateToken(updatedChef._id),
    })

  } else {
    res.status(404)
    throw new Error('Chef not found')
  }
})

// @description Get all chefs
// @route GET /api/chef/
// @access Private and Admin
const getChefs = asyncHandler(async (req, res) => {
  const chefs = await Chef.find({})
  res.json(chefs)
})

// @description Delete chef
// @route DELETE /api/chef/:id
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
// @route GET /api/chef/:id
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
// @route GET /api/chef/:id
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
// @route PUT /api/chef/:id
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
    chef.chefPicture = req.body.chefPicture || chef.chefPicture
    chef.isVisible = req.body.isVisible || chef.isVisible
    chef.following = req.body.following || chef.following
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
      chefPicture: updatedChef.chefPicture,
      isVisible: updatedChef.isVisible,
      following: updatedChef.following,
      diets: updatedChef.diets,
    })

  } else {
    res.status(404)
    throw new Error('Chef not found')
  }
})

// @description Follow a chef
// @route POST /api/chef/:id/follow
// @access Private
const followChef = asyncHandler(async (req, res) => {

  // req.chef._id works since passing chefInfo from FE and using protect middleware on BE
  const currentChef = await Chef.findById(req.chef._id)
  // Based on current chef id in browser
  const chefLookup = await Chef.findById(req.params.id)

  // see if following array already has the chef id (don't want to follow twice)
  if(chefLookup) {
    const alreadyFollowing = currentChef.following.find(
      r => (r.chef.toString() === req.params.id.toString())
    )

    if(alreadyFollowing) {
      res.status(400)
      throw new Error('Chef is already being followed')
    }

    // if not already following, save chef id to array
    const newFollowing = {
      chef: req.params.id
    }

    currentChef.following.push(newFollowing)

    await currentChef.save()

    res.status(201).json({ message: 'Chef successfully followed'})
  } else {
    res.status(400)
    throw new Error('Chef not found')
  }
})

// @description Unfollow a chef
// @route DELETE /api/chef/:id/unfollow
// @access Private
const unfollowChef = asyncHandler(async (req, res) => {

  // req.chef._id works since passing chefInfo from FE and using protect middleware on BE
  const currentChef = await Chef.findById(req.chef._id)
  // Based on current chef id in browser
  const chefLookup = await Chef.findById(req.params.id)

  // Returns all distinct values as an array
  const followedChefId = await [... new Set(currentChef.following.map(chef => chef._id))]
  // Convert the array values to a string
  const followedChefIdToString = followedChefId.toString()
  // Filter all saved recipes in array to find the one that matches the current recipe ID
  const unfollowSelectedChef = currentChef.following.find(
    r => (r.chef.toString() === chefLookup._id.toString())
  )

  if(unfollowSelectedChef) {
    await currentChef.following.remove(unfollowSelectedChef)
    await currentChef.save()
    res.json({ message: 'Chef unfollowed'})
  } else {
    res.status(404)
    throw new Error('Chef not found')
  }

})

// @description Fetch chefs I am following
// @route GET /api/chef/mychefs
// @access Private
const getMyFollowedChefs = asyncHandler(async (req, res) => {
  // Setting number of recipes and chefs to be pulled (defined with limit below)

  const pageChefSize = 10
  const page = Number(req.query.pageNumber) || 1

  // Returns the current chef
  const currentChef = await Chef.findById(req.chef._id)
  // Returns all distinct values as an array
  const myFollowedChefsId = await [... new Set(currentChef.following.map(chefId => chefId.chef))]
  // Preparing to find all recipes with chefs that have ids matching what is in our array
  const keywordRecipeChefId = myFollowedChefsId ? {
    chef: {
      $in: myFollowedChefsId
    }
  } : {}
  // Preparing to find all chefs that have ids matching what is in our array
  const keywordChefId = myFollowedChefsId ? {
    _id: {
      $in: myFollowedChefsId
    }
  } : {}
  // Making sure recipes are published
  const isPublished = true ? {
    isPublished: {
      $eq: 'true'
    }
  } : {}
  // Making sure chef profile is published
  const isVisible = true ? {
    isVisible: {
      $eq: 'true'
    }
  } : {}
  // Finding recipes based on chef ID - making sure published
  const recipes = await Recipe.find({
    $and: [
      {...keywordRecipeChefId},
      {...isPublished}
    ]
    // Returning only the following fields (this is what the "1" does)
  }, {
    chef: 1,
    recipe_name: 1,
    isVegan: 1,
    isVegetarian: 1,
    isGlutenFree: 1,
    isKetogenic: 1,
    isPescatarian: 1,
    isDairy: 1,
    isEgg: 1,
    isNuts: 1,
    isShellfish: 1,
    isWheat: 1,
    isSoy: 1,
    recipe_cover_image: 1,
  })
  // Finding chefs based on chef ID - making sure published
  const chefs = await Chef.find({
    $and: [
      {...keywordChefId},
      {...isVisible}
    ]
    // Returning only the following fields (this is what the "1" does)
  }, {
    username: 1,
    chefPicture: 1,
    isVegan: 1,
    isVegetarian: 1,
    isGlutenFree: 1,
    isKetogenic: 1,
    isPescatarian: 1,
    isDairy: 1,
    isEgg: 1,
    isNuts: 1,
    isShellfish: 1,
    isWheat: 1,
    isSoy: 1,
    recipe_cover_image: 1,
    myRecipes: 1,
    isVisible: 1,
    cookbooks: 1,
    isMetric: 1
  })
  .limit(pageChefSize)
  .skip(pageChefSize * (page - 1))

  const finalRecipes = chefs.map(chefId => (recipes.filter(allRecipes => chefId._id.toString() === allRecipes.chef.toString())).slice(0,10)).flat()

  const countChefs = await Chef.countDocuments({
    $and: [
      {...keywordChefId},
      {...isVisible}
    ]
  })

  // Returns the filtered array as a JSON object
  res.json({finalRecipes, chefs, page, pages: Math.ceil(countChefs / pageChefSize) })
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
  updateChef,
  followChef,
  unfollowChef,
  getMyFollowedChefs
}
