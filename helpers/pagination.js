module.exports = (pagination, query, countProducts) =>{

  if(query.page)
  {
    pagination.currentPage = parseInt(query.page);
  }
  pagination.skip = (pagination.currentPage - 1) * pagination.limitItems

  // console.log(pagination.currentPage);
  const totalPage = Math.ceil(countProducts / pagination.limitItems);
  // console.log(totalPage);
  pagination.totalPage = totalPage;

  // end pagination
  return pagination
  

}