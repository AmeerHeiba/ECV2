const registrationFormSeller = document.getElementById(
  "registration-form-seller"
);

if (registrationFormSeller) {
  registrationFormSeller.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("seller exists");

    // Extract the part after the last slash and before the first space or period
    const username = document.getElementById("usernameSReg").value;
    const password = document.getElementById("passwordSReg").value;
    const email = document.getElementById("emailSReg").value;
    const firstName = document.getElementById("firstNameSReg").value;
    const lastName = document.getElementById("lastNameSReg").value;
    const contact = document.getElementById("contactSReg").value;
    const addressName = document.getElementById("titleSReg").value;
    const addressText = document.getElementById("addressSReg").value;
    const city = document.getElementById("citySReg").value;
    const zipCode = document.getElementById("zipSReg").value;
    const address = {
      id: 1,
      title: addressName,
      address: addressText,
      city: city,
      zipCode: zipCode,
    };
    const addresses = [address];
    // const role = document.getElementById('role').value;

    AuthController.submitSellerRegRequest(
      username,
      password,
      email,
      firstName,
      lastName,
      contact,
      addresses
    );
  });
}
