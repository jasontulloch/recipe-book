import asyncHandler from 'express-async-handler';
import Recipe from '../models/recipeModel.js';

// @description Upload
// @route PUT /api/uploadAWS/:id
// @access Private
const uploadRecipeCoverImage = asyncHandler(async (req, res) => {
  const {
    recipe_cover_image,
  } = req.body

  const uid = req.params.id
  const recipe = await Recipe.findById(uid)

  const uploadImage = { recipe_cover_image: req.files[0].location }

  Recipe.findByIdAndUpdate(uid, uploadImage, { new: true })
    .then((recipe) => res.status(200).json({success:true, recipe:recipe}))
    .catch((recipe) => res.status(400).json({success:false, error:err}))

  // Code above works,just need to update 'some string'

  //const recipe = await Recipe.findByIdAndUpdate(req.params.id)

  //  let update = { profilePicture: req.file.location };

  //  User.findByIdAndUpdate(uid, update, { new: true })
  //    .then((user) => res.status(200).json({ success: true, user: user }))
  //    .catch((err) => res.status(400).json({ success: false, error: err }));

  //if(recipe) {
  //  recipe.recipe_cover_image = recipe_cover_image

  //  const updatedRecipe = await recipe.save()
  //  res.json(updatedRecipe)

  //} else {
  //    res.status(404)
  //    throw new Error('Recipe not found')
  //}
})

export {
  uploadRecipeCoverImage
}
