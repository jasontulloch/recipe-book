import express from 'express';
import aws from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import path from 'path';

import {
  uploadChefPicture,
} from '../controllers/uploadChefPictureController.js';
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
  limits: { fileSize: 20000000 },
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb)
  },
  storage: multerS3({
    s3: s3,
    bucket: 'recipe-book-chef-picture',
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
  .put(singleUpload, uploadChefPicture)

export default router;
