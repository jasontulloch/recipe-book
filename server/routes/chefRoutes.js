import express from 'express';
import {
  authChef,
  registerChef,
  getChefProfile,
  updateChefProfile,
  getChefs,
  deleteChef,
  getChefByIdAdmin,
  getChefById,
  updateChef
} from '../controllers/chefController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(registerChef)
  .get(protect, admin, getChefs)
router.post('/login', authChef)
router.route('/profile')
  .get(protect, getChefProfile)
  .put(protect, updateChefProfile)
router.route('/:id')
  .delete(protect, admin, deleteChef)
  .get(protect, admin, getChefByIdAdmin)
  .put(protect, admin, updateChef)

// AWS S3
//import upload from '../services/imageUpload.js';
//router.post('/:id/add-recipe-image', upload.single('image'), (req, res) => {
//  res.send(`/${req.file.path}`)
//})
//const singleUpload = upload.single("image");

//router.post("/:id/add-recipe-image", function (req, res) {
//  const uid = req.params.id;

//  singleUpload(req, res, function (err) {
//    if (err) {
//      return res.json({
//        success: false,
//        errors: {
//          title: "Image Upload Error",
//          detail: err.message,
//          error: err,
//        },
//      });
//    }

//    let update = { recipe_cover_image: req.file.location };

//    Chef.findByIdAndUpdate(uid, update, { new: true })
//      .then((chef) => res.status(200).json({ success: true, chef: chef }))
//      .catch((err) => res.status(400).json({ success: false, error: err }));
//  })
//})

export default router;
