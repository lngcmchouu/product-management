const multer = require('multer');
// cấu hình việc lưu file ở đâu và lưu tên file gồm những thành phần gì để client có thể xem rõ ảnh
module.exports = () =>{
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      
      cb(null,`${uniqueSuffix}-${file. originalname}`);
    }
  })
  return storage;
}