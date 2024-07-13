document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("productForm");
  ProductController.initializeUpdateProductData();
  ProductController.ImgUpload();
  form.addEventListener("submit", function (event) {
    ProductController.updatehandleFormSubmit(event);
  });
});
