const dashboardRoutes = require("./dashboard-route")

const productsdRoutes = require("./products-route")

const categoriesRoutes = require("./categories-route")

const systemConfig = require("../../config/system")

module.exports = (app) => {
  const PATH_ADMIN = systemConfig.prefixAdmin;

  // vì không phải lúc nào method cũng là get (lấy data) nên sử dụng .use() để áp dụng một cách tổng quan, khi vô sâu các route con khác thì hẳn cấu hình bằng các method cụ thể
 app.use(PATH_ADMIN + "/dashboard",dashboardRoutes);

 app.use(PATH_ADMIN + "/products",productsdRoutes);

 app.use(PATH_ADMIN + "/categories",categoriesRoutes);
}
