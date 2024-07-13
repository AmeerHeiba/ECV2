document.addEventListener("DOMContentLoaded", function () {
    ProductController.displayProducts();
    ProductController.displayOrders()
    ProductController.createCharts()

    const addProductButton = document.getElementById("addProductButton");
    addProductButton.addEventListener("click", function () {
      window.location.href = "addProduct.html"; // Replace with the actual URL of your Add Product page
    });
  });