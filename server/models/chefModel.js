import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import myRecipeSchema from './myRecipeModel.js';
import followingSchema from './followingModel.js';

const chefSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true
    },
    last_name: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    phone_number : {
      type: String,
      required: false,
    },
    connect_first_name: {
      type: String,
      required: false
    },
    connect_last_name: {
      type: String,
      required: false
    },
    connect_phone_number : {
      type: String,
      required: false,
    },
    connect_email: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true
    },
    bio: {
      type: String,
      required: false
    },
    chefPicture: {
      type: String,
      required: false
    },
    isVisible: {
      type: Boolean,
      required: true,
      default: false
    },
    isVegan: {
      type: Boolean,
      required: true,
      default: false
    },
    isVegetarian: {
      type: Boolean,
      required: true,
      default: false
    },
    isGlutenFree: {
      type: Boolean,
      required: true,
      default: false
    },
    isKetogenic: {
      type: Boolean,
      required: true,
      default: false
    },
    isPescatarian: {
      type: Boolean,
      required: true,
      default: false
    },
    isDairy: {
      type: Boolean,
      required: true,
      default: false
    },
    isEgg: {
      type: Boolean,
      required: true,
      default: false
    },
    isNuts: {
      type: Boolean,
      required: true,
      default: false
    },
    isShellfish: {
      type: Boolean,
      required: true,
      default: false
    },
    isSoy: {
      type: Boolean,
      required: true,
      default: false
    },
    isWheat: {
      type: Boolean,
      required: true,
      default: false
    },
    isBreakfastBrunch: {
      type: Boolean,
      required: true,
      default: false
    },
    isMainDish: {
      type: Boolean,
      required: true,
      default: true
    },
    isSideSauce: {
      type: Boolean,
      required: true,
      default: false
    },
    isDessert: {
      type: Boolean,
      required: true,
      default: false
    },
    isSnack: {
      type: Boolean,
      required: true,
      default: false
    },
    isAppetizer: {
      type: Boolean,
      required: true,
      default: false
    },
    isDrink: {
      type: Boolean,
      required: true,
      default: false
    },
    isMetric: {
      type: Boolean,
      required: true,
      default: false
    },
    useTeaspoons: {
      type: Boolean,
      required: true,
      default: true
    },
    useTablespoons: {
      type: Boolean,
      required: true,
      default: true
    },
    useFluidOunces: {
      type: Boolean,
      required: true,
      default: false
    },
    useCups: {
      type: Boolean,
      required: true,
      default: true
    },
    usePints: {
      type: Boolean,
      required: true,
      default: false
    },
    useQuarts: {
      type: Boolean,
      required: true,
      default: false
    },
    useGallons: {
      type: Boolean,
      required: true,
      default: false
    },
    useOunces: {
      type: Boolean,
      required: true,
      default: false
    },
    usePounds: {
      type: Boolean,
      required: true,
      default: true
    },
    useInches: {
      type: Boolean,
      required: true,
      default: true
    },
    useMillilitres: {
      type: Boolean,
      required: true,
      default: true
    },
    useLitres: {
      type: Boolean,
      required: true,
      default: true
    },
    useGrams: {
      type: Boolean,
      required: true,
      default: true
    },
    useKilograms: {
      type: Boolean,
      required: true,
      default: true
    },
    useCentimetres: {
      type: Boolean,
      required: true,
      default: true
    },
    useMillimetres: {
      type: Boolean,
      required: true,
      default: true
    },
    isPremium: {
      type: Boolean,
      required: true,
      default: false
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false
    },
    myRecipes: [myRecipeSchema],
    savedRecipes: {
      type: Array,
      default: []
    },
    savedIngredients: {
      type: Array,
      default: []
    },
    following: [followingSchema],
    cookbooks: {
      type: Array,
      default: []
    },
  }, {
    timestamps: true,
  }
)

chefSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

chefSchema.pre('save', async function(next) {
  if(!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const Chef = mongoose.model('Chef', chefSchema);

export default Chef;
