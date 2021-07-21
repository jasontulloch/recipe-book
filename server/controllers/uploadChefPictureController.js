import asyncHandler from 'express-async-handler';
import Chef from '../models/chefModel.js';

// @description Upload
// @route PUT /api/uploadAWS/:id
// @access Private
const uploadChefPicture = asyncHandler(async (req, res) => {
  const {
    chefPicture,
  } = req.body

  const uid = req.params.id
  const chef = await Chef.findById(uid)

  // console log req.files to see what is going on here - just have to find the location to save in the document
  const uploadImage = { chefPicture: req.files[0].transforms[0].location }

  Chef.findByIdAndUpdate(uid, uploadImage, { new: true })
    .then((chef) => res.status(200).json({success:true, chef:chef}))
    .catch((chef) => res.status(400).json({success:false, error:err}))
})

export {
  uploadChefPicture
}
