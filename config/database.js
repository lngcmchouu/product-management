const mongoose = require("mongoose");
const Product = require("../models/product-model");
const { default: slugify } = require("slugify");
// check connect
module.exports.connect = async () =>{
  try{
    // use mongoose
    // console.log(process.env.MONGO_URL);
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connect Success!");
  } catch(error)
  {
    console.log("Connect Unsuccessfull");
    console.log(error);
  }
}
// update new field into database 
module.exports.addField = async() =>{
  try {
    const products = await Product.find(); // Lấy tất cả các documents
    let sequence = 1; // Khởi tạo số thứ tự từ 1
   

    for (let product of products) {
      product.position = sequence; // Thêm field mới với giá trị số thứ tự
      
      ; // Lưu lại từng document
      sequence++; // Tăng số thứ tự lênc
    }
    
    console.log('Field added successfully!');
  } catch (err) {
    console.error('Error adding field:', err);
  }
}

module.exports.updateSlug = async() =>{
  try {
    
      // Tìm tất cả các bản ghi có slug là ""
      const records = await Product.find({ slug: "" });
    
      // Cập nhật từng bản ghi
     // Sử dụng vòng lặp for để kiểm tra từng bản ghi
      for (let record of records) {
      // Tạo slug mới từ title
      const newSlug = slugify(record.title, { lower: true, strict: true });

      }
  

    console.log('All old records updated with slug.');
  } catch (err) {
    console.error('Error updating records:', err);
  } finally {
    
  }
}






