const express = require('express');
const router = express.Router();
const controller = require("../../controllers/admin/categories-controller.js");

const multer = require('multer');
const upload = multer();
const validate = require("../../validates/admin/categoriesValidate.js");
const uploadCloud = require("../../middleware/admin/uploadCloud.middleware");




router.get('/', controller.index);

router.get('/create',controller.create);

router.post(
  '/create',
  upload.single('thumbnail'),
  
  uploadCloud.upload,
  
  validate.createItem,

  controller.createItem
);

module.exports = router;