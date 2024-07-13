const registrationformCustomer = document.getElementById(
  "registration-form-Customer"
);

if (registrationformCustomer) {
  registrationformCustomer.addEventListener("submit", (event) => {
    console.log(event);
    event.preventDefault();

    // Get the pathname
    // Extract the part after the last slash and before the first space or period
    const username = document.getElementById("usernameReg").value;
    const password = document.getElementById("passwordReg").value;
    const email = document.getElementById("emailReg").value;
    const firstName = document.getElementById("firstNameReg").value;
    const lastName = document.getElementById("lastNameReg").value;
    const contact = document.getElementById("contactReg").value;
    const addressName = document.getElementById("titleReg").value;
    const addressText = document.getElementById("addressReg").value;
    const city = document.getElementById("cityReg").value;
    const zipCode = document.getElementById("zipReg").value;
    const address = {
      id: 1,
      title: addressName,
      address: addressText,
      city: city,
      zipCode: zipCode,
    };
    const addresses = [address];

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

    // if (filename === "customerRegister") {
    //   // const email = document.getElementById('email').value;

    //   //Validation
    //   // user name not empty, not repeated, not
    //   //Password validation
    //   //email correct and not repeated
    //   if (AuthController.validateUsername(username) === false) {
    //     alert(
    //       "Invalid username. It should be 3-15 characters long and contain only alphanumeric characters and underscores."
    //     );
    //   } else if (AuthController.validatePassword(password) === false) {
    //     alert(
    //       "Invalid password. It should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character."
    //     );
    //   } else if (AuthController.validateEmail(email) === false) {
    //     alert("Invalid email format.");
    //   } else {
    //     AuthController.register(
    //       username,
    //       password,
    //       email,
    //       "customer",
    //       firstName,
    //       lastName,
    //       contact,
    //       addresses
    //     );
    //   }
    // }
  });
}
