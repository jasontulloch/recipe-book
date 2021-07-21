import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import chefs from "./data/chefs.js";
import recipes from "./data/recipes.js";
import Chef from "./models/chefModel.js";
import Recipe from "./models/recipeModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Recipe.deleteMany();
    await Chef.deleteMany();

    const createdChefs = await Chef.insertMany(chefs);

    const adminChef = createdChefs[0]._id;

    const sampleRecipes = recipes.map(recipe => {
      return {
        ...recipe,
        chef: adminChef
      };
    });

    await Recipe.insertMany(sampleRecipes);

    console.log("Data Imported!".green.inverse);
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
}

if (process.argv[2] === '-d') {
  destroyData
} else {
  importData()
}
