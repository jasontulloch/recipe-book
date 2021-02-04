import express from 'express';
import multer from 'multer';
import path from 'path';

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}` + '-' + file.originalname)
  }
})

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
  storage,
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb)
  }
})

// Route will be api/upload so we only need '/'
// Single is to upload one image (will update later to multiple)
// res.send gives us path and then on FE we can set it to part of our state to go into DB
router.post('/', upload.single('image'), (req, res) => {
  res.send(`/${req.file.path}`)
})

export default router;

// Old code - need to save path into Mongo and match it w whats in s3

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
