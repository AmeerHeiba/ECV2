class UIController {
  static renderNavbar() {
    const navBar1 = document.getElementById("navbar-1");

    if (navBar1) {
      navBar1.innerHTML = ` <div class="container my-1">
          <a class="h1 navbar-brand text-light fsize-1" href="./home.html"
            >Tea.</a
          >
          
          <form class="d-flex col col-lg-8 mx-lg-5" role="search">
          <i class="d-block d-lg-none bi bi-search text-light ms-auto mx-4 fs-5"  onclick="window.location.href = 'productCatalog.html'"></i>
            <input
              class="form-control me-2 d-none d-lg-block"
              type="search"
              placeholder="What are you looking for?"
              aria-label="Search"
              onclick="window.location.href = 'productCatalog.html'"
            />
          </form>
          <button
            class="navbar-toggler navbar-dark border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon navbar-dark"></span>
          </button>
          <div class="collapse navbar-collapse col" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mt-4 mt-xl-0 mb-2 mb-lg-0">
              <li class="nav-item" id="logged-user">
                <a
                  class="nav-link active"
                  aria-current="page"
                  data-bs-toggle="modal"
                  data-bs-target="#login"
                  ><i class="bi bi-person-fill text-light">&nbsp Login</i></a
                >
              </li>

              <li class="nav-item d-none" id="register">
                <div class="dropdown nav-link p-0">
                  <button
                    class="btn text-white dropdown-toggle p-0 p-xl-2"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i class="bi bi-person-plus-fill">&nbsp Register</i>
                  </button>
                  <ul class="dropdown-menu">
                    <li>
                      <a
                        aria-current="page"
                        data-bs-toggle="modal"
                        data-bs-target="#registration"
                        class="dropdown-item"
                        >New Customer?</a
                      >
                    </li>
                    <li>
                      <a
                        aria-current="page"
                        data-bs-toggle="modal"
                        data-bs-target="#seller-registration"
                        class="dropdown-item"
                        class="dropdown-item"
                        >New Seller?</a
                      >
                    </li>
                  </ul>
                </div>
              </li>

              <li id="wishlist-link" class="nav-item">
                <a class="nav-link active" href="wishlist.html"
                  ><i class="bi bi-bag-heart-fill text-light"
                    >&nbsp Wishlist</i
                  ></a
                >
              </li>
              <li id="cart-link" class="nav-item">
                <a class="nav-link active" href="cart.html"
                  ><i class="bi bi-cart4 text-light"
                    ><span
                      id="notification"
                      style="font-size: 0.6rem"
                      class="position-absolute top-40 start-10 translate-middle badge rounded-circle"
                    >
                    </span
                    >&nbsp Cart
                  </i>
                </a>
              </li>

            
            </ul>
          </div>
        </div>`;
    }
  }

  static renderNavbar2() {
    const navBar2 = document.getElementById("navbar-2");

    if (navBar2) {
      navBar2.innerHTML = ` <div
          class="container h-scroll-parent justify-content-start flex-nowrap overflow-auto"
        >
        <ul class="navbar-nav mb-2 mb-lg-0 col-12 col-xl-8 h-scroll-child">
          <li class="nav-item border-end pe-2 pe-lg-5 me-2">
            <a class="nav-link active" href="productCatalog.html">
              All Categories
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="filteredProducts.html?filter=living-room"
              >Living Room</a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" href="filteredProducts.html?filter=Bedroom"
              >Bedroom</a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" href="filteredProducts.html?filter=dining-room"
              >Dining Room</a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" href="filteredProducts.html?filter=office"
              >Office</a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" href="filteredProducts.html?filter=outdoor"
              >Outdoor</a
            >
          </li>
        </ul>
        </div>`;
    }
  }

  static welcomeUser(color) {
    let user = AuthController.getCurrentUser();
    const loggedUser = document.getElementById("logged-user");
    const wishlistLink = document.getElementById("wishlist-link");
    const cartLink = document.getElementById("cart-link");

    if (!user) {
      wishlistLink.classList.add("d-none");
      const registration = document.getElementById("register");
      registration.classList.remove("d-none");
    } else {
      wishlistLink.classList.add("d-block");
    }

    if (user && user.role !== "admin" && user.role !== "seller") {
      let firstName = user.firstName;

      loggedUser.innerHTML = `
          <div class="dropdown nav-link p-0">
            <button class="btn text-white dropdown-toggle p-0 p-xl-2 " type="button" data-bs-toggle="dropdown" aria-expanded="false"> 
             <i class="bi bi-person-fill"> Hi ${firstName}!</i>
            </button>
            <ul class="dropdown-menu py-xl-2">
              <li><a class="dropdown-item my-1 py-2" href="userDashboard.html"><i class="bi bi-person-circle"></i>&nbsp Profile</a></li>
      
              <li><a class="dropdown-item py-2" href="orders.html"><i class="bi bi-basket2-fill"></i>&nbsp Orders</a></li>
              <hr >

              
              <li class="d-flex justify-content-center d-none d-xl-flex"><button class=" btn btn-light secondary-color fw-semibold text-white col-10" onclick="AuthController.logout()">Logout</button></li>
              
            
            </ul>
          </div>
          `;

      cartLink.insertAdjacentHTML(
        "afterend",
        `  <hr >
         <li class="d-flex justify-content-center d-flex d-xl-none"><button class="btn btn-light secondary-color fw-semibold text-white col-10" onclick="AuthController.logout()">Logout</button></li>`
      );
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
              <li class="d-flex justify-content-center mt-2"><button class="d-none d-xl-block btn btn-light secondary-color fw-semibold text-white col-10" onclick="AuthController.logout()">Logout</button></li>
            
            </ul>
          </div>
          `;

      cartLink.insertAdjacentHTML(
        "afterend",
        `  <hr >
             <li class="d-flex justify-content-center"><button class="d-block d-xl-none btn btn-light secondary-color fw-semibold text-white col-10" onclick="AuthController.logout()">Logout</button></li>`
      );
    } else if (user && user.role == "seller") {
      let firstName = user.firstName;

      loggedUser.innerHTML = `
          <div class="dropdown nav-link p-0">
            <button class="btn text-white dropdown-toggle p-0 p-xl-2" type="button" data-bs-toggle="dropdown" aria-expanded="false"> 
             <i class="bi bi-person-fill"> Hi ${firstName}!</i>
            </button>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item my-1 py-2" href="sellerDashboard.html"><i class="bi bi-shop"></i>&nbsp Dashboard</a></li>

              <li><a class="dropdown-item my-1 py-2" href="userDashboard.html"><i class="bi bi-person-circle"></i>&nbsp Profile</a></li>
      
              <li><a class="dropdown-item py-2" href="orders.html"><i class="bi bi-basket2-fill"></i>&nbsp Orders</a></li>
              <hr>
              <li class="d-flex justify-content-center"><button class="d-none d-xl-block btn btn-light secondary-color fw-semibold text-white col-10" onclick="AuthController.logout()">Logout</button></li>
            
            </ul>
          </div>
          `;

      cartLink.insertAdjacentHTML(
        "afterend",
        `  <hr >
                 <li class="d-flex justify-content-center"><button class="d-block d-xl-none btn btn-light secondary-color fw-semibold text-white col-10" onclick="AuthController.logout()">Logout</button></li>`
      );
    }
  }

  static renderProductCard(product) {
    let productsContainer = document.getElementById("products-container");

    if (productsContainer) {
      const isInCart = UserController.isProductInCart(product.id);
      const isInWishlist = UserController.isProductInWishlist(product.id);
      const isOutOfStock = product.stock === 0;
      const productName =
        product.name.length > 18
          ? product.name.substring(0, 18) + "..."
          : product.name;

      return (productsContainer.innerHTML += ` 
        
        <div
        class="col-12 complementary-color3 card product-card border-0 text-dark shadow-sm my-5 rounded-5 position-relative p-0 "
        
      >
      
        <img
          src="${product.images[0]}"
          class="card-img-top img-fluid w-100 "
          alt="${product.name}"
          style="height: 14rem; object-fit: cover; border-top-right-radius: 2rem; border-top-left-radius: 2rem; "
        />
        <a
          href="productDetailsCustomer.html?id=${product.id}"
          class="details rounded-5 fw-semibold col-12 btn text-white position-absolute h-100 px-1"
          >see details</a
        >

       

        <div class="position-absolute end-0 m-3 d-flex flex-column gap-2">
          <button id="add-to-cart" class="btn border-0 card-btn rounded-circle text-light ${
            isInCart ? "card-btn-success" : "card-btn-main"
          }" onclick="UserController.addToCart(${
        product.id
      }, 1); UserController.changeIcon(this); UIController.updateCartIcon();" data-product-id="${
        product.id
      }">
            <i class="bi text-sm  ${
              isInCart ? "bi-cart-check-fill" : "bi-cart-plus-fill"
            }"></i>
          </button>
          <button id="wishlist-btn-${
            product.id
          }" class="btn wishlist-btn card-btn btn-secondary border-0 rounded-circle text-light ${
        isInWishlist ? "accent-color2" : "btn-secondary"
      }"  onclick="UserController.addToWishlist(${
        product.id
      }); UserController.changeIcon(this);">
            <i class="bi bi-bag-heart-fill text-sm  ${
              isInWishlist ? "bi-bag-heart-fill" : "bi-bag-heart"
            }"></i>
          </button>
        </div>

        
        <div class="card-body">
          
          <h5 class="card-title">${productName}</h5>
          <p class="badge text-bg-light">${product.category}</p>
          <p class="badge bg-success">free shipping</p>
              ${
                isOutOfStock
                  ? '<span class="badge accent-color2 rounded-0 position-absolute w-100 bottom-100 end-0">Out of Stock</span>'
                  : ""
              }
       
          <hr />
          <h4 class="fw-bold"><span class="currency">EGP</span> ${
            product.price
          }</h4>
        </div>
      </div>`);
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
    const productsContainer = document.getElementById("products-container");

    let user = AuthController.getCurrentUser();
    if (user && user.role !== "admin") {
      let wishlistItems = UserController.getWishlist();
      wishlistItems = wishlistItems.reverse();
      productsContainer.innerHTML = "";
      if (wishlistItems.length > 0) {
        wishlistItems.forEach((item) => {
          let product = Product.getProductById(item.id);
          UIController.renderProductCard(product);
          const wishlistBtn = document.querySelectorAll(".wishlist-btn");
          Array.from(wishlistBtn).forEach((btn) => {
            btn.addEventListener("click", UIController.renderWishlist);
          });
        });
      } else {
        productsContainer.innerHTML = `<div class="d-flex flex-column align-items-center"><h5 style="color: #888"; class='text-center mt-2 '>You haven't added any items to your wishlist.</h5> <i style='font-size: 17rem; color: #eee'; class='bi bi-heart'></i></div>`;
      }
    } else {
      productsContainer.innerHTML = `<div class="d-flex flex-column align-items-center"><h5 style="color: #888"; class='text-center mt-2 '>Please login as a customer to view your wishlist</h5> <i style='font-size: 17rem; color: #eee'; class='bi bi-heart'></i></div>`;
    }
  }
}
