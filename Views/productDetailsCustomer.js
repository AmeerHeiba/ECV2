function backCatalog() {
  window.location.href = `productCatalog.html`;
}
window.addEventListener("DOMContentLoaded", () => {
 
  UIController.renderNavbar();
  UIController.renderNavbar2();
  UIController.welcomeUser("dark");
  
  // update cart icon notification
  UIController.updateCartIcon();
  
  // apply animation
  AOS.init()
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
                <img style="height: 18rem; object-fit: cover;" src="${image}" class="img-fluid rounded-start carousel-image" alt="Product Image ${
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
            } EGP</h3>
            <h5 class="card-text">
              <small class="text-body-secondary" style="color: green">${stockStatus}</small>
            </h5>
            <input type="number" class="form-control me-3" style="width: 80px; margin: 1rem 0;" value="1" min="1" id="product-quantity" />
            <div class="d-flex align-items-center">
              <a id="add-to-cart" class="btn  ${
                isInCart ? "btn-success" : "btn-primary"
              }" onclick="UserController.addToCart(${
    product.id
  }, 1); UserController.changeIcon(this); UIController.updateCartIcon();" data-product-id="${
    product.id
  }" style="margin-right: 1rem">
              <i class="bi ${
                isInCart ? "bi-cart-check-fill" : "bi-cart-plus-fill"
              }"></i>
            </a>
              <a id="wishlist-btn" class="btn ${
                isInWishlist ? "btn-danger" : "btn-secondary"
              }" onclick="UserController.addToWishlist(${
    product.id
  }); UserController.changeIcon(this);">
                <i class="bi ${
                  isInWishlist ? "bi-bag-heart-fill" : "bi-bag-heart"
                }"></i>
              </a>
              <button class="btn btn-custom" onclick="backCatalog()" style="margin-left: 14px">
                <i class="fa-solid fa-arrow-left"></i> Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  function renderRelatedProducts() {
    if (document.getElementById("products-container")) {
      const products = JSON.parse(localStorage.getItem("products")) || [];
      let relatedProducts = products.filter(
        (p) => p.category === product.category && p.id !== product.id
      );
      relatedProducts = relatedProducts.slice(0, 5);
      const relatedProductsContainer =document.getElementById("products-container");

      relatedProductsContainer.innerHTML = "";
      relatedProducts.forEach((product) => {
        const isInCart = UserController.isProductInCart(product.id);
        const isInWishlist = UserController.isProductInWishlist(product.id);
        const isOutOfStock = product.stock === 0;
        const productName =
        product.name.length > 18
          ? product.name.substring(0, 18) + "..."
          : product.name;

        const productCard =   `<div
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
          }" class="btn wishlist-btn card-btn btn-secondary rounded-circle text-light ${
        isInWishlist ? "btn-danger" : "btn-secondary"
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
                  ? '<span class="badge bg-danger rounded-0 position-absolute w-100 bottom-100 end-0">Out of Stock</span>'
                  : ""
              }
       
          <hr />
          <h4 class="fw-bold"><span class="currency">EGP</span> ${
            product.price
          }</h4>
        </div>
      </div>`
        relatedProductsContainer.innerHTML += productCard;
      });
    }
  }

  renderRelatedProducts();
});
