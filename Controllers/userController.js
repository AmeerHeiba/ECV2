class UserController {
  static getUserOrders(userId) {
    const orders = Order.getOrders();
    return orders.filter((order) => order.userId === userId);
  }

  static updateUserDetails(userId, newDetails) {
    const users = User.getUsers();
    const userIndex = users.findIndex((user) => user.id === userId);

    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...newDetails };
      User.saveUsers(users);
      alert("Account details updated successfully.");
    } else {
      alert("User not found.");
    }
  }

  static setState(newState, id) {
    const users = User.getUsers();
    const userIndex = users.findIndex((user) => user.id === id);
    const newDetails = { state: newState };

    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...newDetails };
      User.saveUsers(users);
      alert("Account details updated successfully.");
    } else {
      alert("User not found.");
    }
  }

  //get current user
  static getUser() {
    const currentUser = AuthController.getCurrentUser();
    const users = User.getUsers();
    const user = users.find((user) => user.id === currentUser.id);
    return user;
  }

  static addToCart(id) {
    const product = Product.getProductById(id);
    const currentUser = AuthController.getCurrentUser();
    const stock = product.stock;
    // product out of stock >> alert
    // in stock and not in cart >>
    if (!currentUser || currentUser.role === "admin") {
      alert("Please login using a customer account to add items to cart");
      return;
    }

    const cartItems = User.getCartItems();
    const item = cartItems.find((item) => item.id === id);

    if (product.stock <= 0) {
      alert("Product is out of stock");
    } else if (!item || (item && item.quantity < 9 && item.quantity < stock)) {
      User.addCartItem(id);
    } else {
      alert("You have exceeded the allowed quantity for this item");
      return;
    }
  }

  // change cart and wishlist icon

  static changeIcon(button) {
    const currentUser = AuthController.getCurrentUser();

    if (!currentUser || currentUser.role === "admin") {
      return;
    }

    if (currentUser) {
      const icon = button.querySelector("i.bi");
      const productID = button.getAttribute("data-product-id");
      const product = Product.getProductById(+productID);
      const cartItems = User.getCartItems();
      const item = cartItems.find((item) => item.id === +productID);

      if (product && product.stock !== 0) {
        if (icon.classList.contains("bi-cart-plus-fill")) {
          icon.classList.remove("bi-cart-plus-fill");
          icon.classList.add("bi-cart-check-fill");
          button.classList.remove("card-btn-main");
          button.classList.add("btn-success");
        } else {
          icon.classList.remove("bi-cart-check-fill");
          icon.innerHTML = `<span class="fw-bold count">+${item.quantity}</span>`;
        }
      }

      if (icon.classList.contains("bi-bag-heart")) {
        icon.classList.remove("bi-bag-heart");
        icon.classList.add("bi-bag-heart-fill");
        button.classList.remove("btn-secondary");
        button.classList.add("accent-color2");
      } else if (icon.classList.contains("bi-bag-heart-fill")) {
        icon.classList.remove("bi-bag-heart-fill");
        icon.classList.add("bi-bag-heart");
        button.classList.remove("accent-color2");
        button.classList.add("btn-secondary");
      }
    }
  }

  static isProductInCart(productId) {
    const currentUser = AuthController.getCurrentUser();
    if (currentUser) {
      const cartItems = User.getCartItems();
      return cartItems.some((item) => item.id === productId);
    }
    return false;
  }

  static removeUserAddress(addressId) {
    const currentUser = AuthController.getCurrentUser();
    if (currentUser) {
      const confirmation = confirm(
        "Are you sure you want to delete this address?"
      );
      if (confirmation) {
        const users = User.getUsers();
        const user = users.find((u) => u.id === currentUser.id);

        if (user) {
          // Filter out the address with the given addressId
          user.addresses = user.addresses.filter(
            (address) => address.id !== addressId
          );

          // Save updated user information
          User.saveUsers(users);
        } else {
          return;
        }
      }
    }
  }

  static addNewAddress(title, address, city, zipCode) {
    if (AuthController.getCurrentUser()) {
      //get current user
      const currentUser = AuthController.getCurrentUser();
      const users = User.getUsers();
      const user = users.find((user) => user.id === currentUser.id);

      if (user) {
        //get current addresses for user
        const addresses = user.addresses || [];
        const id = Date.now();

        //push new address
        addresses.push({
          id: id,
          title: title,
          address: address,
          city: city,
          zipCode: zipCode,
        });

        //save new addresses to user
        user.addresses = addresses;
        User.saveUsers(users);
      }
    }
  }

  static updateUserAddress(addressId, updatedAddress) {
    const currentUser = AuthController.getCurrentUser();
    if (currentUser) {
      const users = User.getUsers();
      const user = users.find((user) => user.id === currentUser.id);

      if (user) {
        // Find the address index in the user's addresses array
        const addressIndex = user.addresses.findIndex(
          (address) => address.id === addressId
        );

        if (addressIndex !== -1) {
          // Update the address with the new details
          user.addresses[addressIndex] = {
            ...user.addresses[addressIndex],
            ...updatedAddress,
          };

          // Save the updated user data
          User.saveUsers(users);
          alert("Address updated successfully.");
        } else {
          alert(`Address with ID ${addressId} not found.`);
        }
      } else {
        alert("User not found.");
      }
    } else {
      alert("Please log in to update address.");
    }
  }

  // Get wishlist items
  static getWishlist() {
    const currentUser = AuthController.getCurrentUser();
    if (currentUser) {
      const users = User.getUsers();
      const user = users.find((user) => user.id === currentUser.id);
      return user.wishlist || [];
    }
    return [];
  }

  // Add product to wishlist
  static addToWishlist(productId) {
    const currentUser = AuthController.getCurrentUser();
    if (currentUser) {
      const users = User.getUsers();
      const userIndex = users.findIndex((user) => user.id === currentUser.id);

      if (userIndex !== -1) {
        const wishlistIndex = users[userIndex].wishlist.findIndex(
          (item) => item.id === productId
        );

        if (wishlistIndex === -1) {
          // Product not in wishlist, add it
          users[userIndex].wishlist.push({ id: productId });
          User.saveUsers(users);
        } else {
          // Product already in wishlist, remove it
          users[userIndex].wishlist.splice(wishlistIndex, 1);
          User.saveUsers(users);
        }
      } else {
        alert("User not found.");
      }
    } else {
      alert("Please log in to add items to wishlist.");
    }
  }

  static isProductInWishlist(productId) {
    const currentUser = AuthController.getCurrentUser();
    if (currentUser) {
      const wishlist = UserController.getWishlist();
      return wishlist.some((item) => item.id === productId);
    }
    return false;
  }
}
