const express = require('express');
const router = express.Router();

// sử dụng thư viện multer trong Node.js để cấu hình việc lưu trữ file khi người dùng tải file lên server (file upload).
const multer = require('multer');
const storageMulter = require("../../helpers/storageMulter");
const upload = multer({ storage: storageMulter() })


const controller = require("../../controllers/admin/products-controller");

const validate = require("../../validates/admin/productValidate");

router.get('/', controller.index);

// để truyền data động sử dụng ":"
router.patch("/change-status/:status/:id", controller.changeStatus);

router.patch("/change-multi", controller.changeMulti);

router.delete("/delete/:id", controller.deleteItem);

router.get("/remove", controller.removePage);

router.patch("/remove/:id", controller.restoreItem);

router.get("/create", controller.createPage);

router.post("/create", 
  upload.single('thumbnail'), 
  validate.createItem,
  controller.createItem);

router.get("/edit/:id",controller.edit);

router.patch("/edit/:id",
  upload.single('thumbnail'),
  validate.createItem,
  controller.editPatch  
)





module.exports = router;