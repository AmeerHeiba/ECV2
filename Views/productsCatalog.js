function createProductCard(product) {
    return `
           <div class="card col-12 col-xl-2">
      <img
        src="${product.images[0]}"
        class="wishlist-img card-img-top rounded-2 mt-3"
        alt="${product.name}"
      />
      
      <div class="card-body">
        <h6 class="mb-3">${product.name}</h6>
        <div class="d-flex flex-column align-items-start">
          <h4 class="mb-3">
            <span class="currency me-1">EGP</span>${product.price}
          </h4>
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

  // Inject product cards into the product list
  const productList = document.getElementById("product-wrapper");
  const savedProducts = Product.getProducts(); // Fetch products from local storage
  savedProducts.forEach((product) => {
    productList.innerHTML += createProductCard(product);
  });
  function filterProducts() {
    const searchInput = document.getElementById("search-product");
    const filter = searchInput.value.trim().toLowerCase();
    const productCards = document.querySelectorAll('.card');
    let matchFound = false; // Flag to track if any matching product is found
  
    productCards.forEach(card => {
      const productName = card.querySelector('h6').textContent.toLowerCase(); // Assuming product name is inside <h6> tag
  
      if (productName.includes(filter)) {
        card.style.display = ''; // Show the card
        matchFound = true; // Set flag to true if a match is found
      } else {
        card.style.display = 'none'; // Hide the card
      }
    });
  
    // Display message if no products match the filter
    const noMatchMessage = document.getElementById('no-match-message');
    if (!matchFound) {
      noMatchMessage.style.display = 'block'; // Show the message
    } else {
      noMatchMessage.style.display = 'none'; // Hide the message
    }
  }
  
  