// render navbar
UIController.renderNavbar();
UIController.renderNavbar2();

//welcome user
UIController.welcomeUser("dark");

// update cart icon notification
UIController.updateCartIcon();

function renderOrders() {
  const user = UserController.getUser();
  const orders = user.orders;
  const ordersContainer = document.getElementById("orders-container");
  const bodyContainer = document.querySelector(".orders");
  ordersContainer.innerHTML = "";

  if (orders.length > 0) {
    orders.forEach((order) => {
      let orderTotal = 0;
      let orderItems = "";
      const orderDate = new Date(order.orderDate);
      let options = {
        day: "2-digit",
        month: "long",
        year: "numeric",
      };

      order.items.forEach((item) => {
        const product = Product.getProductById(item.id);
        const totalPrice =
          parseFloat(item.quantity) * parseFloat(product.price);
        orderTotal += totalPrice;
        const deliveryDate = new Date(order.orderDate);
        const expectedDeliveryDate = new Date(order.orderDate);
        expectedDeliveryDate.setDate(expectedDeliveryDate.getDate() + 7);

        const orderItem = `
          <div class="card my-2 p-2">
            <div class="row g-2 align-items-center">
              <div class="col-md-4 border-end">
                <img src="${
                  product.images[0]
                }" class="img-fluid rounded-4 p-1" alt="...">
              </div>
              <div class="col-md-8">
                <div class="card-body p-2">
                  <div class="d-flex justify-content-between align-items-center">
                    <h6 class="card-title m-0">${product.name}</h6>
                    <h4 class="m-0">${totalPrice.toFixed(
                      2
                    )} <span class="currency">EGP</span></h4>
                  </div>
                  <p class="card-text small my-1">${product.description}</p>
                  <p class="card-text small my-1">Status: <span class="text-success fw-semibold">${
                    order.status
                  }</span></p>
                  <p class="card-text small my-1">
                    <small class="text-muted">
                      <i class="bi bi-box-seam-fill"></i> Delivered between ${deliveryDate.toLocaleDateString(
                        "en-GB",
                        options
                      )} and ${expectedDeliveryDate.toLocaleDateString(
          "en-GB",
          options
        )}
                    </small>
                  </p>
                  <p class="card-text small my-1"><strong>Quantity:</strong> ${
                    item.quantity
                  }</p>
                </div>
              </div>
            </div>
          </div>
        `;

        orderItems += orderItem;
      });

      // Render order details
      ordersContainer.innerHTML += `
        <div class="order-wrapper card complementary-color3 col-12 col-xl-8 mb-4 p-3">
          <span class="badge accent-color2 col-xl-4 text-light">Order ID: ${
            order.id
          }</span>
          <h6 class="mt-3 ms-1">Total Price: <span class="fw-normal">${orderTotal.toFixed(
            2
          )}</span> <small class="fw-normal">EGP</small></h6>
          <h6 class="ms-1">Payment Method: <span class="fw-normal">${
            order.paymentMethod
          }</span></h6>
          <h6 class="ms-1">Placed on: <span class="fw-normal">${orderDate.toLocaleDateString(
            "en-GB",
            options
          )}</span></h6>
          ${orderItems}
        </div>
      `;
    });
  } else {
    bodyContainer.innerHTML = `<div class="d-flex flex-column align-items-center"><h5 style="color: #888" class="text-center mt-5">You have made no orders yet.</h5><i style="font-size: 17rem; color: #eee" class="bi bi-cart-x"></i></div>`;
  }
}

renderOrders();
