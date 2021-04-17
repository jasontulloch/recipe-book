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

  // console log req.files to see what is going on here - just have to find the location to save in the document
  const uploadImage = { recipe_cover_image: req.files[0].transforms[0].location }

  console.log(req.files[0].transforms[0])

  Recipe.findByIdAndUpdate(uid, uploadImage, { new: true })
    .then((recipe) => res.status(200).json({success:true, recipe:recipe}))
    .catch((recipe) => res.status(400).json({success:false, error:err}))
})

export {
  uploadRecipeCoverImage
}
