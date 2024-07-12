// play animations
AOS.init();

//navbar welcome

if (AuthController.isLoggedIn()) {
  const loggedUser = document.getElementById("logged-user");
  loggedUser.innerHTML = `
        <div class="dropdown nav-link p-0">
          <button class="btn text-white dropdown-toggle p-0 p-xl-2" type="button" data-bs-toggle="dropdown" aria-expanded="false"> 
           <i class="bi bi-person-fill"> Hi Ahmed!</i>
          </button>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="userDashboard.html">Profile</a></li>
            <li><a class="dropdown-item" href="orders.html">Orders</a></li>
            <li class="d-flex justify-content-center mt-2"><button class="btn btn-info col-10 ">Logout</button></li>
          
          </ul>
        </div>
        `;
}

//scroll buttons
document
  .getElementById("scroll-btn-right")
  .addEventListener("click", function () {
    const scrollableContent = document.querySelector(".scrollable-content");
    scrollableContent.scrollBy({ left: 400, behavior: "smooth" });
  });
document
  .getElementById("scroll-btn-left")
  .addEventListener("click", function () {
    const scrollableContent = document.querySelector(".scrollable-content");
    scrollableContent.scrollBy({ left: -400, behavior: "smooth" });
  });

//shuffle array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}

// update cart icon notification
CartController.updateCartIcon();
// Load featured products on home page
if (document.getElementById("featured-products")) {
  const products = Product.getProducts();
  let featuredProducts = products.slice(0, 8); // Example: get the first 8 products
  featuredProducts = shuffleArray(featuredProducts);
  const featuredProductsContainer =
    document.getElementById("featured-products");

  featuredProducts.forEach((product) => {
    const productCard = `
    <!-- card start -->
        <div class="card me-4">
          <img
            src="../assets/images/${product.imgName}"
            class="card-img-top rounded-2 mt-3"
            alt="${product.name}"
          />
          <div class="product-btns d-flex flex-column">
            <a id="add-to-cart" class="btn btn-primary rounded-5 mb-2" onclick="CartController.addToCart('${product.itemId}', 1); CartController.changeIcon(this); CartController.updateCartIcon();
"
              ><i class="cart-icon bi bi-cart-plus-fill"></i>
            </a>
            <a class="btn btn-secondary rounded-5"
            onclick="WishlistController.addToWishlist('${product.itemId}'); WishlistController.changeIcon(this);"
              
              ><i class="bi bi-bag-heart"></i
            ></a>
          </div>
         <div class="card-body">
            <h6 class="mb-3">${product.name}</h6>
            <div class="d-flex flex-column align-items-start">
              <h4 class="mb-3"><span class="currency me-1">EGP</span>${product.price}</h4>
              <a
                href="productDetails.html?id=${product.itemId}"
                class="btn btn btn-outline-dark btn-sm"
                >View Details</a
              >
            </div>
          </div>
        </div>
        <!-- card end -->
              
          `;
    featuredProductsContainer.innerHTML += productCard;
  });
}
