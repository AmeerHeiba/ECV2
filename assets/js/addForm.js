document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("productForm");
  
    form.addEventListener("submit", function (event) {
        ProductController.handleFormSubmit(event);
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