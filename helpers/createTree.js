let count = 0;
const createTree = (arr, parentId = "") =>{
  const tree =[];
  arr.forEach((item) =>{
    // console.log(item.title);
    if(item.parent_id === parentId)
    { 
      // console.log(item.id,item.title);
      count++;
      const newItem = item;
      newItem.index = count;
      const children = createTree(arr, item.id);
      if(children.length > 0)
      {
        // console.log(newItem.title,children)
        newItem.children = children
      }
      // console.log("Item được push: ",newItem.title)
      tree.push(newItem);
      
    }
  })
  // console.log(tree);
  return tree;
}


module.exports.tree = (arr, parentId ="") => {
  count = 0;
  const tree = createTree(arr, parentId = "");
  return tree;
}