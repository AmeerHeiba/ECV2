//render navbar
UIController.renderNavbar();
UIController.renderNavbar2();

//welcome user
UIController.welcomeUser("dark");

// update cart icon notification
UIController.updateCartIcon();

// apply animation
AOS.init();

// render user details

function renderUserDetails() {
  const user = UserController.getUser();
  document.querySelector(
    "#user-name"
  ).textContent = `${user.firstName} ${user.lastName}`;
  document.querySelector("#user-email").textContent = `${user.email}`;
  document.querySelector("#handle").textContent = `@${user.username}`;

  const profileContainer = document.getElementById("profile-container");
  const userDetails = `
              <h4>Personal Details</h4>
              <hr class="mb-4">
              <form class="row">
                <div class="form-group col-6 mb-4">
                  <label for="firstName" class="mb-2">First Name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="firstName"
                    placeholder="First name"
                    value="${user.firstName}"
                    disabled
                  />
                </div>
                <div class="form-group col-6 mb-4">
                  <label for="lastName" class="mb-2">Last Name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="lastName"
                    placeholder="Last name"
                    value="${user.lastName}"
                    disabled
                  />
                </div>
                <div class="form-group col-12 mb-4">
                  <label for="email" class="mb-2">Email address</label>
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    placeholder="Email"
                    value="${user.email}"
                    disabled
                  />
                </div>
                <div class="form-group col-6 mb-4">
                  <label for="phone" class="mb-2">Phone Number</label>
                  <input
                    type="tel"
                    class="form-control"
                    id="phone"
                    placeholder="Phone number"
                    value="${user.contact}"
                    disabled
                  />
                </div>
                <div class="form-group col-6 mb-4">
                  <label for="phone" class="mb-2">Username</label>
                  <input
                    type="tel"
                    class="form-control"
                    id="phone"
                    placeholder="Username"
                    value="${user.username}"
                    disabled
                  />
                </div>

                <div class="form-group">
                  <button type="button" class="col-12 btn btn-light secondary-color text-white shadow"  data-bs-toggle="modal"
              data-bs-target="#exampleModal">
                    Update Profile
                  </button>
                </div>
              </form>`;

  profileContainer.innerHTML = userDetails;

  //
}

renderUserDetails();

// update user personal details

function updateUserDetails() {
  const user = UserController.getUser();
  document.getElementById("first-name").value = user.firstName;
  document.getElementById("last-name").value = user.lastName;
  document.getElementById("email-address").value = user.email;
  document.getElementById("contact").value = user.contact;
  document.getElementById("username").value = user.username;

  document
    .getElementById("update-user-btn")
    .addEventListener("click", function () {
      let firstName = document.getElementById("first-name").value;
      let lastName = document.getElementById("last-name").value;
      let email = document.getElementById("email-address").value;
      let contact = document.getElementById("contact").value;
      let username = document.getElementById("username").value;

      firstName =
        firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
      lastName =
        lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase();
      email = email.toLowerCase();

      const allUsers = User.getUsers();

      const usernameExists = allUsers.some(
        (existingUser) =>
          existingUser.username.toLowerCase() === username.toLowerCase() &&
          user.username.toLowerCase() !== existingUser.username.toLowerCase()
      );

      const emailExists = allUsers.some(
        (existingUser) =>
          existingUser.email.toLowerCase() === email.toLowerCase() &&
          user.email.toLowerCase() !== existingUser.email.toLowerCase()
      );

      const contactExists = allUsers.some(
        (existingUser) =>
          existingUser.contact === contact &&
          user.contact !== existingUser.contact
      );

      //validation

      const nameRegex = /^[A-Za-z]+$/;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const contactRegex = /^(010|011|012|015)\d{8}$/;
      const usernameRegex = /^[A-Za-z0-9_.]{1,20}$/;

      if (!nameRegex.test(firstName) || firstName.length > 15) {
        alert("First name must be a string and no more than 15 characters.");
        return;
      }

      if (!nameRegex.test(lastName) || lastName.length > 15) {
        alert("Last name must be a string and no more than 15 characters.");
        return;
      }

      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
      }

      if (!contactRegex.test(contact)) {
        alert(
          "Contact must be 11 digits and start with 010, 011, 012, or 015."
        );
        return;
      }

      if (!usernameRegex.test(username)) {
        alert(
          "Username can only contain letters, digits, underscores, and dots (up to 20 characters)."
        );
        return;
      }

      if (usernameExists || !username) {
        alert("Username already exists. Please choose a different username.");
        return;
      }
      if (emailExists || !email) {
        alert("Email already exists. Please choose a different email.");
        return;
      }
      if (contactExists || !contact) {
        alert("Phone number already exists. Please choose a different number.");
        return;
      }

      let newDetails = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        contact: contact,
        username: username,
      };

      UserController.updateUserDetails(user.id, newDetails);
      renderUserDetails();
      UIController.welcomeUser("dark");
    });
}

updateUserDetails();

//render user addresses
function renderUserAddresses() {
  const user = UserController.getUser();
  let addressCardsContainer = document.getElementById("address-cards");
  addressCardsContainer.innerHTML = "";

  if (user.addresses.length != 0) {
    user.addresses.forEach((address) => {
      const addressCard = `
                  <div class="row d-flex justify-content-between">
                    <div class="col-12 p-2 position-relative">
               
                      <ul class="list-group">
                        <li class="list-group-item secondary-color text-white fw-semibold">Title: ${address.title}</li>
                        <li class="list-group-item">Address: ${address.address}</li>
                        <li class="list-group-item">City: ${address.city}</li>
                        <li class="list-group-item">Zip Code: ${address.zipCode}</li>
                        <li class="list-group-item">
                        <div class="col-4">
                     <button class="btn btn-sm btn-light secondary-color text-white update-address-btn"
                    data-bs-toggle="modal" data-bs-target="#update-address-modal"
                    data-address-id="${address.id}">
                    <i class="bi bi-pencil-square"></i>
                  </button>
                      <button onclick="UserController.removeUserAddress(${address.id}); renderUserAddresses()" class="btn btn-sm btn-danger">
                        <i class="bi bi-trash3-fill"></i>
                      </button>
                      
                     
                    </div></li>
                      </ul>
                    </div>
       
                  </div>
                `;

      addressCardsContainer.innerHTML += addressCard;
    });

    const updateAddressBtns = document.querySelectorAll(".update-address-btn");
    updateAddressBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const addressId = btn.getAttribute("data-address-id");
        fillAddressUpdateModal(+addressId);
      });
    });
  } else {
    addressCardsContainer.innerHTML = `
      <div class="row d-flex">
        <div class="alert alert-danger my-auto" role="alert">
          You have no saved addresses
        </div>
      </div>`;
  }
}

// validate address
function addressValidation(title, address, city, zip) {
  const titleRegex = /^[A-Za-z0-9 ]{1,15}$/;
  const addressRegex = /^[A-Za-z0-9 ]{1,30}$/;
  const cityRegex = /^[A-Za-z ]{1,20}$/;
  const zipRegex = /^\d{5}$/;

  // Check if any field is empty
  if (!title || !address || !city || !zip) {
    alert("All fields are required.");
    return false;
  }

  if (!titleRegex.test(title)) {
    alert(
      "Address title can only contain letters and numbers (up to 15 characters)."
    );
    return false;
  }

  if (!addressRegex.test(address)) {
    alert("Address can only contain letters and digits (up to 30 characters).");
    return false;
  }

  if (!cityRegex.test(city)) {
    alert("City must contain only letters (up to 20 characters).");
    return false;
  }

  if (!zipRegex.test(zip)) {
    alert("Zip code must be exactly 5 digits.");
    return false;
  }

  return true;
}

// update User Addresses

function fillAddressUpdateModal(addressId) {
  const user = UserController.getUser();
  const address = user.addresses.find((addr) => addr.id === addressId);
  if (address) {
    document.getElementById("update-title").value = address.title;
    document.getElementById("update-address").value = address.address;
    document.getElementById("update-city").value = address.city;
    document.getElementById("update-zip").value = address.zipCode;
    document.getElementById("address-id").value = address.id;
  }
}

renderUserAddresses();

// save new address

function addNewAddress() {
  document
    .getElementById("saveAddressBtn")
    .addEventListener("click", function () {
      let title = document.getElementById("title").value;
      let address = document.getElementById("address").value;
      let city = document.getElementById("city").value;
      let zip = document.getElementById("zip").value;

      if (addressValidation(title, address, city, zip)) {
        UserController.addNewAddress(title, address, city, zip);
        renderUserAddresses();
      }
    });
}

addNewAddress();

//update address
function updateAddress() {
  document
    .getElementById("update-address-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const addressId = document.getElementById("address-id").value;
      const updatedAddress = {
        title: document.getElementById("update-title").value,
        address: document.getElementById("update-address").value,
        city: document.getElementById("update-city").value,
        zipCode: document.getElementById("update-zip").value,
      };

      if (
        addressValidation(
          updatedAddress.title,
          updatedAddress.address,
          updatedAddress.city,
          updatedAddress.zipCode
        )
      ) {
        UserController.updateUserAddress(+addressId, updatedAddress);
        renderUserAddresses();
      }
    });
}

updateAddress();

UIController.renderWishlist();

document.querySelector("#profile-info").addEventListener("click", function () {
  document.querySelector("#profile-card").classList.remove("d-none");
  document.querySelector("#profile-info").classList.add("highlighted");
  document.querySelector("#orders").classList.remove("highlighted");
  document.querySelector("#wishlist").classList.remove("highlighted");
  document.querySelector("#orders-card").classList.add("d-none");
  document.querySelector("#wishlist-card").classList.add("d-none");
});
document.querySelector("#orders").addEventListener("click", function () {
  document.querySelector("#orders-card").classList.remove("d-none");
  document.querySelector("#profile-card").classList.add("d-none");
  document.querySelector("#orders").classList.add("highlighted");
  document.querySelector("#profile-info").classList.remove("highlighted");
  document.querySelector("#wishlist").classList.remove("highlighted");
  document.querySelector("#wishlist-card").classList.add("d-none");
});

document.querySelector("#wishlist").addEventListener("click", function () {
  document.querySelector("#wishlist-card").classList.remove("d-none");
  document.querySelector("#wishlist").classList.add("highlighted");
  document.querySelector("#orders").classList.remove("highlighted");
  document.querySelector("#profile-info").classList.remove("highlighted");
  document.querySelector("#orders-card").classList.add("d-none");
  document.querySelector("#profile-card").classList.add("d-none");
});
