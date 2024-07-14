document.addEventListener("DOMContentLoaded", function () {
  ProductController.welcomeSeller()

  const form = document.getElementById("productForm");
  ProductController.initializeUpdateProductData();
  ProductController.ImgUpload();
  form.addEventListener("submit", function (event) {
    ProductController.updatehandleFormSubmit(event);
  });
});
