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
    User.addCartItem(id);
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

  // wishlist

  static addItemToWishlist(item) {
    if (AuthController.getCurrentUser()) {
      const currentUser = AuthController.getCurrentUser();
      const users = User.getUsers();
      const userIndex = users.findIndex((u) => u.id === currentUser.id);

      if (userIndex !== -1) {
        const user = users[userIndex];
        const items = user.wishList;
        const existingItemIndex = items.findIndex(
          (i) => i.itemId === item.itemId
        );

        if (existingItemIndex !== -1) {
          // If item exists, remove it from wishlist
          items.splice(existingItemIndex, 1);
        } else {
          // If item doesn't exist, add it to wishlist
          items.push(item);
        }

        // Update user's wishlist and save users
        user.wishList = items;
        users[userIndex] = user;
        User.saveUsers(users);
      }
    }
  }

  static isProductInCart(productId) {
    const currentUser = AuthController.getCurrentUser();
    if (currentUser) {
      const cartItems = User.getCartItems();
      console.log(cartItems);
      return cartItems.some((item) => item.id === productId);
    }
    return false;
  }

  static changeIcon(button) {
    const icon = button.querySelector("i.bi");

    if (icon.classList.contains("bi-cart-plus-fill")) {
      icon.classList.remove("bi-cart-plus-fill");
      icon.classList.add("bi-cart-check-fill");
      button.classList.remove("btn-primary");
      button.classList.add("btn-success");
    }

    if (icon.classList.contains("bi-bag-heart")) {
      icon.classList.remove("bi-bag-heart");
      icon.classList.add("bi-bag-heart-fill");
      button.classList.remove("btn-primary");
      button.classList.add("btn-danger");
    }
  }
}
