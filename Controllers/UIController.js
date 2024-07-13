class UIController {
  static welcomeUser(color) {
    let user = AuthController.getCurrentUser();

    const loggedUser = document.getElementById("logged-user");
    const wishlistLink = document.getElementById("wishlist-link");
    const navbarModals = document.getElementById("navbar-modals");

    navbarModals.innerHTML = ` <!-- login modal start -->

      <!-- Modal -->
      <div
        class="modal fade"
        id="login"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Login</h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="container">
                <form id="login-form" class="my-3">
                  <div class="form-group my-2">
                    <label for="username">Username</label>
                    <input
                      type="text"
                      class="form-control"
                      id="username"
                      required
                    />
                  </div>
                  <div class="form-group mt-2">
                    <label for="password">Password</label>
                    <input
                      type="password"
                      class="form-control"
                      id="password"
                      required
                    />
                  </div>

                  <div class="form-group mb-2">
                    <a
                      href="customerRegister.html"
                      class="btn text-secondary p-0"
                      >Not a user? Register here</a
                    >
                  </div>

                  <button
                    type="submit"
                    name="submitBtn"
                    value="userLogin"
                    class="btn btn-info text-white mt-3"
                  >
                    Login
                  </button>
                  <button
                    type="submit"
                    name="submitBtn"
                    value="sellerLogin"
                    class="btn btn-outline-info mt-3"
                  >
                    Login for Sellers
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- login modal end -->

      <!-- new customer registration form start -->

      <!-- Modal -->
      <div
        class="modal fade"
        id="registration"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                New Customer Registration
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body secondary-color text-white">
              <div class="container ">
                <form id="registration-form-Customer" class="mt-3">
                    <h5 class="mb-4">
                      <i class="bi bi-person-square"></i> Personal Details
                    </h5>
                    <div class="form-group my-2">
                      <label for="usernameReg">Username</label>
                      <input
                        type="text"
                        class="form-control"
                        id="usernameReg"
                        placeholder="Username"
                        required
                      />
                    </div>
                    <div class="form-group my-2">
                      <label for="emailReg">Email</label>
                      <input
                        type="email"
                        class="form-control"
                        id="emailReg"
                        placeholder="Email"
                        required
                      />
                    </div>
                    <div class="form-group my-2">
                      <label for="passwordReg">Password</label>
                      <input
                        type="password"
                        class="form-control"
                        id="passwordReg"
                        placeholder="Password"
                        required
                      />
                    </div>
                    <div class="form-group my-2">
                      <label for="firstNameReg">First Name</label>
                      <input
                        type="text"
                        class="form-control"
                        id="firstNameReg"
                        placeholder="First Name"
                        required
                      />
                    </div>
                    <div class="form-group my-2">
                      <label for="lastNameReg">Last Name</label>
                      <input
                        type="text"
                        class="form-control"
                        id="lastNameReg"
                        placeholder="Last Name"
                        required
                      />
                    </div>
                    <div class="form-group my-2">
                      <label for="contactReg">Contact Number</label>
                      <input
                        type="text"
                        class="form-control"
                        id="contactReg"
                        placeholder="Contact"
                        required
                      />
                    </div>
                      <hr class="my-4">
                    <h5 class="my-4">
                      <i class="bi bi-geo-alt-fill"></i> Address Details
                    </h5>
                    <div class="form-group my-2">
                      <label for="titleReg"
                        >Address Name</label
                      >
                      <input
                        class="form-control mb-2"
                        type="text"
                        name="title"
                        id="titleReg"
                        placeholder="Address Ex: Home, Office"
                      />
                      <label for="addressReg">Address Details</label>
                      <input
                        class="form-control mb-2"
                        type="text"
                        name="address"
                        id="addressReg"
                        placeholder="Address Details"
                      />
                      <label for="cityReg">City</label>
                      <input
                        class="form-control mb-2"
                        type="text"
                        name="city"
                        id="cityReg"
                        placeholder="City"
                      />
                      <label for="zipReg">ZIP Code</label>
                      <input
                        class="form-control mb-2"
                        type="number"
                        name="zip"
                        id="zipReg"
                        placeholder="Zip"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    class="col-12 btn btn-info text-white mt-3"
                  >
                    Register
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- new customer registration form end -->

      <!-- new seller registration form start -->

      <!-- Modal -->
      <div
        class="modal fade"
        id="seller-registration"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                New Seller Registration
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body secondary-color text-white">
              <div class="container">
                <form id="registration-form-seller" class="mt-3">
                    <h5 class="mb-4">
                      <i class="bi bi-person-square"></i> Personal Details
                    </h5>
                    <div class="form-group my-2">
                      <label for="usernameSReg">Username</label>
                      <input
                        type="text"
                        class="form-control"
                        id="usernameSReg"
                        placeholder="Username"
                        required
                      />
                    </div>
                    <div class="form-group my-2">
                      <label for="emailSReg">Email</label>
                      <input
                        type="email"
                        class="form-control"
                        id="emailSReg"
                        placeholder="Email"
                        required
                      />
                    </div>
                    <div class="form-group my-2">
                      <label for="passwordSReg">Password</label>
                      <input
                        type="password"
                        class="form-control"
                        id="passwordSReg"
                        placeholder="Password"
                        required
                      />
                    </div>
                    <div class="form-group my-2">
                      <label for="firstNameSReg">First Name</label>
                      <input
                        type="text"
                        class="form-control"
                        id="firstNameSReg"
                        placeholder="First Name"
                        required
                      />
                    </div>
                    <div class="form-group my-2">
                      <label for="lastNameSReg">Last Name</label>
                      <input
                        type="text"
                        class="form-control"
                        id="lastNameSReg"
                        placeholder="Last Name"
                        required
                      />
                    </div>
                    <div class="form-group my-2">
                      <label for="contactSReg">Contact Number</label>
                      <input
                        type="text"
                        class="form-control"
                        id="contactSReg"
                        placeholder="Contact"
                        required
                      />
                    </div>

                  <hr class="my-4">

                    <h5 class="my-4">
                      <i class="bi bi-geo-alt-fill"></i> Address Details
                    </h5>

                  <div class="form-group my-2">
                    <label for="titleSReg"
                      >Address Name</label
                    >
                    <input
                      class="form-control mb-2"
                      type="text"
                      name="title"
                      id="titleSReg"
                      placeholder="Address Ex: Home, Office"
                    />
                    <label for="addressSReg">Address Details</label>
                    <input
                      class="form-control mb-2"
                      type="text"
                      name="address"
                      id="addressSReg"
                      placeholder="Address"
                    />
                    <label for="citySReg">City</label>
                    <input
                      class="form-control mb-2"
                      type="text"
                      name="city"
                      id="citySReg"
                      placeholder="City"
                    />
                    <label for="zipSReg">ZIP Code</label>
                    <input
                      class="form-control mb-2"
                      type="number"
                      name="zip"
                      id="zipSReg"
                      placeholder="Zip"
                    />
                  </div>

                  <button
                    type="submit"
                    class="col-12 btn btn-info text-white mt-3"
                  >
                    Register
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- new seller registration form end -->
`;

    if (!user || (user && user.role === "admin")) {
      wishlistLink.classList.add("d-none");
      const registration = document.getElementById("register");
      registration.classList.remove("d-none");
    } else {
      wishlistLink.classList.add("d-block");
    }

    if (user && user.role !== "admin") {
      let firstName = UserController.getUser().firstName;
      loggedUser.innerHTML = `
          <div class="dropdown nav-link p-0">
            <button class="btn text-${color} dropdown-toggle p-0 p-xl-2" type="button" data-bs-toggle="dropdown" aria-expanded="false"> 
             <i class="bi bi-person-fill"> Hi ${firstName}!</i>
            </button>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item my-2" href="userDashboard.html"><i class="bi bi-person-circle"></i>&nbsp Profile</a></li>
              <li><a class="dropdown-item mt-2 mb-3" href="orders.html"><i class="bi bi-basket2-fill"></i>&nbsp Orders</a></li>
              <li class="d-flex justify-content-center mt-2"><button class="btn btn-info fw-semibold text-white col-10" onclick="AuthController.logout()">Logout</button></li>
            
            </ul>
          </div>
          `;
    } else if (user && user.role === "admin") {
      const adminName = AuthController.getCurrentUser().fullName;

      loggedUser.innerHTML = `
          <div class="dropdown nav-link p-0">
            <button class="btn text-${color} dropdown-toggle p-0 p-xl-2" type="button" data-bs-toggle="dropdown" aria-expanded="false"> 
             <i class="bi bi-person-fill"> Hi ${adminName}!</i>
            </button>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="adminPanel.html">Admin Panel</a></li>
              <li class="d-flex justify-content-center mt-2"><button class="btn btn-info col-10" onclick="AuthController.logout()">Logout</button></li>
            
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
       
    <div class="card col-12 col-xl-2">
      <img
            src="${product.images[0]}"
            class="card-img-top rounded-2 mt-3"
            style="  height: 11rem;
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
                  ? '<span style="border-radius: 0;" class="badge bg-danger border-0 position-absolute end-0">Out of Stock</span>'
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
