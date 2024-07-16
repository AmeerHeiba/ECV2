
UIController.welcomeUser("dark");

// update cart icon notification
UIController.updateCartIcon();
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
       <div id="carouselExample" class="carousel slide" data-bs-ride="carousel" data-bs-interval="1000">
        <div class="carousel-inner">
          ${product.images
            .map(
              (image, index) => `
            <div class="carousel-item ${index === 0 ? "active" : ""}">
              <img style="  height: 18rem;
               object-fit: cover;" src="${image}" class="img-fluid rounded-start carousel-image" alt="Product Image ${
                index + 1
              }">
            </div>
          `
            )
            .join("")}
        </div>

        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h2 class="card-title">${product.name}</h2>
          <h6 class="card-text" style="color: var(--secondary-color) !important; margin-top: 1rem;">${
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
    <button class="btn btn-custom" onclick="backCatalog()" style="margin-left:14px"> <i class="fa-solid fa-arrow-left"></i>  Back</button>

          </div>
        </div>
      </div>
    </div>
  </div>
`;
function backCatalog(){
  window.location.href = `productCatalog.html`;

}