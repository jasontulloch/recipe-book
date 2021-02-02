//import path from 'path';
//import express from 'express';
//import multer from 'multer';

//const router = express.Router();

//const storage = multer.diskStorage({
//destination(req, file, cb) {
//  cb(null, 'uploads/')
//},
//filename(req, file, cb) {
//  cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
//}
//})

//function checkFileType(file, cb) {
//const filetypes = /jpg|jpeg|png/
//const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
//const mimetype = filetypes.test(file.mimetype)

//if(extname && mimetype) {
//  return cb(null, true)
//} else {
//  cb('Images only!')
//}
//}

//const upload = multer({
//storage,
//fileFilter: function(req, file, cb) {
//  checkFileType(file, cb)
//}
//})

// Route will be api/upload so we only need '/'
// Single is to upload one image (will update later to multiple)
// res.send gives us path and then on FE we can set it to part of our state to go into DB
//router.post('/', upload.single('image'), (req, res) => {
//res.send(`/${req.file.path}`)
//})

//export default router;

import express from 'express';
import aws from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import path from 'path';

const router = express.Router();

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: 'us-west-2',
  signatureVersion: 'v4'
})

const s3 = new aws.S3()

//const fileFilter = (req, file, cb) => {
//  function checkFileType(file, cb) {
//    const filetypes = /jpg|jpeg|png/
//    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
//    const mimetype = filetypes.test(file.mimetype)

//  if(extname && mimetype) {
//    return cb(null, true)
//    } else {
//      cb('Images only!')
//    }
//  }
//}

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

//const Bucket = process.env.S3_BUCKET

// Mongo Storage? May remove in the future (heavy on website?)
//const storage = multer.diskStorage({
//  destination(req, file, cb) {
//    cb(null, 'uploads/')
//  }
//})

const upload = multer({
  limits: { fileSize: 2000000 },
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb)
  },
  storage: multerS3({
    s3: s3,
    bucket: 'recipebook-recipe-cover-images',
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + '-' + file.originalname);
    },
  }),
  //localStorage
})

// This one line below works (kinda)!
router.post('/', upload.any())

//router.post('/', upload.single('image'), (req, res, next) => {
//  res.redirect('/recipes')
//})

//router.post('/', upload.single('image'), (req, res) => {
//  res.send(`/${req.file.path}`)
//})

//const singleUpload = upload.single("image");

//router.post("/", function (req, res) {
  //const uid = req.params.id;
//  const uid = '6011f58d1f83da228dd25a34'

//  singleUpload(req, res, function (err) {
//    if (err) {
//      return res.json({
//        success: false,
//        errors: {
//          title: "Image Upload Error",
//          detail: err.message,
//          error: err,
//        },
//      })
//    }

//    return res.json({'recipe_cover_image': req.file.location})
//  })
//})

//    let update = { recipe_cover_image: req.file.location };

//    Recipe.findByIdAndUpdate(uid, update, { new: true })
//      .then((recipe) => res.status(200).json({ success: true, recipe: recipe }))
//      .catch((err) => res.status(400).json({ success: false, error: err }));
//  });
//});

export default router;
