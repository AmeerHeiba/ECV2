// productModel.js

class Product {
  constructor(id, name, images, price, description, stock, seller_id, date,category) {
    this.id = id || Product.getNextProductId();
    this.name = name;
    this.images = images;
    this.category=category
    this.price = price;
    this.description = description;
    this.stock = stock;
    this.seller_id =seller_id;
    this.date = date ||new Date().toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-');
  }

  static getProducts() {
    return JSON.parse(localStorage.getItem("products")) || [];
  }

  static saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }
  static deleteProduct(id) {
    let products = Product.getProducts();
    products = products.filter((product) => product.id !== id);
    products.forEach((product, index) => {
      product.id = index + 1;
    });
        Product.saveProducts(products);
    return products;
  }
  static addProduct(product) {
    const products = Product.getProducts();
    products.push(product);
    Product.saveProducts(products);
  }
  static updateProduct(updatedProduct) {
    const products = Product.getProducts();
    const index = products.findIndex(
      (product) => product.id === updatedProduct.id
    );
    if (index !== -1) {
      products[index] = updatedProduct;
      Product.saveProducts(products);
    } else {
      throw new Error(`Product with ID ${updatedProduct.id} not found.`);
    }
  }
  static getProductById(id) {
    const products = Product.getProducts();
    return products.find((product) => product.id === id);
  }
  static getNextProductId() {
    const products = Product.getProducts();
    return products.length ? Math.max(...products.map((p) => p.id)) + 1 : 1;
  }
}
