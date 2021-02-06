import express from 'express';
import aws from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import path from 'path';
//import cors from 'cors';
//import Recipe from '../models/recipeModel.js';
//import dotenv from 'dotenv';
//import { default as mongodb } from 'mongodb';
//const MongoClient = mongodb.MongoClient;
//import asyncHandler from 'express-async-handler';
import {
  uploadRecipeCoverImage,
} from '../controllers/uploadController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

//router.use(cors());

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: 'us-west-2',
  signatureVersion: 'v4'
})

const s3 = new aws.S3()

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if(extname && mimetype) {
    return cb(null, true)
  } else {
    cb('Images only!')
  }
}

const upload = multer({
  limits: { fileSize: 2000000 },
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb)
  },
  storage: multerS3({
    s3: s3,
    bucket: 'recipebook-recipe-cover-images',
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + '-' + file.originalname);
    },
  }),
})

const singleUpload = upload.any()

router.route('/:id')
  .put(singleUpload, uploadRecipeCoverImage)

//dotenv.config();

//const uri = process.env.MONGO_URI



//router.post('/:id', function (req, res) {
//  const uid = req.params.id;

//  const getRecipeById = asyncHandler(async (req, res) => {
//    const recipe = await Recipe.findById(req.params.id)

//    if (recipe) {
//      res.json(recipe)
//    } else {
//    res.status(404)
//      throw new Error('Recipe not found')
//    }
//  })
//})

//singleUpload(req, res, function (err) {
//  if (err) {
//    return res.json({
//    success: false,
//      errors: {
//        title: "Image Upload Error",
//        detail: err.message,
//        error: err,
//      },
//    });
//  }

//  let update = { profilePicture: req.file.location };

//  User.findByIdAndUpdate(uid, update, { new: true })
//    .then((user) => res.status(200).json({ success: true, user: user }))
//    .catch((err) => res.status(400).json({ success: false, error: err }));
//});


export default router;
