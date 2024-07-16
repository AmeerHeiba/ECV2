UIController.welcomeUser("dark");

// update cart icon notification
UIController.updateCartIcon();

function createProductCard(product) {
  const isInCart = UserController.isProductInCart(product.id);
  const isInWishlist = UserController.isProductInWishlist(product.id);
  const isOutOfStock = product.stock === 0;

  return `
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
        }); UserController.changeIcon(this);" >
              <i class="bi ${
                isInWishlist ? "bi-bag-heart-fill" : "bi-bag-heart"
              }"></i>
            </a>
          </div>
      <div class="card-body">
        <h5 class="mb-3">${product.name}</h5>
                      <p class="card-text" style="color: var(--secondary-color) !important; margin-top: 1rem;">${
                        product.category
                      }</p>

        <div class="d-flex flex-column align-items-start">
          <h4 class="mb-3">
            <span class="currency me-1">EGP</span>${product.price}
          </h4> 
          ${
            isOutOfStock
              ? '<span style="border-radius: 0;" class="badge bg-danger border-0 position-absolute end-0">Out of Stock</span>'
              : ""
          }          
          <a
            href="productDetailsCustomer.html?id=${product.id}"
            class="btn btn btn-outline-dark btn-sm"
            >View Details</a
          >
        </div>
      </div>
    </div>
    `;
}

function renderProducts(products) {
  const productList = document.getElementById("product-wrapper");
  productList.innerHTML = "";

  if (products.length === 0) {
    productList.innerHTML =
      '<h2 style="text-align: center;color: rgb(202, 194, 194);margin: 110px auto">No products match.</h2>';
  } else {
    products.forEach((product) => {
      productList.innerHTML += createProductCard(product);
    });
  }
}

function getFilteredProducts() {
  const searchInput = document
    .getElementById("search-product")
    .value.trim()
    .toLowerCase();
  const selectedCategory = document
    .getElementById("productCategory")
    .value.trim()
    .toLowerCase();
  const priceFilter = document.getElementById("priceFilter").value;

  let products = Product.getProducts();
  products = products.filter((product) => {
    const productName = product.name.toLowerCase();
    const productCategory = product.category.toLowerCase();
    return (
      (productName.includes(searchInput) || searchInput === "") &&
      (productCategory === selectedCategory || selectedCategory === "")
    );
  });

  if (priceFilter === "ascending") {
    products.sort((a, b) => a.price - b.price);
  } else if (priceFilter === "descending") {
    products.sort((a, b) => b.price - a.price);
  }

  return products;
}

function displayFilteredProducts() {
  const filteredProducts = getFilteredProducts();
  renderProducts(filteredProducts);
}

renderProducts(Product.getProducts());

document
  .getElementById("priceFilter")
  .addEventListener("change", displayFilteredProducts);
document
  .getElementById("search-product")
  .addEventListener("input", displayFilteredProducts);
document
  .getElementById("productCategory")
  .addEventListener("change", displayFilteredProducts);
