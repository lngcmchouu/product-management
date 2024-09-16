const mongoose = require("mongoose");
const { default: slugify } = require("slugify");

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    parent_id:{
      type:String,
      default: ""
    },
    slug: {
      type: String,
      trim: true,
      unique: true,
  },
    description: String,
    thumbnail: String,    availabilityStatus: String,
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

categorySchema.pre('save', function (next) {
  if (!this.isModified('title')) return next();
  this.slug = slugify(this.title, { lower: true, trim: true });
  next();
});
categorySchema.pre('updateOne', async function (next) {
  const update = this.getUpdate();
  if (update.title) {
    update.slug = slugify(update.title, { lower: true, trim: true });
  }
  next();

});
// mongoose.model() have three arguments: modelName, schema and collectionName. In case, dev dont write the third argument, Mongoose automatically looks for the plural, lowercased version of your model name.
const Category = mongoose.model('Category', categorySchema, "category");

module.exports = Category;