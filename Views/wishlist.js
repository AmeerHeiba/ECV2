//welcome user
UIController.welcomeUser("dark");

// update cart icon notification
UIController.updateCartIcon();

// render wishlist
function renderWishlist() {
  let wishlistItems = UserController.getWishlist();
  wishlistItems = wishlistItems.reverse();
  const wishlistContainer = document.getElementById("wishlist-wrapper");
  wishlistContainer.innerHTML = "";
  if (wishlistItems.length > 0) {
    wishlistItems.forEach((item) => {
      const product = Product.getProductById(item.id);
      const isInCart = UserController.isProductInCart(item.id);
      const isInWishlist = UserController.isProductInWishlist(item.id);

      const wishlistItem = `
       <!-- card start -->
       
    <div class="card col-12 col-xl-2">
      <img
        src="${product.images[0]}"
        class="wishlist-img card-img-top rounded-2 mt-3"
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
            <a class="btn ${
              isInWishlist ? "btn-danger" : "btn-secondary"
            } rounded-5" onclick="UserController.addToWishlist(${
        product.id
      }); UserController.changeIcon(this); renderWishlist()">
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
          <a
            href="productDetails.html?id=${product.id}"
            class="btn btn btn-outline-dark btn-sm"
            >View Details</a
          >
        </div>
      </div>
    </div>
    <!-- card end -->
      `;
      wishlistContainer.innerHTML += wishlistItem;
    });
  } else {
    wishlistContainer.innerHTML = `<div class="d-flex flex-column align-items-center"><h5 style="color: #888"; class='text-center mt-5 '>You haven't added any items to your wishlist.</h5> <i style='font-size: 17rem; color: #eee'; class='bi bi-heart'></i></div>`;
  }
}

renderWishlist();
