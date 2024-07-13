window.addEventListener("DOMContentLoaded", () => {
  // Initialize animations
  AOS.init();

  // const wishlistLink = document.getElementById("wishlist-link");
  // if (!AuthController.getCurrentUser()) {
  //   wishlistLink.classList.add("d-none");
  // } else {
  //   wishlistLink.classList.add("d-block");
  // }

  // Welcome user
  UIController.welcomeUser("white");

  // Update cart icon in the navbar
  UIController.updateCartIcon();

  // Scroll buttons
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

  // Shuffle array function
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
  }

  // Load featured products on home page
  function renderProducts() {
    if (document.getElementById("featured-products")) {
      const products = Product.getProducts();
      let featuredProducts = products.slice(0, 8); // get the first 8 products
      featuredProducts = shuffleArray(featuredProducts);
      const featuredProductsContainer =
        document.getElementById("featured-products");

      featuredProducts.forEach((product) => {
        const isInCart = UserController.isProductInCart(product.id);
        const isInWishlist = UserController.isProductInWishlist(product.id);
        const productCard = `
        <!-- card start -->
        <div class="card me-4">
          <img
            src="${product.images[0]}"
            class="card-img-top rounded-2 mt-3"
            alt="${product.name}"
          />
          <div class="product-btns d-flex flex-column">
            <a id="add-to-cart" class="btn rounded-5 mb-2 ${
              isInCart ? "btn-success" : "btn-primary"
            }" onclick="UserController.addToCart(${
          product.id
        }, 1); UserController.changeIcon(this); UIController.updateCartIcon();">
              <i class="bi ${
                isInCart ? "bi-cart-check-fill" : "bi-cart-plus-fill"
              }"></i>
            </a>
            <a id="wishlist-btn" class="btn ${
              isInWishlist ? "btn-danger" : "btn-secondary"
            } rounded-5" onclick="UserController.addToWishlist(${
          product.id
        }); UserController.changeIcon(this); ">
              <i class="bi ${
                isInWishlist ? "bi-bag-heart-fill" : "bi-bag-heart"
              }"></i>
            </a>
          </div>
          <div class="card-body">
            <h6 class="mb-3">${product.name}</h6>
            <div class="d-flex flex-column align-items-start">
              <h4 class="mb-3">
                <span class="currency me-1">EGP</span>${product.price}
              </h4>
              <a href="productDetailsCustomer.html?id=${
                product.id
              }" class="btn btn btn-outline-dark btn-sm">View Details</a>
            </div>
          </div>
        </div>
        <!-- card end -->
      `;
        featuredProductsContainer.innerHTML += productCard;
      });
    }
  }
  renderProducts();
});
