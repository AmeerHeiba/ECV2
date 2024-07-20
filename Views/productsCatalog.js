//render navbar
UIController.renderNavbar();
UIController.renderNavbar2();

//welcome user
UIController.welcomeUser("dark");

// update cart icon notification
UIController.updateCartIcon();

// apply animation
AOS.init()
function renderProducts(products) {
  if (products.length === 0) {
    productsContainer.innerHTML =
      '<h2 style="text-align: center;color: rgb(202, 194, 194);margin: 110px auto">No products match.</h2>';
  } else {
    products.forEach((product) => {
      UIController.renderProductCard(product);
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
