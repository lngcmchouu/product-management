console.log("OK");

const priceOld = document.querySelectorAll(".inner-price-old")
priceOld.forEach(price =>{
  const priceNew = price.closest(".inner-content").querySelector(".inner-price-new")
  if(priceNew){
    price.classList.add("text-decoration-line-through")
  }
});


