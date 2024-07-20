

const registrationformCustomer = document.getElementById("registration-form-Customer");

if (registrationformCustomer) {
  registrationformCustomer.addEventListener("submit", (event) => {
    event.preventDefault();

    // Get form values
    const username = document.getElementById("usernameReg").value.trim();
    const password = document.getElementById("passwordReg").value.trim();
    const email = document.getElementById("emailReg").value.trim();
    const firstName = document.getElementById("firstNameReg").value.trim();
    const lastName = document.getElementById("lastNameReg").value.trim();
    const contact = document.getElementById("contactReg").value.trim();
    const addressName = document.getElementById("titleReg").value.trim();
    const addressText = document.getElementById("addressReg").value.trim();
    const city = document.getElementById("cityReg").value.trim();
    const zipCode = document.getElementById("zipReg").value.trim();

    // Validation

    const errors = [];
    
    if (!username) errors.push("Username is required.");
    if ((User.getUsers().find((user) => user.username === username))) errors.push("Username is already used.");
    if (!password || password.length < 6) errors.push("Password is required and must be at least 6 characters.");
    if (!email || !/\S+@\S+\.\S+/.test(email)) errors.push("Valid email is required.");
    if ((User.getUsers().find((user) => user.email === email))) errors.push("Email is already used.");
    if (!firstName) errors.push("First name is required.");
    if (!lastName) errors.push("Last name is required.");
    if (!contact || !/^(011|012|010|015)\d{8}$/.test(contact)) errors.push("Valid contact number is required. It should start with 011, 012, 010, or 015 followed by 8 digits.");
    if (!addressName) errors.push("Address name is required.");
    if (!addressText) errors.push("Address details are required.");
    if (!city) errors.push("City is required.");
    if (!zipCode || !/^\d{5}(-\d{4})?$/.test(zipCode)) errors.push("Valid ZIP code is required.");

    if (errors.length > 0) {
      const modal = new CustomModal();
      modal.showCustomModal(
        'Validation Error',
        errors.join("\n"),
        'OK',
        'Cancel',
        () => { console.log('User confirmed the error modal'); },
        () => { console.log('User canceled the error modal'); }
      );
      return;
    }
    else{
      const modal = new CustomModal();
    // Address object
    const address = {
      id: 1,
      title: addressName,
      address: addressText,
      city: city,
      zipCode: zipCode,
    };
    const addresses = [address];

    // Register the user
    AuthController.register(
      username,
      password,
      email,
      "customer",
      firstName,
      lastName,
      contact,
      addresses
    );
    
    modal.showCustomModal(
      '"Registration successful!"',
      "Please Login",
      'OK',
      'Cancel',
      'light'
    );
    
    registrationformCustomer.reset();
  }
  });
  
}
