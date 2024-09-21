const { parse } = require("dotenv")
const Category = require("../../models/category-model.js")
const system = require("../../config/system.js")
const createTreeHelper = require("../../helpers/createTree.js")


// [GET] /admin/categories
module.exports.index = async(req,res) => {
  let find = {
    deleted: false
  };
  
  

  const category = await Category.find(find);
  // console.log(category)
  const newRecord = createTreeHelper.tree(category);
  // console.log(newRecord)


  res.render("admin/pages/categories/index",{
    pageTitle: "Danh mục sản phẩm",
    records: newRecord
  })
}

// [GET] /admin/categories/create
module.exports.create = async(req,res) => {
  let find = {
    deleted: false
  };


  const category = await Category.find(find);
  // console.log(category)
  const newRecord = createTreeHelper.tree(category);
  // console.log(newRecord);
  res.render("admin/pages/categories/create",{
    pageTitle: "Tạo danh mục sản phẩm",
    records: newRecord
  })
}

// [POST] /admin/categories/create
module.exports.createItem = async(req, res) => {
  if(req.body.position == "")
  {
    const countCategoies = await Category.countDocuments();
    req.body.position = countCategoies + 1;
  }
  else{
    req.body.position = parseInt(req.body.position);
  }

  try{
    const category = new Category(req.body);
    await category.save();
    req.flash("success"," Tạo danh mục thành công")
  }catch(error){
    req.flash("error","Tạo danh mục không thành công");
    console.log(error)
  }
  res.redirect(`${system.prefixAdmin}/categories`);

  
}