module.exports = (query) =>{

  // chức năng filter và hiển thị active button khi click vào
  let filterStatus = [
    {
      name: "Tất cả",
      status:"",
      class :""
    },
    {
      name: "Hoạt động",
      status:"In Stock",
      class:""

    },
    {
      name: "Dừng hoạt động",
      status:"Out Stock",
      class:""
    }
  ]

  if(query.status) {
    // findIndex: tìm index của một bản ghi thỏa mãn một điều kiện nào đó 
    // index đang đi tìm vị trí của bản ghi, nếu value của key status được req trùng với value của key status của filterStatus
    const index = filterStatus.findIndex(item => item.status == query.status);

    // console.log(index);
    // gán class ="active" tại index được tìm ra 
    filterStatus[index].class="active";
  }
  else{
    // index đang đi tìm vị trí của bản ghi với điều kiện là value của key status của filterStatus là chuỗi rỗng hoặc không có key status trên url dc req
    const index = filterStatus.findIndex(item => item.status == "");
    filterStatus[index].class="active";

  }
  return filterStatus;

  // end filter và chức năng hiển thị active
}