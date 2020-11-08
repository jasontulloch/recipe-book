import mongoose from 'mongoose';
import Comment from './commentModel.js';
import Allergin from './allerginModel.js';

const recipeSchema = mongoose.Schema(
  {
    chef: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: 'Chef'
    },
    recipe_name: {
      type: String,
      required: true
    },
    recipe_cover_image: {
      type: String,
      required: true
    },
    steps : {
      type: Array,
      default: []
    },
    ingredient_1: {
      type: String,
      required: true
    },
    ingredient_2: {
      type: String,
      required: false
    },
    ingredient_3: {
      type: String,
      required: false
    },
    ingredient_4: {
      type: String,
      required: false
    },
    ingredient_5: {
      type: String,
      required: false
    },
    ingredient_6: {
      type: String,
      required: false
    },
    ingredient_7: {
      type: String,
      required: false
    },
    ingredient_8: {
      type: String,
      required: false
    },
    ingredient_9: {
      type: String,
      required: false
    },
    ingredient_10: {
      type: String,
      required: false
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
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numComments: {
      type: Number,
      required: true,
      default: 0
    },
    isPublished: {
      type: Boolean,
      required: true,
      default: false,
    },
    diets: [{
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
      }
    }],
    allergin: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: 'Allergin'
    },
  }, {
    timestamps: true,
  }
)

const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;
