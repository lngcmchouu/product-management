// lưu trữ ảnh trên cloudinary 

const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')
// connect account cloudinary to save img online
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET // Click 'View API Keys' above to copy your API secret
});

module.exports.upload = (req, res, next) => {
  if(req.file)
  {
    let streamUpload = (req) => {
      return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream(
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };
  
    async function upload(req) {
      let result = await streamUpload(req);
      console.log(result.url);
      // đợi update link ảnh từ cloud trả về
      req.body[req.file.fieldname] = result.url
      next();
    }

    upload(req);
  }
  else{
  next();
  }
}