
const modal = new CustomModal();
const registrationFormSeller = document.getElementById(
  "registration-form-seller"
);

if (registrationFormSeller) {
  registrationFormSeller.addEventListener("submit", (event) => {
    event.preventDefault();
    

    // Extract the part after the last slash and before the first space or period
    const username = document.getElementById("usernameSReg").value.trim();
    const password = document.getElementById("passwordSReg").value.trim();
    const email = document.getElementById("emailSReg").value.trim();
    const firstName = document.getElementById("firstNameSReg").value.trim();
    const lastName = document.getElementById("lastNameSReg").value.trim();
    const contact = document.getElementById("contactSReg").value.trim();
    const addressName = document.getElementById("titleSReg").value.trim();
    const addressText = document.getElementById("addressSReg").value.trim();
    const city = document.getElementById("citySReg").value.trim();
    const zipCode = document.getElementById("zipSReg").value.trim();

      // Validation
      const errors = [];
    
      if (!username) errors.push("Username is required.");
      if ((Seller.getSeller().find((s) => s.username === username))) errors.push("Username is already used.");
      if (!password || password.length < 6) errors.push("Password is required and must be at least 6 characters.");
      if (!email || !/\S+@\S+\.\S+/.test(email)) errors.push("Valid email is required.");
      if ((Seller.getSeller().find((s) => s.email === email))) errors.push("Email is already used.");
      if (!firstName) errors.push("First name is required.");
      if (!lastName) errors.push("Last name is required.");
      if (!contact || !/^(011|012|010|015)\d{8}$/.test(contact)) errors.push("Valid contact number is required. It should start with 011, 012, 010, or 015 followed by 8 digits.");
      if (!addressName) errors.push("Address name is required.");
      if (!addressText) errors.push("Address details are required.");
      if (!city) errors.push("City is required.");
      if (!zipCode || !/^\d{5}(-\d{4})?$/.test(zipCode)) errors.push("Valid ZIP code is required.");
  
      if (errors.length > 0) {
        
        modal.showCustomModal(
          'Validation Error',
          errors.join("\n"),
          'OK',
          'Cancel',
        );
        return;
      }
  
      // Address object


    const address = {
      id: 1,
      title: addressName,
      address: addressText,
      city: city,
      zipCode: zipCode,
    };
    const addresses = [address];
    

    AuthController.submitSellerRegRequest(
      username,
      password,
      email,
      firstName,
      lastName,
      contact,
      addresses
    );

    
    modal.showCustomModal(
      '"Registration successful!"',
      "Please wait for a confirmation email soon",
      'OK',
      'Cancel',
    
    );
    registrationFormSeller.reset();
  });
}
