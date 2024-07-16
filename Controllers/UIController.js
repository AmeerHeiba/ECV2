class UIController {
  static welcomeUser(color) {
    let user = AuthController.getCurrentUser();
    const loggedUser = document.getElementById("logged-user");
    const wishlistLink = document.getElementById("wishlist-link");

    if (!user) {
      wishlistLink.classList.add("d-none");
      const registration = document.getElementById("register");
      registration.classList.remove("d-none");
    } else {
      wishlistLink.classList.add("d-block");
    }

    if (user && user.role !== "admin") {
      let firstName = user.firstName;

      loggedUser.innerHTML = `
          <div class="dropdown nav-link p-0">
            <button class="btn text-white dropdown-toggle p-0 p-xl-2" type="button" data-bs-toggle="dropdown" aria-expanded="false"> 
             <i class="bi bi-person-fill"> Hi ${firstName}!</i>
            </button>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item my-1 py-2" href="userDashboard.html"><i class="bi bi-person-circle"></i>&nbsp Profile</a></li>
      
              <li><a class="dropdown-item py-2" href="orders.html"><i class="bi bi-basket2-fill"></i>&nbsp Orders</a></li>
              <hr>
              <li class="d-flex justify-content-center"><button class="d-none d-lg-block btn btn-light secondary-color fw-semibold text-white col-10" onclick="AuthController.logout()">Logout</button></li>
            
            </ul>
          </div>
          `;
    } else if (user && user.role === "admin") {
      const adminName = user.fullName;
      wishlistLink.classList.add("d-none");

      loggedUser.innerHTML = `
          <div class="dropdown nav-link p-0">
            <button class="btn text-white dropdown-toggle p-0 p-xl-2" type="button" data-bs-toggle="dropdown" aria-expanded="false"> 
             <i class="bi bi-person-fill"> Hi ${adminName}!</i>
             
            </button>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item my-1 py-2" href="adminPanel.html"><i class="bi bi-person-fill-gear"></i> Admin Panel</a></li>
              <hr>
              <li class="d-flex justify-content-center mt-2"><button class="btn btn-light secondary-color fw-semibold text-white col-10" onclick="AuthController.logout()">Logout</button></li>
            
            </ul>
          </div>
          `;
    }
  }

  static updateCartIcon() {
    let user = AuthController.getCurrentUser();

    if (user && user.role !== "admin") {
      const cartItems = User.getCartItems();
      const notif = document.querySelector("#notification");
      if (cartItems.length > 0) {
        notif.classList.add("bg-danger");
        notif.textContent = `${cartItems.length}`;
      } else {
        notif.classList.remove("bg-danger");
        notif.textContent = ``;
      }
    } else {
      return;
    }
  }

  // render wishlist
  static renderWishlist() {
    const wishlistContainer = document.getElementById("wishlist-wrapper");
    let user = AuthController.getCurrentUser();
    if (user && user.role !== "admin") {
      let wishlistItems = UserController.getWishlist();
      wishlistItems = wishlistItems.reverse();
      wishlistContainer.innerHTML = "";
      if (wishlistItems.length > 0) {
        wishlistItems.forEach((item) => {
          const product = Product.getProductById(item.id);
          const isInCart = UserController.isProductInCart(item.id);
          const isInWishlist = UserController.isProductInWishlist(item.id);
          const isOutOfStock = product.stock === 0;

          const wishlistItem = `
       <!-- card start -->
       
    <div class="card col-12 col-md-5 col-xl-2">
      <img
            src="${product.images[0]}"
            class="card-img-top rounded-2 mt-3"
            style="  height: 13rem;
            object-fit: cover;"
            alt="${product.name}"
          />
          <div class="product-btns d-flex flex-column">
            <a id="add-to-cart" class="btn rounded-5 mb-2 ${
              isInCart ? "btn-success" : "btn-primary"
            }" onclick="UserController.addToCart(${
            product.id
          }, 1); UserController.changeIcon(this); UIController.updateCartIcon();" data-product-id="${
            product.id
          }">
              <i class="bi ${
                isInCart ? "bi-cart-check-fill" : "bi-cart-plus-fill"
              }"></i>
            </a>
            <a id="wishlist-btn" class="btn ${
              isInWishlist ? "btn-danger" : "btn-secondary"
            } rounded-5" onclick="UserController.addToWishlist(${
            product.id
          }); UserController.changeIcon(this); UIController.renderWishlist()" >
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
             ${
               isOutOfStock
                 ? '<span style="border-radius: 0; top:30px;" class="badge bg-danger border-0 position-absolute start-0">Out of Stock</span>'
                 : ""
             }
              <a href="productDetailsCustomer.html?id=${
                product.id
              }" class="btn btn btn-outline-dark btn-sm">View Details</a>
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
    } else {
      wishlistContainer.innerHTML = `<div class="d-flex flex-column align-items-center"><h5 style="color: #888"; class='text-center mt-5 '>Please login as a customer to view your wishlist</h5> <i style='font-size: 17rem; color: #eee'; class='bi bi-heart'></i></div>`;
    }
  }
}
