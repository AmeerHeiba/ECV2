//welcome user
UIController.welcomeUser("dark");

// update cart icon notification
UIController.updateCartIcon();

function renderCartItems() {
  const cartItems = User.getCartItems();
  const cartItemsContainer = document.getElementById("cart-items");
  const bodyContainer = document.querySelector(".cart");
  cartItemsContainer.innerHTML = "";
  if (cartItems.length > 0) {
    cartItems.forEach((item) => {
      const product = Product.getProductById(item.id);
      const cartItem = `
         <div class="card my-4 p-1">
          <div class="row g-4 align-items-center">
            <div class="col-6 col-md-4 border-end h-50">
              <img
                src="${product.images[0]}"
                class="cart-img img-fluid rounded-4 p-2"
                alt="..."
              />
            </div>
            <div class="col-6 col-md-8">
              <div class="card-body">
                <h6 class="card-title">${product.name}</h6>
                <h4>${product.price} <span class="currency">EGP</span></h4>
                <p class="card-text m-0">${product.description}</p>
                <p class="card-text text-success m-0 ">
                  <small class="text-body-secondary"
                    ><i class="bi bi-box-seam-fill"></i> <span> Delivered within a week</span></small
                  >
                </p>
                <div class="d-flex justify-content-start mt-2 gap-2 col-xl-4">
                  <input
                    class="form-control form-control-sm quantity-btn"
                    type="number"
                    name="fnumber"
                    min="1"
                    max="30"
                    value="${item.quantity}"
                    step="1"
                    onchange="User.updateCartItem(${item.id}, this.value); updateSummary();"
                    oninput="checkInputValue(this)"
                  />
                  <button class="btn btn-danger col-4" id="delete-btn" onclick="removeFromCart(${item.id})"><i class="bi bi-trash3-fill"></i></button>
                </div>
              </div>
            </div>
          </div>
        </div>
        `;
      cartItemsContainer.innerHTML += cartItem;
    });

    updateSummary();
  } else {
    bodyContainer.innerHTML = `<div class="d-flex flex-column align-items-center"><h5 style="color: #888"; class='text-center mt-5 '>There are no items in your cart.</h5> <i style='font-size: 17rem; color: #eee'; class='bi bi-cart-x'></i></div>`;
  }
}

// check if product quantity is between 1 and 30
function checkInputValue(input) {
  let value = parseInt(input.value, 10); // Convert input value to integer
  if (value === 0) input.value = "1"; // Set to 1 if input is 0
  if (value > 30) input.value = "30"; // Cap at 30 if input exceeds 30
}

// Load cart items on cart page
if (document.getElementById("cart-items")) {
  renderCartItems();
}

function updateSummary() {
  const cart = User.getCartItems();
  const total = cart.reduce((sum, item) => {
    const product = Product.getProductById(item.id);
    return sum + item.quantity * product.price;
  }, 0);

  document.getElementById(
    "sub-total"
  ).innerHTML = ` <span class="currency">EGP</span> ${total.toFixed(2)}`;
  document.getElementById(
    "total"
  ).innerHTML = ` <span class="currency">EGP</span> ${(
    total +
    (total * 14) / 100
  ).toFixed(2)}`;
}

//remove cart item

function removeFromCart(id) {
  let confirmation = confirm("Are you sure you want to delete this item?");
  if (confirmation) {
    User.removeCartItem(id);
    renderCartItems();
    // update cart icon notification
    UIController.updateCartIcon();
  } else {
    return;
  }
}

// checkout

(function creditCardValidation() {
  document
    .getElementById("cardNumber")
    .addEventListener("input", function (event) {
      // Remove all non-numeric characters
      let value = event.target.value.replace(/\D/g, "");

      // Insert dashes every 4 characters
      value = value.replace(/(\d{4})(?=\d)/g, "$1-");

      // Limit to 14 characters
      if (value.length > 14) {
        value = value.slice(0, 19);
      }

      event.target.value = value;
    });

  document
    .getElementById("expiryDate")
    .addEventListener("input", function (event) {
      // Remove all non-numeric characters
      let value = event.target.value.replace(/\D/g, "");

      // Limit to 4 characters (MMYY format)
      if (value.length > 4) {
        value = value.slice(0, 4);
      }

      // Format as MM/YY
      if (value.length > 2) {
        value = value.substring(0, 2) + "/" + value.substring(2);
      }

      event.target.value = value;
    });

  // Allow only numeric input for CVV
  document.getElementById("cvv").addEventListener("input", function (event) {
    // Remove all non-numeric characters
    let value = event.target.value.replace(/\D/g, "");

    // Limit to 3 characters (CVV format)
    if (value.length > 3) {
      value = value.slice(0, 3);
    }

    event.target.value = value;
  });

  document
    .getElementById("cardName")
    .addEventListener("input", function (event) {
      // Remove non-letter characters and convert to uppercase
      let value = event.target.value.replace(/[^A-Za-z]/g, "").toUpperCase();

      event.target.value = value;
    });
})();

function togglePaymentDetails() {
  const paymentMethod = document.getElementById("paymentMethod").value;
  const cardDetails = document.getElementById("cardDetails");
  if (paymentMethod === "Credit/Debit Card") {
    cardDetails.style.display = "block";
  } else {
    cardDetails.style.display = "none";
  }
}

togglePaymentDetails();

function populateAddresses() {
  const addresses = User.getAddresses();
  const addressSelect = document.getElementById("addresses");
  addressSelect.innerHTML = ""; // Clear existing options

  addresses.forEach((address) => {
    const option = document.createElement("option");
    option.value = address.id;
    option.textContent = `${address.title}, ${address.address}, ${address.city}, ${address.zipCode}`;
    addressSelect.appendChild(option);
  });
}

populateAddresses();

//renders success message

function orderPlaced() {
  const modal = document.querySelector(".modal-content");
  modal.innerHTML = `
   <div class="d-flex align-items-center mb-3">
      <h4></h4>

      <button
        type="button"
        class="btn p-1 ms-auto"
        data-bs-dismiss="modal"
      >
        <i class="bi bi-x-lg"></i>
      </button>

  </div>

      <div class="d-flex flex-column justify-content-center align-items-center">
        <h4>Order placed successfully</h4>
        <i style="font-size: 6rem" class="bi bi-check-circle text-success"></i>
      </div> 
      <a href="../Views/orders.html" class="btn btn-primary mt-4">Go To Orders</a>    
  `;
}

//total order price

function calculateTotalOrderPrice(cartItems) {
  let totalPrice = 0;

  cartItems.forEach((cartItem) => {
    const product = Product.getProductById(cartItem.id);
    if (product) {
      totalPrice += product.price * cartItem.quantity;
    }
  });

  return totalPrice;
}

function processCheckout() {
  const currentUser = AuthController.getCurrentUser();

  if (!currentUser) {
    alert("Please log in to proceed with the checkout.");
    return;
  }

  // Get user details
  const users = User.getUsers();
  const user = users.find((user) => user.id === currentUser.id);
  const cartItems = User.getCartItems();

  if (cartItems.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  const addressSelect = document.getElementById("addresses");
  const paymentMethodSelect = document.getElementById("paymentMethod");
  const selectedAddressId = addressSelect.value;
  const selectedPaymentMethod = paymentMethodSelect.value;

  // Validate address
  const selectedAddress = user.addresses.find(
    (address) => address.id == selectedAddressId
  );
  if (!selectedAddress) {
    alert("Please select a valid address.");
    return;
  }

  // Validate payment method
  if (selectedPaymentMethod === "Credit/Debit Card") {
    const cardNumber = document.getElementById("cardNumber").value;
    const cardName = document.getElementById("cardName").value;
    const expiryDate = document.getElementById("expiryDate").value;
    const cvv = document.getElementById("cvv").value;

    if (!cardNumber || !cardName || !expiryDate || !cvv) {
      alert("Please fill in all card details.");
      return;
    }

    // Add payment info to user
    user.paymentInfo = {
      cardNumber,
      cardName,
      expiryDate,
      cvv,
    };
  }

  const totalOrderPrice = calculateTotalOrderPrice(cartItems);

  // Create order
  const orderId = Number(`${user.id}${Date.now()}`);
  const newOrder = {
    id: orderId,
    items: cartItems,
    address: selectedAddress,
    paymentMethod: selectedPaymentMethod,
    total: totalOrderPrice,
    orderDate: new Date().toISOString(),
    status: "pending",
  };

  if (!user.orders) {
    user.orders = [];
  }

  // Add order to user's orders
  user.orders.push(newOrder);

  // Save updated user data
  User.saveUsers(users);

  // Clear the cart
  user.cart = [];
  User.saveUsers(users);

  orderPlaced();
  // Optionally redirect to order confirmation page or clear form fields
  document.getElementById("checkoutForm").reset();
  // location.href = "orders.html";
}
