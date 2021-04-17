import express from 'express';
import aws from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3-transform';
import path from 'path';
import sharp from 'sharp';
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
  // limiting file to 10mb - note that square photos from iphone hit max size of 5mb
  limits: { fileSize: 10000000 },
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb)
  },
  storage: multerS3({
    s3: s3,
    bucket: 'recipebook-recipe-cover-images',
    shouldTransform: function (req, file, cb) {
      cb(null, /^image/i.test(file.mimetype))
    },
    transforms: [{
      id: 'original',
      key: function (req, file, cb) {
        cb(null, Date.now().toString() + '-' + file.originalname);
      },
      transform: function (req, file, cb) {
        cb(null, sharp().resize(500,500).rotate().jpeg())
      }
    }, {
      id: 'thumbnail',
      key: function (req, file, cb) {
        cb(null, Date.now().toString() + '-' + file.originalname);
      },
      transform: function (req, file, cb) {
        cb(null, sharp().resize(500,500).rotate().jpeg())
      }
    }],
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    //key: function (req, file, cb) {
    //  cb(null, Date.now().toString() + '-' + file.originalname);
    //},
  }),
})

const singleUpload = upload.any()

router.route('/:id')
  .put(singleUpload, uploadRecipeCoverImage)

export default router;
