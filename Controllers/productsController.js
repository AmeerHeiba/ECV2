class ProductController {
  // Function to display products from local storage
  static displayProducts() {
    const tableBody = document.getElementById("productTableBody");
    const noProductMessage = document.getElementById("no-product");

    const products = JSON.parse(localStorage.getItem("products")) || [];
    const currentUser= JSON.parse(localStorage.getItem('currentUser'));
    const sellerId = currentUser.id;
    if (products.length > 0) {
      tableBody.innerHTML = "";

      products.forEach((product, index) => {
        if(product.seller_id===sellerId){
        const row = ProductController.createProductRow(product, index);
        tableBody.appendChild(row);
        }

      });
    } else {
      tableBody.innerHTML = ""; // Clear table body
      noProductMessage.style.display = "block";
    }
  }

  // Function to create a single product row
  static createProductRow(product) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${product.id}</td>
        <td><img src="${product.image}" alt="${product.name}" /></td>
                <td>${product.name}</td>
        <td>${product.description}</td>
        <td>${product.category}</td>
        <td>${product.stock}</td>
        <td>${product.price} $</td>
        <td>${product.date}</td>
        <td class="action">
          <i class="fa fa-pencil-alt edit-icon" onclick="ProductController.editeProduct(${product.id})"></i>
          <i class="fa fa-trash-alt delete-icon" onclick="ProductController.deleteProduct(${product.id})"></i>
        </td>
      `;
    return row;
  }

  // Function to delete a product from local storage and table
  static deleteProduct(id) {
    $("#deleteProductModal").modal("show");

    $("#confirmDeleteBtn").click(function () {
      let products = JSON.parse(localStorage.getItem("products")) || [];
      products = products.filter((product) => product.id !== id);
      products.forEach((product, index) => {
        product.id = index + 1;
      });
      localStorage.setItem("products", JSON.stringify(products));
      ProductController.displayProducts();
      $("#deleteProductModal").modal("hide");
    });
    $(".cancelDelete").click(function () {
      $("#deleteProductModal").modal("hide");
    });
  }

  static editeProduct(id) {
    window.location.href = `editeProduct.html?id=${id}`;
  }
  static updatehandleFormSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    const form = event.target;

    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }

    const stockInput = document.getElementById("productStock");
    const priceInput = document.getElementById("productPrice");

    if (parseInt(stockInput.value) <= 0) {
      stockInput.setCustomValidity("Stock must be greater than zero.");
      form.classList.add("was-validated");
      return;
    } else {
      stockInput.setCustomValidity("");
    }

    if (parseFloat(priceInput.value) <= 0) {
      priceInput.setCustomValidity("Price must be greater than zero.");
      form.classList.add("was-validated");
      return;
    } else {
      priceInput.setCustomValidity("");
    }

    ProductController.updateProduct();
    form.reset();
    ProductController.resetImagePreview();
    form.classList.remove("was-validated");
    window.location.href = "sellerDashboard.html";
  }

  static initializeUpdateProductData() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    if (!id) {
      console.error("Product ID not found in URL parameters.");
      return;
    }

    let products = JSON.parse(localStorage.getItem("products")) || [];
    let product = products.find((product) => product.id === parseInt(id));

    if (!product) {
      console.error("Product not found in localStorage.");
      return;
    }
    console.log(product);
    // Populate form fields with existing product data
    document.getElementById("productName").value = product.name;
    document.getElementById("productDescription").value = product.description;
    document.getElementById("productStock").value = product.stock;
    document.getElementById("productPrice").value = product.price;
    document.getElementById("productCategory").value = product.category;
    const imgPreview = document.getElementById("imgPreview");
    imgPreview.src = product.image;
    imgPreview.style.display = "block";
    document.getElementById("changeImageBtn").style.display = "block";
  }

  static updateProduct() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    let products = JSON.parse(localStorage.getItem("products")) || [];
    let productIndex = products.findIndex(
      (product) => product.id === parseInt(id)
    );

    if (productIndex === -1) {
      console.error("Product not found in localStorage.");
      return;
    }

    // Update product object with form data
    products[productIndex] = {
      ...products[productIndex],
      name: document.getElementById("productName").value,
      description: document.getElementById("productDescription").value,
      stock: parseInt(document.getElementById("productStock").value),
      price: parseFloat(document.getElementById("productPrice").value),
      category: document.getElementById("productCategory").value,
      image: document.getElementById("imgPreview").src,
    };
    localStorage.setItem("products", JSON.stringify(products));
  }
  // Function to filter products based on search input
  static filterProducts() {
    const input = document.getElementById("searchProduct");
    const filter = input.value.toUpperCase();
    const table = document.getElementById("myTable");
    const rows = table.getElementsByTagName("tr");

    for (let i = 0; i < rows.length; i++) {
      const td1 = rows[i].getElementsByTagName("td")[2];
      const td2 = rows[i].getElementsByTagName("td")[3];
      const td3 = rows[i].getElementsByTagName("td")[4];

      if (td1 && td2 && td3) {
        const txtValue1 = td1.textContent || td1.innerText;
        const txtValue2 = td2.textContent || td2.innerText;
        const txtValue3 = td3.textContent || td3.innerText;

        if (
          txtValue1.toUpperCase().indexOf(filter) > -1 ||
          txtValue2.toUpperCase().indexOf(filter) > -1 ||
          txtValue3.toUpperCase().indexOf(filter) > -1
        ) {
          rows[i].style.display = "";
        } else {
          rows[i].style.display = "none";
        }
      }
    }
  }

  static handleFormSubmit(event) {
    const form = event.target;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      form.classList.add("was-validated");
      return;
    }

    const stockInput = document.getElementById("productStock");
    const priceInput = document.getElementById("productPrice");

    if (parseInt(stockInput.value) <= 0) {
      stockInput.setCustomValidity("Stock must be greater than zero.");
      event.preventDefault();
      event.stopPropagation();
    } else {
      stockInput.setCustomValidity("");
    }

    if (parseFloat(priceInput.value) <= 0) {
      priceInput.setCustomValidity("Price must be greater than zero.");
      event.preventDefault();
      event.stopPropagation();
    } else {
      priceInput.setCustomValidity("");
    }

    form.classList.add("was-validated");

    if (form.checkValidity()) {
      event.preventDefault();
      ProductController.saveProduct();
      form.reset();
      ProductController.resetImagePreview();
      form.classList.remove("was-validated");
      window.location.href = "sellerDashboard.html";
    }
  }

  static handleImageChange(event) {
    const input = event.target;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const imgPreview = document.getElementById("imgPreview");
        imgPreview.src = e.target.result;
        imgPreview.style.display = "block";
        document.getElementById("changeImageBtn").style.display = "block";
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  static resetImagePreview() {
    const imgPreview = document.getElementById("imgPreview");
    imgPreview.src = "#";
    imgPreview.style.display = "none";
    document.getElementById("changeImageBtn").style.display = "none";
    document.getElementById("productImage").value = "";
  }
  // Function to show/hide sections based on sidebar clicks
  static showProducts() {
    document.getElementById("products").style.display = "block";
    document.getElementById("analytics").style.display = "none";
    document.getElementById("orders").style.display = "none";
  }

  static showAnalytics() {
    document.getElementById("products").style.display = "none";
    document.getElementById("analytics").style.display = "block";
    document.getElementById("orders").style.display = "none";
  }

  static showOrders() {
    document.getElementById("products").style.display = "none";
    document.getElementById("analytics").style.display = "none";
    document.getElementById("orders").style.display = "block";
  }

  // Function to get product details by ID
  static getProductDetails(id) {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    return products.filter((product) => product.id === id);
  }
  static saveProduct() {
    const productName = document.getElementById("productName").value;
    const productDescription =
      document.getElementById("productDescription").value;
    const productStock = parseInt(
      document.getElementById("productStock").value
    );
    const productPrice = parseFloat(
      document.getElementById("productPrice").value
    );
    const productImage = document.getElementById("imgPreview").src;
    const productCategory = document.getElementById("productCategory").value;
   const currentUser= JSON.parse(localStorage.getItem('currentUser'));
   const sellerId = currentUser.id;
    const product = new Product(
      null,
      productName,
      productImage,
      productPrice,
      productDescription,
      productStock,
      sellerId,
      null,
      productCategory
    );

    Product.addProduct(product);
  }
}

window.ProductController = ProductController;
