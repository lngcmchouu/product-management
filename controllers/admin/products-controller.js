// [GET] /admin/products

const Product = require("../../models/product-model"); 
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");
const systemConfig = require("../../config/system");



// [GET] admin/products
module.exports.index = async(req, res) => {
  
  // console.log(req.query);
  //chức năng truy vấn trên URL
  let find ={
    deleted: false
  }
  // nếu truy vấn có key status thì truy vấn theo key availabilityStatus được cấu hình trong model Product (URL hiện là "status")
  if(req.query.status)
    find.availabilityStatus =
  req.query.status
  // hết truy vấn 

  // Filter
    const filterStatus = filterStatusHelper(req.query);
  // end filter
  // console.log(filterStatus);

  // search
  const search = searchHelper(req.query);
  // console.log(search);
  if(search.regex) 
    find.title = search.regex;
  // end search

  // pagination
  // model.countDocuments là hàm trả về tổng số lượng bản ghi theo điều kiện
  const countProducts = await Product.countDocuments(find);
  let pagination = paginationHelper(
    {
    limitItems: 5,
    currentPage: 1
    },
    req.query,
    countProducts
  );
  // end pagination
  

  // model.find().limit().skip() là hàm tìm kiếm data theo điều kiện và từ data đó giới hạn n bản ghi và bỏ qua n bản ghi 
  const products = await Product.find(find)
  .sort({ position:"asc"})
  .limit(pagination.limitItems)
  .skip(pagination.skip);



  
  const checkProducts = products.map(item => {
    item.priceNew = ((item.price) * (100 - item.discountPercentage) * 0.01).toFixed(0);
    
    if(item.availabilityStatus == "In Stock" || item.availabilityStatus == "Low Stock")
      item.status = "active";
    else 
      item.status = "unactive";
    
    return item;
  })

  res.render("admin/pages/products/index", {
    pageTitle: "Trang sản phẩm",
    products : checkProducts,
    filterStatus: filterStatus,
    keyword: search.keyword,
    pagination: pagination
  })
};

// [PATCH] admin/products/change-status/:status/:id
module.exports.changeStatus = async(req,res) =>{

  // console.log(req.params);
  const status = req.params.status;
  const id = req.params.id;

  //model.updateOne: hàm thao tác trong Mongoose dùng để update một sản phẩm, hàm nhận 2 đối số
  await Product.updateOne({_id: id},{availabilityStatus: status})

  // request messages
  req.flash("success","Cập nhật trạng thái thành công!");

  // res.redirect dùng để chuyển hướng trang cụ thể là trang trước. ở case này dùng với mục đích là load lại trang khi click vào button, hiển thị thay đổi
  res.redirect('back');
  
}

// [PATCH] admin/products/change-multi/:status/:id
module.exports.changeMulti = async(req, res) => {
  // để có thể hiển thị req.body cần install middleware body-parser vì express không tự động phân tích cú pháp request body bởi vì có nhiều loại dữ liệu khác nhau có thể cần xử lý (form-urlencoded, JSON, multipart, v.v.), và mỗi loại dữ liệu có cách xử lý riêng.
  const type = req.body.type;
  // data trả về ở dạng chuỗi nên cần covert sang mảng để update
  const arryIDs = req.body.ids.split(", ");

  switch(type){
    case "In Stock":
      // model.updateMany: hàm thao tác trong Mongoose dùng để update nhiều sản phẩm, hàm nhận 2 đối số, với tham số thứ nhất là một mảng id, tham số thứ hai là thuộc tính cần update 
      await Product.updateMany(
        {_id: { $in: arryIDs} },
        {availabilityStatus: "In Stock"}
      );
      req.flash("success",`Cập nhật trạng thái thành công ${arryIDs.length} sản phẩm`);
      break;
    case "Out Stock":
      await Product.updateMany(
        {_id: { $in: arryIDs} },
        {availabilityStatus: "Out Stock"}
      );
      req.flash("success",`Cập nhật trạng thái thành công ${arryIDs.length} sản phẩm`);
      break;
      // xóa các sản phẩm được chọn
    case "delete-all":
      await Product.updateMany(
        {_id: {$in: arryIDs} },
        { deleted: true,
          deletedAt: new Date()
        }
      );
      req.flash("success",`Xóa thành công ${arryIDs.length} sản phẩm`);
      break;

      // update vị trí hiển thị sản phẩm
    case"change-position":
      console.log(arryIDs);
      for(item of arryIDs)
      {
        // cú pháp destructing
        let [id, position] =
        item.split("-");
        position = parseInt(position);
        await Product.updateOne(
          {_id: id},
          { position: position}
        );
      }
      req.flash("success",`Cập nhật vị trí thành công ${arryIDs.length} sản phẩm`);
      break;
    default:
      break
  }

  

  res.redirect("back");

}

module.exports.deleteItem = async(req,res) => {
  const id = req.params.id;
  // xóa mềm
  await Product.updateOne(
    {_id: id },
    {deleted: true,
    deletedAt : new Date()}
  );
  // xóa khỏi database 
  // await Product.deleteOneOne(
  //   {_id: id }
  // );

  req.flash("success","Xoá thành công!");

  res.redirect("back");
}

module.exports.removePage = async(req,res) => {
 
  let find ={
    deleted : true
  }
  // search
  
  const search = searchHelper(req.query);
  // console.log(search);
  if(search.regex) 
    find.title = search.regex;
  // end search

  // pagination
  // model.countDocuments là hàm trả về tổng số lượng bản ghi theo điều kiện
  const countProducts = await Product.countDocuments(find);
  let pagination = paginationHelper(
    {
    limitItems: 5,
    currentPage: 1
    },
    req.query,
    countProducts
  );
  // end pagination
  

  // // model.find().limit().skip() là hàm tìm kiếm data theo điều kiện và từ data đó giới hạn n bản ghi và bỏ qua n bản ghi 
  const products = await Product.find(find).limit(pagination.limitItems).skip(pagination.skip);

  const checkProducts = products.map(item => {
    item.priceNew = ((item.price) * (100 - item.discountPercentage) * 0.01).toFixed(0);
    return item;
  });

  res.render("admin/pages/products/removePage", {
    pageTitle: "Trang sản phẩm",
    products : checkProducts,
    keyword: search.keyword,
    pagination: pagination
  })
  
}

module.exports.restoreItem = async(req, res) =>{
  const id = req.params.id;
  await Product.updateOne(
    {_id : id},
    {deleted : false}
  )

  req.flash("success","Khôi phục sản phẩm thành công");

  res.redirect('back');
  

}

module.exports.createPage = async(req, res) => {
  res.render("admin/pages/products/create",{
    pageTitle:"Thêm mới sản phẩm",
  })
}

module.exports.createItem = async(req, res) => {
 
  // console.log(req.file);
 // transform type data
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  if(req.body.position == "")
  {
    const countProducts = await Product.countDocuments();
    req.body.position = countProducts + 1;
  }
  else{
    req.body.position = parseInt(req.body.position);
  }

  // lưu link ảnh vào database

  if(req.file)
  {
    req.body.thumbnail = `/uploads/${req.file.filename}`;
  }
  
  
  console.log(req.body);

  // tạo mới một sản phẩm
  try{
    const product = new Product(req.body);
    await product.save();
    req.flash("success"," Tạo sản phẩm thành công")
  }catch(error){
    req.flash("error","Tạo sản phẩm không thành công");
  }
  
  
  res.redirect(`${systemConfig.prefixAdmin}/products`);
}

module.exports.edit = async(req, res) => {

  // console.log(req.params.id);
  try{
    const find = {
      deleted: false,
      _id: req.params.id
    };
    const product = await Product.findOne(find);

    // console.log(product);


    res.render("admin/pages/products/edit",{
      pageTitle:"Chỉnh sửa sản phẩm",
      item: product
    })
  } catch(error)
    {
      res.redirect(`${systemConfig.prefixAdmin}/products`);
    }
  
  
}

module.exports.editPatch = async(req,res)=> {
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  
  req.body.position = parseInt(req.body.position);

  // lưu link ảnh vào database
  if(req.file)
  {
    req.body.thumbnail = `/uploads/${req.file.filename}`;
  }

  try{
    await Product.updateOne({
      _id: req.params.id
    },req.body);

    

    req.flash("success","Cập nhật thành công!");
  } catch(error){
    req.flash("error","Cập nhật thất bại!");
  }
  res.redirect("back"); 
}

module.exports.detail = async(req, res) => {

  // console.log(req.params.id);
  try{
    const find = {
      deleted: false,
      _id: req.params.id
    };
    const product = await Product.findOne(find);

    // console.log(product);


    res.render("admin/pages/products/detail",{
      pageTitle: product.title,
      item: product
    })
  } catch(error)
    {
      res.redirect(`${systemConfig.prefixAdmin}/products`);
    }
  
  
}


