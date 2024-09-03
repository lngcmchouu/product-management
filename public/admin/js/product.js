// Button change status
const btnChangeStatus = document.querySelectorAll("[button-changeStatus]");
// console.log(btnChangeStatus);
if(btnChangeStatus.length > 0)
{
  const formChangeStatus = document.querySelector("#form-changeStatus");
  console.log(formChangeStatus);
  
  const path = formChangeStatus.getAttribute("data-path");
  // console.log(path);
  btnChangeStatus.forEach(btn => {
    btn.addEventListener("click", () =>{
      const statusCurrent = btn.getAttribute("data-status");
      const id = btn.getAttribute("data-id");
      
      let statusAfter = statusCurrent == "In Stock" ? "Out Stock" : "In Stock";

      // console.log(statusCurrent);
      // console.log(id);
      // console.log(statusAfter);

      const action = path + `/${statusAfter}/${id}?_method=PATCH`;
      // console.log(=action);

      formChangeStatus.action = action;
      formChangeStatus.submit();
    });
  });
}

// delete item
  const buttonDelete = document.querySelectorAll("[button-delete]");
  if(buttonDelete.length > 0)
  {
    const formDeleteItem = document.querySelector("#form-delete-item");
    const path = formDeleteItem.getAttribute("data-path");
    buttonDelete.forEach(button => {
      button.addEventListener("click", () => {
        const isConfirm = confirm("Bạn chắc chắn muốn xóa sản phẩm này");
        if(isConfirm)
        {
          const id = button.getAttribute("data-id");
          console.log(id);

          // gửi lên server url có method là DELETE
          const action = `${path}/${id}?_method=DELETE`;
          console.log(action);
           formDeleteItem.action = action;
          formDeleteItem.submit();
        }
      });
    });
  }
 

// end delete item

// restore item
const buttonRestore = document.querySelectorAll("[button-restore]");
if(buttonRestore.length > 0){
  const formRestoreItem = document.querySelector("#form-restore-item");  
  const path = formRestoreItem.getAttribute("data-path");
  buttonRestore.forEach(btn => {
    btn.addEventListener("click",() =>{
      const id = btn.getAttribute("data-id");
      const action = `${path}/${id}?_method=PATCH`
      console.log(action);
      formRestoreItem.action= action;
      formRestoreItem.submit();

    });  
  })
  
}

// end restore item