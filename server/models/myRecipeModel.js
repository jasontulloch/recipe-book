import mongoose from 'mongoose';

const myRecipeSchema = mongoose.Schema(
  {
    recipe: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: 'Recipe'
    }
  }
);

export default myRecipeSchema;
