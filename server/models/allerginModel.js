import mongoose from 'mongoose';
import Recipe from './recipeModel.js';

const Schema = mongoose.Schema;
// Individual review schema
// Normal to put in separate file but very small
const allerginSchema = mongoose.Schema(
  {
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
    }
  }, {
    timestamps: true,
  }
);

const Allergin = mongoose.model('Allergin', allerginSchema);

export default Allergin;
