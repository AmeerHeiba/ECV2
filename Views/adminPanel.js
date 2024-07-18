// Function to refresh the products table
function refreshProductsTable() {
    const productData = Product.getProducts();
    const productsTable = document.getElementById('productsTable').getElementsByTagName('tbody')[0];
    productsTable.innerHTML = '';
    productData.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <th scope="row">${product.id}</th>
            <td>${product.description}</td>
            <td><img src="${product.images[0]}" alt="${product.name}" style="width: 50px; height: auto;"></td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.stock}</td>
            <td>${product.seller_id}</td>
            <td>
                <button class="btn btn-outline-primary btn-sm" type="button" data-id="${product.id}" data-action="edit">Edit</button>
                <button class="btn btn-outline-danger btn-sm" type="button" data-id="${product.id}" data-action="remove">Remove</button>
            </td>
        `;

        
        productsTable.appendChild(row);
    });
}

// Function to refresh the sellers table
function refreshSellersTable() {
    const sellersTable = document.getElementById('sellerDataTable').getElementsByTagName('tbody')[0];
    const sellerData = Seller.getSeller();
    sellersTable.innerHTML = '';
    sellerData.forEach(seller => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <th scope="row">${seller.id}</th>
            <td>${seller.firstName} ${seller.lastName}</td>
            <td>${seller.email}</td>
            <td>${seller.contact}</td>
            <td>${seller.username}</td>
            <td>${seller.state}</td>
            <td>
                <button class="btn btn-outline-success btn-sm" type="button" data-id="${seller.id}" data-action="activate">Activate</button>
                <button class="btn btn-outline-warning btn-sm" type="button" data-id="${seller.id}" data-action="suspend">Suspend</button>
                <button class="btn btn-outline-primary btn-sm" type="button" data-id="${seller.id}" data-action="edit">Modify</button>
            </td>
        `;
        sellersTable.appendChild(row);
    });
}

// Function to refresh the users table
function refreshUsersTable() {
    const usersTable = document.getElementById('usersTable').getElementsByTagName('tbody')[0];
    const usersData = User.getCustomers();
    usersTable.innerHTML = '';
    usersData.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <th scope="row">${user.id}</th>
            <td>${user.firstName} ${user.lastName}</td>
            <td>${user.email}</td>
            <td>${user.contact}</td>
            <td>${user.username}</td>
            <td>${user.state}</td>
            <td>
                ${user.state === false ? `<button class="btn btn-outline-success btn-sm" type="button" data-id="${user.id}" data-action="activate">Activate</button>` : ''}
                ${user.state === true ? `<button class="btn btn-outline-warning btn-sm" type="button" data-id="${user.id}" data-action="suspend">Suspend</button>` : ''}
                <button class="btn btn-outline-primary btn-sm" type="button" data-id="${user.id}" data-action="edit">Modify</button>
                <button class="btn btn-outline-warning btn-sm" type="button" data-id="${user.id}" data-action="resetpass">Reset Password</button>
            </td>
        `;
        usersTable.appendChild(row);
    });
}

// Function to refresh the support table
function refreshSupportTable() {
    const supportTable = document.getElementById('supportTable').getElementsByTagName('tbody')[0];
    const supportData = SupportRequest.getSupportRequests();
    supportTable.innerHTML = '';
    supportData.forEach(request => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <th scope="row">${request.id}</th>
            <td>${request.fullName}</td>
            <td>${request.emailAddress}</td>
            <td>${request.subject}</td>
            <td>${(request.state === "Reopened") ? request.ReOpenRemarks : request.message}</td>
            <td>${request.state}</td>
            <td>
                ${(request.state === "Opened" || request.state === "Reopened") ? `<button class="btn btn-outline-success btn-sm" type="button" data-id="${request.id}" data-action="resolve">Resolve</button>` : ''}
            </td>
        `;
        supportTable.appendChild(row);
    });
}

// Function to refresh the rejected sellers table
function refreshRejectedSellerTable() {
    const rejectedSellerRequestsTable = document.getElementById('RejectedSellerRequests').getElementsByTagName('tbody')[0];
    const rejectedSellerRequests = Seller.getRejectedSellerRequests();
    rejectedSellerRequestsTable.innerHTML = '';
    rejectedSellerRequests.forEach(request => {
        const row = document.createElement('tr');
        const adminName = AdminModel.getAdminById(request.rejectedBy);
        row.innerHTML = `
            <th scope="row">${request.id}</th>
            <td>${request.firstName} ${request.lastName}</td>
            <td>${request.email}</td>
            <td>${request.contact}</td>
            <td>${request.username}</td>
            <td>${adminName.username}</td>
            <td>${request.date}</td>
            <td>
                <button class="btn btn-outline-success btn-sm" type="button" data-id="${request.id}" data-action="approve">Approve</button>
            </td>
        `;
        rejectedSellerRequestsTable.appendChild(row);
    });
}

// Function to render seller requests table
function renderSellerRequestsTable() {
    const sellerRequestsTable = document.getElementById('sellerRequestsTable').getElementsByTagName('tbody')[0];
    const sellerRequests = Seller.getSellerRequests();
    sellerRequestsTable.innerHTML = '';
    sellerRequests.forEach(request => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <th scope="row">${request.id}</th>
            <td>${request.firstName} ${request.lastName}</td>
            <td>${request.email}</td>
            <td>${request.contact}</td>
            <td>${request.username}</td>
            <td>${request.date}</td>
            <td>
                <button class="btn btn-outline-success btn-sm" type="button" data-id="${request.id}" data-action="approve">Approve</button>
                <button class="btn btn-outline-danger btn-sm" type="button" data-id="${request.id}" data-action="reject">Reject</button>
            </td>
        `;
        sellerRequestsTable.appendChild(row);
    });
}


  // Function to refresh the product images container
  function refreshProductImages(images,id) {
    const imagesContainer = $('#productImagesContainer');
    imagesContainer.empty();
    images.forEach((image, index) => {
      const imgElement = $(`
        <div class="image-wrapper m-2 position-relative">
          <img src="${image}" class="img-thumbnail" style="width: 100px; height: 100px;">
          <button type="button" class="btn btn-danger btn-sm delete-image-btn position-absolute" data-index="${index}" data-product="${id}" style="top: 0; right: 0;">
            &times;
          </button>
        </div>
      `);
      imagesContainer.append(imgElement);
    });
  }

// Function to reset user password
function resetUserPass(id) {
    const user = User.getUserById(id);
    user.password = '123456Aa@';
    User.updateUserData(id, user);
}

function getCurrentFormattedDate() {
    const now = new Date();

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); 
    const year = now.getFullYear();

    return `${hours}:${minutes}/${day}/${month}/${year}`;
}


function filterTable(tableId, searchTerm) {
    const table = document.getElementById(tableId);
    const rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    const term = searchTerm.toLowerCase();

    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const cells = row.getElementsByTagName('td');
        let match = false;

        for (let j = 0; j < cells.length; j++) {
            if (cells[j]) {
                const cellText = cells[j].textContent || cells[j].innerText;
                if (cellText.toLowerCase().indexOf(term) > -1) {
                    match = true;
                    break;
                }
            }
        }

        row.style.display = match ? '' : 'none';
    }
}

// Function to handle theme toggle
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        if (document.body.classList.contains('dark-theme')) {
            button.classList.add('btn-outline');
        } else {
            button.classList.remove('btn-outline');
        }
    });
}


document.addEventListener('DOMContentLoaded', function() {



if (window.location.pathname === '/Views/adminPanel.html' || window.location.pathname === '/views/adminpanel') {

            // Initialize charts and tables
            initCharts();
            initTables();


        // Add event listeners for search input and edit forms
        document.getElementById('sellerSearch').addEventListener('input', function() {
            filterTable('sellerDataTable', this.value);
        });

        document.getElementById('userSearch').addEventListener('input', function() {
            filterTable('usersTable', this.value);
        });

        document.getElementById('productSearch').addEventListener('input', function() {
            filterTable('productsTable', this.value);
        });


        document.getElementById('editSellerForm').addEventListener('submit', handleEditSellerFormSubmit);
        document.getElementById('editUserForm').addEventListener('submit', handleEditUserFormSubmit);
        document.getElementById('editProductModal').addEventListener('submit', handleEditProductFormSubmit);

        // Add event listeners for theme toggle
        // document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    }

        function initCharts() {
        // Initialize charts
        const ctx = document.getElementById('myChart');
        const CountofCustomers = AdminController.getCountofCustomers();
        const CountofSellers = AdminController.getCountofSellers();
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Customers', 'Sellers'],
                datasets: [{
                    label: 'Count',
                    data: [CountofCustomers, CountofSellers],
                    backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)'],
                    hoverOffset: 4
                }]
            }
        });

        const pendingSellersReqsChart = document.getElementById('pendingReq');
        const CountofRejectedReqs = Seller.getRejectedSellerRequests().length;
        
        new Chart(pendingSellersReqsChart, {
            type: 'doughnut',
            data: {
              labels: ['Rejected', 'Sellers'],
              datasets: [{
                label: ' Users segregation',
                data: [CountofRejectedReqs, CountofSellers],
                borderWidth: 1
              }]
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true
                },
      
              }
            }
          });
    
    
          const countOfOpenReqs = SupportRequest.getCountOfOpened();
          const countOfClosedReqs = SupportRequest.getCountOfClosed();
          const pendingSupReqChart = document.getElementById('pendingSupReq');
    
          new Chart(pendingSupReqChart, {
            type: 'doughnut',
            data: {
              labels: ['Opened', 'Closed'],
              datasets: [{
                label: ' Support Requests segregation',
                data: [countOfOpenReqs, countOfClosedReqs],
                borderWidth: 1
              }]
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true
                },
      
              }
            }
          });
    }



    function initTables() {
        // Initialize tables
        refreshProductsTable();
        refreshSellersTable();
        refreshUsersTable();
        refreshSupportTable();
        refreshRejectedSellerTable();
        renderSellerRequestsTable();
    }

    function handleEditSellerFormSubmit(event) {
        event.preventDefault();
        // Handle edit seller form submission
        const id = parseInt(document.getElementById('editSellerId').value);
        const updatedSeller = {
            firstName: document.getElementById('editSellerFirstName').value,
            lastName: document.getElementById('editSellerLastName').value,
            email: document.getElementById('editSellerEmail').value,
            contact: document.getElementById('editSellerContact').value,
            username: document.getElementById('editSellerUsername').value,
            
        };

    
        Seller.updateSeller(id,updatedSeller);
        
        refreshSellersTable();
        $('#editSellerModal').modal('hide');
    }

    function handleEditUserFormSubmit(event) {
        event.preventDefault();
        // Handle edit user form submission
        const id = parseInt(document.getElementById('editUserId').value);
        const updatedUser = {
            firstName: document.getElementById('editUserFirstName').value,
            lastName: document.getElementById('editUserLastName').value,
            email: document.getElementById('editUserEmail').value,
            contact: document.getElementById('editUserContact').value,
            username: document.getElementById('editUserUsername').value,
            
        };
        User.updateUserData(id, updatedUser);
        refreshUsersTable();
        $('#editUserModal').modal('hide');
    }
});

function handleDeleteProductImage(){
        const productID = $(this).data('product');
        const imageIndex = $(this).data('index');
        const product = Product.getProductById(productID);
        product.images.splice(imageIndex, 1);
        Product.updateProduct(product);
        refreshProductImages(product.images,productID)
        
}

function handleEditProductFormSubmit(event){
    event.preventDefault();
    
    const id = parseInt(document.getElementById('editProductId').value);
    const product = Product.getProductById(id);
    product.category = document.getElementById('editProductCategory').value;
    product.description = document.getElementById('editProductDescription').value;
    product.name = document.getElementById('editProductName').value;
    product.price = document.getElementById('editProductPrice').value;
    product.stock = document.getElementById('editProductStock').value;

    Product.updateProduct(product);
    refreshProductsTable();
    $('#editProductModal').modal('hide');
}

// Function to handle approve and reject actions for seller requests
function handleSellerRequestAction(event) {
    const target = event.target;
    const id = parseInt(target.getAttribute('data-id'));
    const action = target.getAttribute('data-action');

    if (action === 'approve') {
        const approvalDate = getCurrentFormattedDate();
        Seller.approveSellerRequest(id,approvalDate);
        renderSellerRequestsTable();
        refreshRejectedSellerTable();
        refreshSellersTable();
    } else if (action === 'reject') {
        const rejectionDate = getCurrentFormattedDate();
        const modal = new bootstrap.Modal(document.getElementById('Rejection_Reason'));
        modal.show();

        // Add an event listener to the modal's confirm button
        const confirmButton = document.getElementById('confirmRejectionButton');
        
        // Check if the button exists
        if (confirmButton) {
            confirmButton.addEventListener('click', function() {
                const rejectionReason = document.getElementById("rejectionReasoninput").value;
                Seller.rejectSellerRequest(id, rejectionReason,rejectionDate );
                
                // Close the modal after rejection
                modal.hide();
                
                // Refresh tables after rejection
                renderSellerRequestsTable();
                refreshRejectedSellerTable();
                refreshSellersTable();
            }, { once: true }); // Ensure the event listener is added only once
        } 
    }
}


function handleRejectedSellerRequests (event){
    const target = event.target;
    const approvalDate = getCurrentFormattedDate();
    const id = parseInt(target.getAttribute('data-id'));
    const requestData = Seller.getRejectedSellerRequestByID(id);
    Seller.approveRejectedSellerRequest(requestData, approvalDate);
    refreshRejectedSellerTable();
    refreshSellersTable();

}




// Function to handle approve, suspend, and edit actions for sellers
function handleSellerAction(event) {
    const target = event.target;
    const id = parseInt(target.getAttribute('data-id'));
    const action = target.getAttribute('data-action');
    
    if (action === 'activate') {
        Seller.activateSeller(id);
    } else if (action === 'suspend') {
        Seller.suspendSeller(id);
    } else if (action === 'edit') {
        // Populate the edit form with seller data
        const seller = Seller.getSellerById(id);
        
        document.getElementById('editSellerId').value = seller.id;
        document.getElementById('editSellerFirstName').value = seller.firstName;
        document.getElementById('editSellerLastName').value = seller.lastName;
        document.getElementById('editSellerEmail').value = seller.email;
        document.getElementById('editSellerContact').value = seller.contact;
        document.getElementById('editSellerUsername').value = seller.username;

        $('#editSellerModal').modal('show');
    }
    
    refreshSellersTable();
}

// Function to handle activate, suspend, edit, and reset password actions for users
function handleUserAction(event) {
    const target = event.target;
    const id = parseInt(target.getAttribute('data-id'));
    const action = target.getAttribute('data-action');
    
    if (action === 'activate') {
        User.activateUser(id);
        refreshUsersTable();
    } else if (action === 'suspend') {
        User.suspendUser(id);
        refreshUsersTable();
    } else if (action === 'edit') {
        // Populate the edit form with user data
        const user = User.getUserById(id);
        
        document.getElementById('editUserId').value = user.id;
        document.getElementById('editUserFirstName').value = user.firstName;
        document.getElementById('editUserLastName').value = user.lastName;
        document.getElementById('editUserEmail').value = user.email;
        document.getElementById('editUserContact').value = user.contact;
        document.getElementById('editUserUsername').value = user.username;
        
  
        $('#editUserModal').modal('show');
    } else if (action === 'resetpass') {
        resetUserPass(id);
    }
    
    refreshUsersTable();
}

function handleProductsAction(event){
    const target = event.target;
    const id = parseInt(target.getAttribute('data-id'));
    const action = target.getAttribute('data-action');
    

    if (action === 'edit') {
        const product = Product.getProductById(id);

        document.getElementById('editProductId').value= product.id;
        document.getElementById('editProductDescription').value = product.description;
        document.getElementById('editProductPrice').value = product.price;
        document.getElementById('editProductStock').value = product.stock;
        document.getElementById('editProductCategory').value = product.category;
        document.getElementById('editProductName').value = product.name;
        const imagesContainer = $('#productImagesContainer');
        imagesContainer.empty();
        const productImages = product.images;
        refreshProductImages(productImages,id);
        $('#productImagesContainer').on('click', '.delete-image-btn',handleDeleteProductImage);
        $('#editProductModal').modal('show');
        
    }else if (action === 'remove'){

        //deleteProduct(id)

        $('#Delete_Product').modal('show');
        const confirmButton = document.getElementById('confirmDeleteButton');

        if (confirmButton) {
            confirmButton.addEventListener('click', function() {
                Product.deleteProduct(id);
                $('#Delete_Product').modal('hide');
                refreshProductsTable();
            }, { once: true }); // Ensure the event listener is added only once
        } 


    }
}

// Function to handle resolve action for support requests
function handleSupportRequestAction(event) {
    const target = event.target;
    const id = parseInt(target.getAttribute('data-id'));
    const action = target.getAttribute('data-action');
    
    if (action === 'resolve') {

        const resolveDate = getCurrentFormattedDate();
        const modal = new bootstrap.Modal(document.getElementById('Resolve_Reason'));
        modal.show();

        // Add an event listener to the modal's confirm button
        const confirmButton = document.getElementById('confirmResolveButton');

                
                if (confirmButton) {
                    confirmButton.addEventListener('click', function() {
                        const resolveRemarks = document.getElementById("Resolve_Reasoninput").value;

                         SupportRequest.closeRequest(id,resolveRemarks,resolveDate)
                        
                        // Close the modal after resolve
                        modal.hide();
                        
                        // Refresh tables after resolve
                        refreshSupportTable();
                    }, { once: true }); // Ensure the event listener is added only once
                } 

    }
    
    refreshSupportTable();
}

document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners for table action buttons
    document.getElementById('sellerRequestsTable').addEventListener('click', handleSellerRequestAction);
    document.getElementById('RejectedSellerRequests').addEventListener('click', handleRejectedSellerRequests);
    document.getElementById('sellerDataTable').addEventListener('click', handleSellerAction);
    document.getElementById('usersTable').addEventListener('click', handleUserAction);
    document.getElementById('productsTable').addEventListener('click', handleProductsAction);
    document.getElementById('supportTable').addEventListener('click', handleSupportRequestAction);
});

