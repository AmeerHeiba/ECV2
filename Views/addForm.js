document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("productForm");
    ProductController.ImgUpload();
    form.addEventListener("submit", function (event) {
        ProductController.handleFormSubmit(event);
    });
  
  });