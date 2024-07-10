class Product {
  constructor(
    itemId,
    name,
    imgName,
    price,
    description,
    creationDate,
    quantity,
    sellerId
  ) {
    this.itemId = itemId;
    this.name = name;
    this.imgName = imgName;
    this.price = price;
    this.description = description;
    this.creationDate = creationDate;
    this.quantity = quantity;
    this.sellerId = sellerId;
  }

  static getProducts() {
    return JSON.parse(localStorage.getItem("products")) || [];
  }

  static saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }

  static addProduct(product) {
    const products = Product.getProducts();
    products.push(product);
    Product.saveProducts(products);
  }

  static updateProductQuantity(id, quantity) {
    const products = Product.getProducts();
    console.log(id);
    const product = products.find((product) => product.itemId === id);
    if (product) {
      product.quantity = product.quantity - +quantity;
      Product.saveProducts(products);
    }
  }

  static getProductById(id) {
    const products = Product.getProducts();
    return products.find((product) => product.itemId === id);
  }
}
