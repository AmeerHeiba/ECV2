class User {
  constructor(
    id,
    username,
    password,
    email,
    role,
    firstName,
    lastName,
    contact,
    addresses
  ) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.email = email;
    this.role = role; // 'customer', 'seller', 'admin'
    this.firstName = firstName;
    this.lastName = lastName;
    this.contact = contact;
    this.addresses = addresses;
    this.state = true;
    this.cart = []; // Array of objects
    this.orders = [];
    this.paymentInfo = {}; // card#,cardName,ExpirySDate,cvv
    this.wishlist = [];
  }

  static getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
  }

  static getUserById(id) {
    const users = this.getUsers();
    return users.find((user) => user.id === id);
  }
  static updateUserData(userId, newData) {
    const users = this.getUsers();
    const userIndex = users.findIndex((user) => user.id === userId);

    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...newData };
      this.saveUsers(users);}
  }

  static getCurrentUser() {
    return JSON.parse(localStorage.getItem("currentUser"));
  }

  static getCustomers() {
    return (
      JSON.parse(localStorage.getItem("users")).filter(
        (seller) => seller.role === "customer"
      ) || []
    );
  }

  static saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
  }

  static addUser(user) {
    const users = User.getUsers();
    users.push(user);
    User.saveUsers(users);
  }

  static authenticate(username, password) {
    
    const users = User.getUsers();
    return users.find(
      (user) => user.username === username && Encryption.decrypt(user.password) === password
    );
  }

  // get items from cart

  static getCartItems() {
    if (AuthController.getCurrentUser()) {
      const currentUser = AuthController.getCurrentUser() || [];
      const users = User.getUsers();
      const user = users.find((i) => i.id === currentUser.id);
      const cart = user.cart;
      return cart;
    } else {
      return;
    }
  }

  // add items to cart

  static addCartItem(id) {
    if (AuthController.getCurrentUser()) {
      //get cart items
      const cart = User.getCartItems();
      // get product details
      const item = Product.getProductById(id);

      if (item.stock > 0) {
        // check if item exists in cart
        const existingItem = cart.find((cartItem) => cartItem.id === item.id);

        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          cart.push({ id: id, quantity: 1 });
        }
        const currentUser = AuthController.getCurrentUser();
        const users = User.getUsers();
        const user = users.find((user) => user.id === currentUser.id);

        if (user) {
          user.cart = cart;
          User.saveUsers(users);
        }
      }
    } else {
      alert("Please login to add items to cart");
    }
  }

  // increase or decrease cart quantity

  static updateCartItem(id, quantity) {
    const cart = User.getCartItems();
    const item = cart.find((i) => i.id === id);
    if (item) {
      item.quantity = quantity;

      const currentUser = AuthController.getCurrentUser();
      const users = User.getUsers();
      const user = users.find((user) => user.id === currentUser.id);

      if (user) {
        user.cart = cart;
        User.saveUsers(users);
      }
    }
  }

  // remove item from cart

  static removeCartItem(id) {
    let cart = User.getCartItems();
    cart = cart.filter((item) => item.id != id);

    const currentUser = AuthController.getCurrentUser();
    const users = User.getUsers();
    const user = users.find((user) => user.id === currentUser.id);

    if (user) {
      user.cart = cart;
      User.saveUsers(users);
    }
  }

  // get user addresses

  static getAddresses() {
    if (AuthController.getCurrentUser()) {
      const currentUser = AuthController.getCurrentUser() || [];
      const users = User.getUsers();
      const user = users.find((i) => i.id === currentUser.id);
      const addresses = user.addresses;
      return addresses;
    } else {
      return;
    }
  }

         // Activate a User by ID
         static activateUser(id) {
          let users = this.getUsers();
          const userIndex = users.findIndex(u => u.id == id);
          if (userIndex !== -1) {
            users[userIndex].state = true;
              this.saveUsers(users);
          }
      }
  
  
             // Suspend a User by ID
          static suspendUser(id) {
            let users = this.getUsers();
            const userIndex = users.findIndex(u => u.id == id);
            if (userIndex !== -1) {
              users[userIndex].state = false;
                this.saveUsers(users);
            }
          }
      
  
}
