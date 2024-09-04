const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')
// connect account cloudinary to save img online
cloudinary.config({ 
  cloud_name: 'dtaj1q8fh', 
  api_key: '343314778436613', 
  api_secret: 'rvLJvdCFUIqpfz2o7PZc8imSOHE' // Click 'View API Keys' above to copy your API secret
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
      req.body[req.file.fieldname] = result.url
      next();
    }

    upload(req);
  }
  else{
  next();
  }
}