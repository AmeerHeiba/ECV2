document.addEventListener("DOMContentLoaded", function () {
    ProductController.welcomeSeller()

    const form = document.getElementById("productForm");
    ProductController.ImgUpload();
    form.addEventListener("submit", function (event) {
        ProductController.handleFormSubmit(event);
    });
  
  });