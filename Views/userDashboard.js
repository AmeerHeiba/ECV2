//welcome user

UIController.welcomeUser("dark");

// update cart icon notification
UIController.updateCartIcon();

// render user details

function renderUserDetails() {
  const user = UserController.getUser();
  document.querySelector("#user-name").textContent = `Hi ${user.firstName}`;
  document.querySelector("#user-email").textContent = `${user.email}`;

  const profileContainer = document.getElementById("profile-container");
  const userDetails = `
              <h4 class="my-4">Personal Details</h4>
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
                  <button type="button" class="btn btn-info text-white"  data-bs-toggle="modal"
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

      let newDetails = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        contact: contact,
        username: username,
      };

      UserController.updateUserDetails(user.id, newDetails);
      renderUserDetails();
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
                        <li class="list-group-item bg-dark text-white fw-semibold">Title: ${address.title}</li>
                        <li class="list-group-item">Address: ${address.address}</li>
                        <li class="list-group-item">City: ${address.city}</li>
                        <li class="list-group-item">Zip Code: ${address.zipCode}</li>
                        <li class="list-group-item">
                        <div class="col-4">
                     <button class="btn btn-sm btn-info text-white update-address-btn"
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
        updateAddressModal(+addressId);
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

// validate user input

// update User Addresses

function updateAddressModal(addressId) {
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

      UserController.addNewAddress(title, address, city, zip);

      renderUserAddresses();
    });
}

addNewAddress();

//update address

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
    UserController.updateUserAddress(+addressId, updatedAddress);
    renderUserAddresses();
  });

renderWishlist();

document.querySelector("#profile-info").addEventListener("click", function () {
  document.querySelector("#profile-card").classList.remove("d-none");
  document.querySelector("#profile-card").classList.add("active");
  document.querySelector("#orders-card").classList.add("d-none");
  document.querySelector("#wishlist-card").classList.add("d-none");
});
document.querySelector("#orders").addEventListener("click", function () {
  document.querySelector("#orders-card").classList.remove("d-none");
  document.querySelector("#profile-card").classList.add("d-none");
  document.querySelector("#wishlist-card").classList.add("d-none");
});

document.querySelector("#wishlist").addEventListener("click", function () {
  document.querySelector("#wishlist-card").classList.remove("d-none");
  document.querySelector("#orders-card").classList.add("d-none");
  document.querySelector("#profile-card").classList.add("d-none");
});
