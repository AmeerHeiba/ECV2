class AuthController {
  static setCurrentUser(user) {
    if (!AuthController.getCurrentUser()) {
      localStorage.setItem("currentUser", JSON.stringify(user));
    } else {
      alert("You are already signed in, please logout first!");
      window.location.href = "home.html";
    }
  }
  static customerLogin(username, password) {
    const user = User.authenticate(username, password);

    if (user) {
      if (user.state === true) {
        this.setCurrentUser(user);
        window.location.href = "home.html";
      } else {
        alert("You account is suspended please contact support");
        window.location.href = "support.html";
      }
    } else {
      alert("Invalid username or password");
    }
  }

  static sellerLogin(username, password) {
    const seller = Seller.authenticate(username, password);
    if (seller) {
      if (seller.state === true) {
        this.setCurrentUser(seller);
        window.location.href = "sellerDashboard.html";
      } else {
        alert("You account is suspended please contact support");
        window.location.href = "support.html";
      }
    } else {
      alert("Invalid username or password");
    }
  }

  //(id, username, password, email, role, firstName,lastName,contact, addresses)
  static register(
    username,
    password,
    email,
    role = "customer",
    firstName,
    lastName,
    contact,
    addresses
  ) {
    const users = User.getUsers();
    const newUser = new User(
      users.length + 1,
      username,
      password,
      email,
      role,
      firstName,
      lastName,
      contact,
      addresses
    );
    User.addUser(newUser);
    alert("Registration successful. Please log in.");
    window.location.href = "home.html";
  }

  static logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "home.html";
  }

  static getCurrentUser() {
    return JSON.parse(localStorage.getItem("currentUser"));
  }

  //   username,
  //   password,
  //   email,
  //   firstName,
  //   lastName,
  //   contact,
  //   addresses
  //username, password, email, 'customer', firstName,lastName,contact, addresses
  static submitSellerRegRequest(
    username,
    password,
    email,
    firstName,
    lastName,
    contact,
    addresses
  ) {
    //pass the data to seller requests table
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0"); // Get day and pad with leading zero if needed
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Get month (0-11) and pad with leading zero
    const year = now.getFullYear(); // Get full year

    const dateOfRequest = `${day}/${month}/${year}`;
    console.log(dateOfRequest);
    const sellerReqs = Seller.getSellerRequests();
    const newSellerReq = new Seller(
      sellerReqs.length + 1,
      username,
      password,
      email,
      firstName,
      lastName,
      contact,
      addresses,
      dateOfRequest
    ); // r(id, username, password, email, role, date, contact, fullName)
    Seller.requestAccount(newSellerReq);
    // window.location.href = "home.html";
  }

  static validateUsername(username) {
    // Username should be between 3 and 15 characters and contain only alphanumeric characters and underscores
    const usernameRegex = /^[a-zA-Z0-9_]{3,15}$/;
    const users = User.getUsers();
    const user = users.find((user) => user.username === username);

    if (user) {
      alert("duplicate user name");
      return false;
    }
    if (!usernameRegex.test(username)) {
      return false;
    }
    return true;
  }

  static validatePassword(password) {
    // Password should be at least 8 characters, contain at least one uppercase letter, one lowercase letter, one number, and one special character
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      // alert('Invalid password. It should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
      return false;
    }
    return true;
  }

  static validateEmail(email) {
    // Basic email validation pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const users = User.getUsers();
    const user = users.find((user) => user.email === email);

    if (user) {
      alert("already regestered ");
      return false;
    }
    if (!emailRegex.test(email)) {
      // alert('Invalid email format.');
      return false;
    }
    return true;
  }

  static isLoggedIn() {
    if (this.getCurrentUser()) {
      return true;
    } else {
      return false;
    }
  }
}
