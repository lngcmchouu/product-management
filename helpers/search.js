module.exports = (query,find) =>{
  let objectSearch = {
    keyword: "",
    regex: ""
  };
  if(query.keyword){
    objectSearch.keyword = query.keyword;
    // để có thể tìm kiếm chỉ một từ mà ra các sản phẩm tương ứng thì sử dụng regular expression (biểu thức chính quy)
    // cú pháp khởi tạo biểu thức chính quy thông qua tên biến và không phân biệt chữ in hoa hay thường 
    const regex = new RegExp(objectSearch.keyword,"i");
    
    objectSearch.regex = regex;
    
  }
  return objectSearch;

}