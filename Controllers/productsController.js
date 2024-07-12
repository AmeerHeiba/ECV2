class ProductController {
  // Function to display products from local storage
  static displayProducts() {
    const tableBody = document.getElementById("productTableBody");
    const noProductMessage = document.getElementById("no-product");

    const products = JSON.parse(localStorage.getItem("products")) || [];
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const sellerId = currentUser.id;
    if (products.length > 0) {
      tableBody.innerHTML = "";

      products.forEach((product, index) => {
        if (product.seller_id === sellerId) {
          const row = ProductController.createProductRow(product, index);
          tableBody.appendChild(row);
        }
      });
    } else {
      tableBody.innerHTML = "";
      noProductMessage.style.display = "block";
    }
  }

  // Function to create a single product row
  static createProductRow(product) {
    const row = document.createElement("tr");
    // const imgSrc = product.images[0]
    // console.log(product.images[0])
    row.innerHTML = `
        <td>${product.id}</td>
        <td><img src=${product.images[0]} alt="${product.name}" /></td>
                <td>${product.name}</td>
        <td>${product.description}</td>
        <td>${product.category}</td>
        <td>${product.stock}</td>
        <td>${product.price} $</td>
        <td>${product.date}</td>
        <td class="action">
          <i class="fa fa-pencil-alt edit-eye-icon" onclick="ProductController.editeProduct(${product.id})"></i>
          <i class="fa fa-trash-alt delete-icon" onclick="ProductController.deleteProduct(${product.id})"></i>
          <i class="fa-solid fa-eye edit-eye-icon" onclick="ProductController.showProductDetails(${product.id})"></i>

        </td>
      `;
    return row;
  }

  // Function to get product details by ID

  static showProductDetails(id) {
    window.location.href = `productDetails.html?id=${id}`;
  }
  static getProductDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    let products = JSON.parse(localStorage.getItem("products")) || [];
    let product = products.find((product) => product.id === parseInt(id));

    if (!product) {
      console.error("Product not found in localStorage.");
      return;
    }
    let stockStatus =
      product.stock > 0 ? `${product.stock} In Stock` : "Out of stock";

    const cardContainer = document.getElementById("productDetailsContainer");

    cardContainer.innerHTML = `
    <div class="col-md-4 border-0 pe-3 my-5 border-end">
      <div id="carouselExample" class="carousel slide" data-bs-ride="carousel" data-bs-interval="2000">
        <div class="carousel-inner">
          ${product.images
            .map(
              (image, index) => `
            <div class="carousel-item ${index === 0 ? "active" : ""}">
              <img src="${image}" class="img-fluid rounded-start carousel-image" alt="Product Image ${
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
        <h6 class="card-text" style="color: #754114; margin-top: 1rem;">${
          product.category
        }</h6>
        <p class="card-text" style="margin-top: 1rem">${product.description}</p>
        <h3 class="card-text" style=" margin-top: 1rem;">${product.price} $</h3>
        <h5 class="card-text">
          <small class="text-body-secondary" style="color: ${
            product.stock > 0 ? "green" : "red"
          }">${stockStatus}</small>
        </h5>
        <p class="card-text">
          <small class="text-body-secondary" > Added in ${product.date} </small>
        </p>
        <div class="d-flex align-items-center ">
          <button class="btn btn-primary me-2" style="background-color: #e4e3e3;border:0; color: #754114" onclick="ProductController.editProduct(${
            product.id
          })"> <i class="fa fa-pencil-alt me-1"></i> Edit</button>
        <button class="btn btn-danger me-2" style="background-color:#e4e3e3; border:0 ;color:red " onclick="ProductController.deleteProduct(${
          product.id
        })"> <i class="fa fa-trash-alt me-1"></i> Delete</button>
        <button class="btn btn-custom" onclick="ProductController.backHome()"> <i class="fa-solid fa-arrow-left"></i> Back</button>
        </div>
      </div>
    </div>
  `;
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
      $("#deleteProductModal").modal("hide");
      ProductController.backHome();
      ProductController.displayProducts();
    });
    $(".cancelDelete").click(function () {
      $("#deleteProductModal").modal("hide");
    });
  }
  static backHome() {
    window.location.href = `sellerDashboard.html`;
  }

  // Function to edite a product from local storage and table

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

    ProductController.updateProduct();
    form.reset();
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
    document.getElementById("productName").value = product.name;
    document.getElementById("productDescription").value = product.description;
    document.getElementById("productStock").value = product.stock;
    document.getElementById("productPrice").value = product.price;
    document.getElementById("productCategory").value = product.category;
    ProductController.imgArray=product.images
    const imgWrap = document.querySelector(".upload__img-wrap");
    // Display images from ProductController.imgArray
    product.images.forEach((imgURL) => {
        const html = `
            <div class='upload__img-box'>
                <div class='img-bg' style='background-image: url(${imgURL})'>
                    <div class='upload__img-close'></div>
                </div>
            </div>
        `;
        imgWrap.insertAdjacentHTML("beforeend", html);
    });

    // Add event listener for image close button
    imgWrap.addEventListener("click", (e) => {
        if (e.target.classList.contains("upload__img-close")) {
            const box = e.target.closest(".upload__img-box");
            const imgURL = box.querySelector(".img-bg").style.backgroundImage.replace('url("', "").replace('")', "");
            ProductController.imgArray = ProductController.imgArray.filter((img) => img !== imgURL);
            box.remove();
        }
    });
   
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
    const productImages = ProductController.getImgArray();
if (productImages.length===0){
    products[productIndex] = {
      ...products[productIndex],
      name: document.getElementById("productName").value,
      description: document.getElementById("productDescription").value,
      stock: parseInt(document.getElementById("productStock").value),
      price: parseFloat(document.getElementById("productPrice").value),
      category: document.getElementById("productCategory").value,
    }} else{

      products[productIndex] = {
      ...products[productIndex],
      name: document.getElementById("productName").value,
      description: document.getElementById("productDescription").value,
      stock: parseInt(document.getElementById("productStock").value),
      price: parseFloat(document.getElementById("productPrice").value),
      category: document.getElementById("productCategory").value,
      images:productImages

    }
    }
    
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
    if (form.checkValidity()) {
      event.preventDefault();
      ProductController.saveProduct();
      form.reset();
      form.classList.remove("was-validated");
      window.location.href = "sellerDashboard.html";
    }
  }
  static imgArray = [];

  static ImgUpload() {
    const maxLength = 5;

    document.querySelectorAll(".upload__inputfile").forEach((input) => {
      input.addEventListener("change", (e) => {
        const imgWrap = input
          .closest(".form-group")
          .querySelector(".upload__img-wrap");
        const files = Array.from(e.target.files);

        files.forEach((file) => {
          if (
            !file.type.match("image.*") ||
            ProductController.imgArray.length >= maxLength
          ) {
            return;
          }
          // console.log(file);
          // ProductController.imgArray.push(file.name);

          const reader = new FileReader();
          reader.onload = (e) => {
            const imgURL = e.target.result;
            console.log(imgURL);
            ProductController.imgArray.push(imgURL);
            console.log(ProductController.imgArray);

            const html = `
              <div class='upload__img-box'>
                <div class='img-bg' style='background-image: url(${imgURL})' data-file='${file.name}'>
                  <div class='upload__img-close'></div>
                </div>
              </div>
            `;
            imgWrap.insertAdjacentHTML("beforeend", html);
          };
          reader.readAsDataURL(file);
        });
      });
    });

    document.body.addEventListener("click", (e) => {
      if (e.target.classList.contains("upload__img-close")) {
        const box = e.target.closest(".upload__img-box");
        const imgURL = box
          .querySelector(".img-bg")
          .style.backgroundImage.replace('url("', "")
          .replace('")', "");
        ProductController.imgArray = ProductController.imgArray.filter(
          (img) => img !== imgURL
        );
        box.remove();
      }
    });
  }
  static getImgArray() {
    return ProductController.imgArray;
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
    // const productImage = document.getElementById("imgPreview").src;
    const productImages = ProductController.getImgArray();
    const productCategory = document.getElementById("productCategory").value;
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const sellerId = currentUser.id;
    const product = new Product(
      null,
      productName,
      productImages,
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
