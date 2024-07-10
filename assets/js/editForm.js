document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("productForm");
  ProductController.initializeUpdateProductData();

  form.addEventListener("submit", function (event) {
    ProductController.updatehandleFormSubmit(event);
  });

  document
    .getElementById("productImage")
    .addEventListener("change", function (event) {
      ProductController.handleImageChange(event);
    });

  document
    .getElementById("changeImageBtn")
    .addEventListener("click", function () {
      ProductController.resetImagePreview();
    });
});
