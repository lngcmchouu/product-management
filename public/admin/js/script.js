// Button status
//Code này để lắng nghe sự kiện khi click vào button và đưa req lên URL để controller xử lí
const buttonStatus = document.querySelectorAll("[btn-status]");
if (buttonStatus.length > 0) {
  //window.location.href: lấy ra url đang hiển thị 
  // new URL là cú pháp khởi tạo một đối tượng "URL" có các thuộc tính và phương thức nhằm phân tích cú pháp (parse) và thao tác với các phần khác nhau của một URL, như host, pathname, search (query string), hash, v.v.
  let url = new URL(window.location.href);
  // console.log(url);

  buttonStatus.forEach(button => {
    button.addEventListener("click", () => {
      const status = button.getAttribute("btn-status");
      console.log(status);

      if (status) {
        // set params và key cho phần search
        url.searchParams.set("status", status);
      } else {
        url.searchParams.delete("status");
      }

      // window.location.search: lấy ra chuỗi truy vấn sau dấu "?"
      // const queryString = window.location.search;
      // console.log(queryString);

      // URLSearchParams(): tạo một đối tượng đại diện cho các tham số truy vấn (query parameters) trong một URL, dùng để thao tác với chuỗi truy vấn (query string) của một URL, thêm, xóa, hoặc thay đổi các tham số truy vấn.
      // const urlParams = new URLSearchParams(queryString);
      // console.log(urlParams);

      if (url.searchParams.has('page'))
        url.searchParams.delete("page");
      // chuyển hướng url sang trang khác
      window.location.href = url.href;
    });
  });
}
// end button status

// Form search
const formSearch = document.querySelector("#form-search");
if (formSearch) {
  let url = new URL(window.location.href);
  formSearch.addEventListener("submit", (e) => {
    // preventDefault dùng để ngăn chặn tìm kiếm mặc định, vì nó sẽ xóa các param được req ở trước
    e.preventDefault();


    const keyword = e.target.elements.keyword.value
    if (keyword) {
      url.searchParams.set("keyword", keyword);
    } else {
      url.searchParams.delete("keyword");
    }
    window.location.href = url.href;
  })
}
// End Form search

// pagination
const btnPagination = document.querySelectorAll(".page-link");
// console.log(btnPagination);
if (btnPagination) {
  let url = new URL(window.location.href);
  btnPagination.forEach(btn => {
    btn.addEventListener("click", () => {
      // console.log(btn);
      const numberPage = btn.getAttribute("btn-pagination");
      console.log(numberPage);
      if (numberPage) {
        url.searchParams.set("page", numberPage);
        // console.log(numberPage);
      } else
        url.searchParams.delete("page");
      window.location.href = url.href
    });
  });
}
// end pagination

// checkBox Multi
const checkBoxMulti = document.querySelector("[checkbox-multi]");
if (checkBoxMulti) {
  const inputCheckAll = checkBoxMulti.querySelector("input[name= 'checkAll']");
  const inputsID = checkBoxMulti.querySelectorAll("input[name='id']");

  inputCheckAll.addEventListener("click", () => {

    if (inputCheckAll.checked) {
      inputsID.forEach(input => {
        input.checked = true;
      });
    } else {
      inputsID.forEach(input => {
        input.checked = false;
      });
    }
  })

  inputsID.forEach(input => {
    input.addEventListener("click", () => {
      const countChecked = checkBoxMulti.
      // "input[name='ids']:checked" là một selector trong CSS và JavaScript dùng để chọn các phần tử <input> có thuộc tính name bằng ids và đồng thời đang ở trạng thái "được chọn" (checked). 
      querySelectorAll("input[name='id']:checked").length;
      if (countChecked == inputsID.length)
        inputCheckAll.checked = true;
      else
        inputCheckAll.checked = false;

    });
  });

}

// End checkBox Multi

// Form change Multi
const formChangeMulti = document.querySelector("[form-change-multi]");
if (formChangeMulti) {
  formChangeMulti.addEventListener("submit", (e) => {
    e.preventDefault();

    const checkboxMulti = document.querySelector("[checkbox-multi]");
    const inputsChecked = checkboxMulti.querySelectorAll("input[name='id']:checked");

    // delete choice
    const typeChange = e.target.elements.type.value;
    if (typeChange == "delete-all") {
      const isConfirm = confirm("Bạn có chắc muốn xóa các sản phẩm này ?");
      // nếu nhấn hủy thì các code ở dưới sẽ không chạy được do return;
      if (!isConfirm)
        return;

    }


    if (inputsChecked.length > 0) {
      let ids = [];

      const inputIds = formChangeMulti.querySelector("input[name='ids']");

      inputsChecked.forEach(input => {
        
        const id = input.value;
        

        if (typeChange == "change-position") {
          // closest(): một phương thức của DOM giúp tìm phần tử cha gần nhất của phần tử hiện tại, nếu không có trả về null.
          // đang truy cập đến value của position của sản phẩm được click
          const position = input.closest("tr").querySelector("input[name ='position']").value;
          ids.push(`${id}-${position}`);
        } else {
          ids.push(id);
        }


      });

      // console.log(ids.join(", "));
        inputIds.value = ids.join(", ");
        formChangeMulti.submit();
    } else
      alert("Vui lòng chọn ít nhất một bản ghi");
  })
}

// End form change multi

// Show alert
const showAlert = document.querySelector("[show-alert]");
if(showAlert)
{
  const time = parseInt(showAlert.getAttribute("data-time"));
  setTimeout(() =>{
    showAlert.classList.add("alert-hidden");
  }, time)

  const closeAlert = showAlert.querySelector("[close-alert]")
  closeAlert.addEventListener("click",() =>{
    showAlert.classList.add("alert-hidden");
  })
}
// End show alert

// Upload and delete img preview

const uploadImg = document.querySelector("[upload-img]")

if(uploadImg) {
  const uploadImgInp = document.querySelector("[upload-img-inp]");

  const uploadImgPre = document.querySelector("[upload-img-pre]")

  uploadImgInp.addEventListener("change",(e)=>{
    console.log(e);

    btnClose = document.querySelector(".btn-close");
    btnClose.classList.remove("d-none");

    // destructing từ mảng
    const [file] = uploadImgInp.files;
    //hoặc file = e.target.files[0]
    if(file){

      // URL.createObjectURL() là một phương thức trong JavaScript dùng để tạo một URL tạm thời (blob URL) đại diện cho một đối tượng File, Blob, hoặc MediaSource
      uploadImgPre.src =URL.createObjectURL(file) 
    }

    btnClose.addEventListener("click",()=>{
      uploadImgInp.value ="";
      uploadImgPre.src="";
      btnClose.classList.add("d-none")
    })

  })
}

// End upload img preview


// Sort by selection form
const sort = document.querySelector("[sort]");
// console.log(sort);
if(sort){
  let url = new URL(window.location.href);
  const sortSelect = sort.querySelector("[sort-select]");
  const sortClear = sort.querySelector("[sort-clear]");

  sortSelect.addEventListener("change", (e) => {
    const value = e.target.value
    const [sortKey,sortValue] = value.split("-")
    url.searchParams.set("sortKey",sortKey);
    url.searchParams.set("sortValue",sortValue);
    window.location.href = url.href;
  })

  // add selected for option
  const sortKey = url.searchParams.get("sortKey");
  const sortValue = url.searchParams.get("sortValue");
  // console.log(sortKey);
  // console.log(sortValue);
  if(sortKey && sortValue)
  {
    const stringSort = `${sortKey}-${sortValue}`;
    console.log(stringSort);
    // tìm option có chứa chuỗi string gồm giá trị của sortKey và sortValue
    const optionSelected = sortSelect.querySelector(`option[value='${stringSort}']`);
    console.log(optionSelected);
    optionSelected.selected = true;

  }
  // end add



  // clear sort
  sortClear.addEventListener("click", () => {
    url.searchParams.delete("sortKey");
    url.searchParams.delete("sortValue");
    window.location.href = url.href;
  })

}

  
  
  
// End sort
