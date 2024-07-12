class UIController {
  static welcomeUser(color) {
    if (AuthController.getCurrentUser()) {
      let firstName = UserController.getUser().firstName;
      const loggedUser = document.getElementById("logged-user");
      loggedUser.innerHTML = `
          <div class="dropdown nav-link p-0">
            <button class="btn text-${color} dropdown-toggle p-0 p-xl-2" type="button" data-bs-toggle="dropdown" aria-expanded="false"> 
             <i class="bi bi-person-fill"> Hi ${firstName}!</i>
            </button>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="userDashboard.html">Profile</a></li>
              <li><a class="dropdown-item" href="orders.html">Orders</a></li>
              <li class="d-flex justify-content-center mt-2"><button class="btn btn-info col-10" onclick="AuthController.logout()">Logout</button></li>
            
            </ul>
          </div>
          `;
    }
  }

  static updateCartIcon() {
    if (AuthController.getCurrentUser()) {
      const cartItems = User.getCartItems();
      const notif = document.querySelector("#notification");
      if (cartItems.length > 0) {
        notif.classList.add("bg-danger");
        notif.textContent = `${cartItems.length}`;
      } else {
        notif.classList.remove("bg-danger");
        notif.textContent = ``;
      }
    }
  }

  static renderWishlist() {
    let wishlistItems = Wishlist.getWishlistItems();
    wishlistItems = wishlistItems.reverse();
    const wishlistContainer = document.getElementById("wishlist-wrapper");
    wishlistContainer.innerHTML = "";
    if (wishlistItems.length > 0) {
      wishlistItems.forEach((item) => {
        const product = Product.getProductById(item.itemId);
        const isInCart = UserController.isProductInCart(product.id);
        const wishlistItem = `
         <!-- card start -->
         
      <div class="card col-12 col-xl-2">
        <img
          src="${product.images[0]}"
          class="wishlist-img card-img-top rounded-2 mt-3"
          alt="${product.name}"
        />
        <div class="product-btns d-flex flex-column">
          <a id="add-to-cart" class="btn btn-primary rounded-5 mb-2 ${
            isInCart ? "active" : ""
          }" onclick="UserController.addToCart('${
          product.id
        }', 1); UserController.changeIcon(this);">
            <i class="bi bi-cart-plus-fill"></i>
          </a>

          <a class="btn btn-secondary rounded-5" onclick="UserController.addToWishlist('${
            product.id
          }'); UserController.changeIcon(this);">
           <i class="bi ${isInCart ? "bi-bag-heart-fill" : "bi-bag-heart"}"></i>
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
}
