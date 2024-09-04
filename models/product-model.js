const mongoose = require("mongoose");
const { default: slugify } = require("slugify");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    slug: {
      type: String,
      trim: true,
      unique: true,
  },
    
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    rating: Number,
    stock: Number,
    brand: String,
    category: String,
    thumbnail: String,
    status: String,
    availabilityStatus: String,
    deleted: {
      type :Boolean,
      default: false
    },
    deletedAt : Date,
    position: Number
  },
  {
    //  tính năng timestamps dùng để tự động thêm các trường createdAt và updatedAt để cho ra thời gian tạo mới và update sản phẩm
    timestamps: true
  }
);

productSchema.pre('save', function (next) {
  if (!this.isModified('title')) return next();
  this.slug = slugify(this.title, { lower: true, trim: true });
  next();
});
productSchema.pre('updateOne', async function (next) {
  const update = this.getUpdate();
  if (update.title) {
    update.slug = slugify(update.title, { lower: true, trim: true });
  }
  next();

});
// mongoose.model() have three arguments: modelName, schema and collectionName. In case, dev dont write the third argument, Mongoose automatically looks for the plural, lowercased version of your model name.
const Product = mongoose.model('Product', productSchema, "products");

module.exports =Product;