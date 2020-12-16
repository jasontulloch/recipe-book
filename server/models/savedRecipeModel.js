import mongoose from 'mongoose';

const savedRecipeSchema = mongoose.Schema(
  {
    recipe_name: { type: String, required: true },
  }, {
    timestamps: true,
  }
);

export default savedRecipeSchema;
