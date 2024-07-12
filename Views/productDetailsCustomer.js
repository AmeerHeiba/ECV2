
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

let products = JSON.parse(localStorage.getItem("products")) || [];
let product = products.find((product) => product.id === parseInt(id));

let stockStatus = product.stock > 0 ? `In Stock` : "Out of stock";

const cardContainer = document.getElementById("productDetailsContainer");

cardContainer.innerHTML = `
  <div class="card custom-card">
    <div class="row">
      <div class="col-md-4 border-0 pe-3 my-5 border-end">
        <img src="${product.images[0]}" class="img-fluid rounded-start" alt="..."/>
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h2 class="card-title">${product.name}</h2>
          <h6 class="card-text" style="color: #754114; margin-top: 1rem;">${product.category}</h6>
          <p class="card-text" style="margin-top: 1rem">${product.description}</p>
          <h3 class="card-text" style="margin-top: 1rem;">${product.price}EG</h3>
          <h5 class="card-text">
            <small class="text-body-secondary" style="color: green">${stockStatus}</small>
          </h5>
          <input
            type="number"
            class="form-control me-3"
            style="width: 80px; margin: 1rem 0;"
            value="1"
            min="1"
            id="product-quantity"
          />
          <div class="d-flex align-items-center">
            <button
              style="
                width: 30%;
                border: 0;
                border-radius: 0.25rem;
                height: 35px;
                background-color: #754114;
                color: white;
                margin-right: 1rem;
              "
            >
              add to cart
            </button>
            <a class="btn btn-secondary">
              <i class="bi bi-bag-heart-fill"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
`;
