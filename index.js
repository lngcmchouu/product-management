// use express
const express = require('express');
const app = express();
const path = require("path");


// slug use in URL to make them more readable, SEO-friendly, and distinguishable 
const mongoose = require('mongoose');
const slugify = require('slugify');
// app.use(slugify)


// use flash to show messages
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require('express-flash')
// sử dụng một key random để bảo mật
app.use(cookieParser('FKAGAKKA'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

// TinyMCE
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
// End TinyMCE

// use method-override to use PATCH, DELETE, PUT method
var methodOverride = require('method-override');
app.use(methodOverride('_method'));


// body-parser là một middleware (phần mềm trung gian) trong Express. Nó được sử dụng để phân tích cú pháp (parse) phần thân của các yêu cầu HTTP (request body) để có thể truy cập dữ liệu từ các form hoặc dữ liệu JSON dễ dàng.
var bodyParser = require('body-parser');
// bodyParser.urlencoded() là một phương thức của body-parser middleware, được sử dụng để phân tích cú pháp dữ liệu form URL-encoded (dữ liệu từ các form HTML gửi lên với Content-Type là application/x-www-form-urlencoded).
// Khi extended: false, body-parser sẽ sử dụng thư viện querystring của Node.js để phân tích cú pháp dữ liệu, chỉ có thể xử lý các đối tượng đơn giản, không lồng nhau.
//còn extended: true, body-parser sẽ sử dụng thư viện qs để phân tích cú pháp, cho phép xử lý các đối tượng phức tạp hơn, với các giá trị lồng nhau (nested)
app.use(bodyParser.urlencoded({ extended: false }))


// use .env
require('dotenv').config();
const port = process.env.PORT;
console.log(port);

// connect database
const database = require("./config/database");
database.connect();
database.addField();
database.updateSlug();


// use pug
app.set("views", `${__dirname}/views`);
app.set("view engine","pug");

// use static file 
// when deploying project, online dont known "public" come to what so u must use __dirname
// __dirname is an environment variable that tells you the absolute path of the directory containing the currently executing file.
app.use(express.static(`${__dirname}/public`));


// use route client
const routeClient = require("./routes/client/index-route");
//Routes
routeClient(app);

// use route admin
const routeAdmin = require("./routes/admin/index-route");
routeAdmin(app);


const systemConfig = require("./config/system");
// app.local là cách tạo biến dùng cho các file để render ra sản phẩm như pug, nên dùng cho prefixAdmin để tất cả các file pug đều có thể sử dụng được.
// app locals variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})