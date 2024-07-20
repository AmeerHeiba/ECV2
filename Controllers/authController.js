
class AuthController {
  static setCurrentUser(user) {
    const modal = new CustomModal();
    if (!AuthController.getCurrentUser()) {
     
      localStorage.setItem("currentUser", JSON.stringify(user));
    } else {
      modal.showCustomModal(
        'Error',
        "You are Already Logged In",
        'OK',
        'Cancel',
        () => { window.location.href = "home.html"; },
        () => { console.log('User canceled the error modal'); }
      );
      
    }
  }
  static customerLogin(username, password) {
    const user = User.authenticate(username, password);
    const modal = new CustomModal();
    if (user) {
      if (user.state === true) {
        this.setCurrentUser(user);
        window.location.href = "home.html";
      } else {
        
        modal.showCustomModal(
          'Error',
          "Your account was susbend please contact support for help",
          'OK',
          'Cancel',
          () => {},
          () => {window.location.href = "home.html"; }
        );
        
      }
    } else {
      
      modal.showCustomModal(
        'Error',
        "Wrong login Data",
        'OK',
        'Cancel',
        () => {},
        () => { window.location.href = "home.html"; }
      );
    }
  }

  static sellerLogin(username, password) {
    const modal = new CustomModal();
    const seller = Seller.authenticate(username, password);
    if (seller) {
      if (seller.state === true) {
        this.setCurrentUser(seller);
        window.location.href = "sellerDashboard.html";
      } else {
        modal.showCustomModal(
          'Error',
          "Your account was susbend please contact support for help",
          'OK',
          'Cancel',
          () => { window.location.href = "home.html"; },
          () => { console.log('User canceled the error modal'); }
        );
      }
    } else {
      modal.showCustomModal(
        'Error',
        "Wrong login Data",
        'OK',
        'Cancel',
        () => { window.location.href = "home.html"; },
        () => { console.log('User canceled the error modal'); }
      );
    }
  }

  
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
    const modal = new CustomModal();
    const users = User.getUsers();
    const newUser = new User(
      users.length + 1,
      username,
      Encryption.encrypt(password),
      email,
      role,
      firstName,
      lastName,
      contact,
      addresses
    );
    User.addUser(newUser);
    modal.showCustomModal(
      'Great!',
      "Welcome to our website please login to start using your account",
      'OK',
      'Cancel',
      () => { window.location.href = "home.html"; },
      () => { console.log('User canceled the error modal'); }
    );
    window.location.href = "home.html";
  }

  static logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "home.html";
  }

  static getCurrentUser() {
    return JSON.parse(localStorage.getItem("currentUser"));
  }


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
    const sellerReqs = Seller.getSellerRequests();
    const newSellerReq = new Seller(
      sellerReqs.length + 1,
      username,
      Encryption.encrypt(password),
      email,
      firstName,
      lastName,
      contact,
      addresses,
      dateOfRequest
    ); 
    Seller.requestAccount(newSellerReq);

  }


  static isLoggedIn() {
    if (this.getCurrentUser()) {
      return true;
    } else {
      return false;
    }
  }
}
