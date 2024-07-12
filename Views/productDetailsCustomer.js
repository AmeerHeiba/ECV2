const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

let products = JSON.parse(localStorage.getItem("products")) || [];
let product = products.find((product) => product.id === parseInt(id));
const isInCart = UserController.isProductInCart(product.id);
const isInWishlist = UserController.isProductInWishlist(product.id);
let stockStatus = product.stock > 0 ? `In Stock` : "Out of stock";

const cardContainer = document.getElementById("productDetailsContainer");

cardContainer.innerHTML = `
  <div class="card custom-card">
    <div class="row">
      <div class="col-md-4 border-0 pe-3 my-5 border-end">
        <img src="${
          product.images[0]
        }" class="img-fluid rounded-start" alt="..."/>
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h2 class="card-title">${product.name}</h2>
          <h6 class="card-text" style="color: #754114; margin-top: 1rem;">${
            product.category
          }</h6>
          <p class="card-text" style="margin-top: 1rem">${
            product.description
          }</p>
          <h3 class="card-text" style="margin-top: 1rem;">${
            product.price
          }EG</h3>
          <h5 class="card-text">
            <small class="text-body-secondary" style="color: green">${stockStatus}</small>
          </h5>
          <input
            type="number"
            class="form-control me-3"
            style="width: 80px; margin: 1rem 0;"
            value="1"
            min="1"
            id="product-quantity"
          />
          <div class="d-flex align-items-center">
            <a id="add-to-cart" class="btn   ${
              isInCart ? "btn-success" : "btn-primary"
            }" style=" margin-right: 1rem" onclick="UserController.addToCart(${
  product.id
}, 1); UserController.changeIcon(this); UIController.updateCartIcon();">
              <i class="bi ${
                isInCart ? "bi-cart-check-fill" : "bi-cart-plus-fill"
              }"></i>
            </a>
            <a id="wishlist-btn" class="btn ${
              isInWishlist ? "btn-danger" : "btn-secondary"
            } " onclick="UserController.addToWishlist(${
  product.id
}); UserController.changeIcon(this); ">
              <i class="bi ${
                isInWishlist ? "bi-bag-heart-fill" : "bi-bag-heart"
              }"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
`;
