import mongoose from 'mongoose';
import voteSchema from './voteModel.js';

const recipeSchema = mongoose.Schema(
  {
    chef: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: 'Chef'
    },
    isPublished: {
      type: Boolean,
      required: true,
      default: false
    },
    recipe_name: {
      type: String,
      required: true
    },
    recipe_cover_image: {
      type: String,
      required: true
    },
    steps: {
      type: Array,
      default: []
    },
    ingredients: {
      type: Array,
      default: []
    },
    country: {
      type: String,
      required: true
    },
    cook_time: {
      type: Number,
      required: true
    },
    serving_size: {
      type: Number,
      required: true
    },
    isPremium: {
      type: Boolean,
      required: true,
      default: false
    },
    isPublished: {
      type: Boolean,
      required: true,
      default: false,
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
    votes: [voteSchema],
    netVotes: {
      type: Number,
      required: true,
      default: 0,
    },
    notes: {
      type: String,
      required: false
    },
  }, {
    timestamps: true,
  }
)

const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;
