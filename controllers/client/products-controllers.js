const system = require("../../config/system");
const Product = require("../../models/product-model");

// [GET] /products
module.exports.index = async (req, res) => {
  const products = await Product
  .find({
    availabilityStatus: "In Stock",
  })
  .sort({position:"asc"});
  const newProducts = products.map(item => {
    item.priceNew = ((item.price) * (100 - item.discountPercentage) * 0.01).toFixed(0);
    return item;
  })
  // console.log(products);
  res.render("client/pages/products/index",{
    titlePage: "Trang sản phẩm",
    products: newProducts
  }
  );
};

module.exports.detail = async(req,res) =>{
  // console.log(req.params.slug);

  try{
    const find = {
      deleted : false,
      slug: req.params.slug,
      availabilityStatus: "In Stock"
    };

    const product = await Product.findOne(find);

    // console.log(product)
    res.render("client/pages/products/detail",{
      titlePage: "Chi tiết sản phẩm",
      item: product
    });


  }catch(error)
  {
    res.redirect(`${systemConfig.prefixAdmin}/products`);
  }

 
}