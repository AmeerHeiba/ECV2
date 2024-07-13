function refreshProductsTable() {
    const productData = Product.getProducts(); // TO BE HANDLED 
    // const productData = JSON.parse(localStorage.getItem('products'));
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
            </td>
        `;
        productsTable.appendChild(row);
    });
}


function refreshSellersTable() {
    const sellersTable = document.getElementById('sellerDataTable').getElementsByTagName("tbody")[0];
    const sellerData = Seller.getSeller();
    
    sellersTable.innerHTML = ''; // Clear existing rows
    sellerData.forEach(seller => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <th scope="row">${seller.id}</th>
            <td>${seller.firstName + " " + seller.lastName}</td>
            <td>${seller.email}</td>
            <td>${seller.contact}</td>
            <td>${seller.username}</td>
            <td>${seller.state}</td>
            
            <td>
                <button class="btn btn-outline-success  btn-sm" type="button" data-id="${seller.id}" data-action="activate">Activate</button>
                <button class="btn btn-outline-warning btn-sm" type="button" data-id="${seller.id}" data-action="suspend">Suspend</button>
                <button class="btn btn-outline-primary btn-sm" type="button" data-id="${seller.id}" data-action="edit">Modify</button>
            </td>
        `;
        sellersTable.appendChild(row);
    });
}


function refreshUsersTable() {
    const usersTable = document.getElementById('usersTable').getElementsByTagName("tbody")[0];
    const usersData = Seller.getSeller();
    
    usersTable.innerHTML = ''; // Clear existing rows
    usersData.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <th scope="row">${user.id}</th>
            <td>${user.firstName + " " + user.lastName}</td>
            <td>${user.email}</td>
            <td>${user.contact}</td>
            <td>${user.username}</td>
            <td>${user.state}</td>
            
            <td>
                ${user.state === false ? `<button class="btn btn-outline-success btn-sm" type="button" data-id="${user.id}" data-action="activate">Activate</button>` : ''} 
                ${user.state === true ? `<button class="btn btn-outline-warning btn-sm" type="button" data-id="${user.id}" data-action="suspend">Suspend</button>` : ''}
                <button class="btn btn-outline-primary  btn-sm" type="button" data-id="${user.id}" data-action="edit">Modify</button>
                <button class="btn btn-outline-warning  btn-sm" type="button" data-id="${user.id}" data-action="resetpass">Reset Password</button>
            </td>
        `;
        usersTable.appendChild(row);
    });
}

function refreshSupportTable() {
    const supportTable = document.getElementById('supportTable').getElementsByTagName("tbody")[0];
    const supportData = SupportRequest.getSupportRequests();
    
    supportTable.innerHTML = ''; // Clear existing rows
    supportData.forEach(request => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <th scope="row">${request.id}</th>
            <td>${request.fullName}</td>
            <td>${request.emailAddress}</td>
            <td>${request.subject}</td>
            <td>${request.message}</td>
            <td>${request.state}</td>
            <td>
                ${request.state === "Opened" ? `<button class="btn btn-outline-success btn-sm" type="button" data-id="${request.id}" data-action="resolve">Resolve</button>` : ''}
            </td>
        `;
        supportTable.appendChild(row);
    });
}
function refreshRejectedSellerTable() {

    const rejectedSellerRequestsTable = document.getElementById('RejectedSellerRequests').getElementsByTagName("tbody")[0];
    const rejectedSellerRequests = Seller.getRejectedSellerRequests();
    rejectedSellerRequestsTable.innerHTML = ''; // Clear existing rows
    rejectedSellerRequests.forEach(request => {
        const row = document.createElement('tr');
        console.log(request)
        const adminName = AdminModel.getAdminById(request.rejectedBy);
        row.innerHTML = `
            <th scope="row">${request.id}</th>
            <td>${request.firstName + " "+ request.lastName}</td>
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

function renderSellerRequestsTable(){
    const sellerRequestsTable = document.getElementById('sellerRequestsTable').getElementsByTagName("tbody")[0];
    const sellerRequests = Seller.getSellerRequests();
    sellerRequestsTable.innerHTML = ''; // Clear existing rows
    sellerRequests.forEach(request => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <th scope="row">${request.id}</th>
            <td>${request.firstName + " "+ request.lastName}</td>
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


function resetUserPass(id){
    const user = User.getUserById(id);
    user.password = '123456Aa@';
    User.updateUserData(id, user);

}







document.addEventListener('DOMContentLoaded', function() {
    
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
    
            if (match) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        }
    }



if (window.location.pathname === '/Views/adminPanel.html') {

    //charts

    const ctx = document.getElementById('myChart');
    const CountofCustomers = AdminController.getCountofCustomers();
    const CountofSellers = AdminController.getCountofSellers();
      
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Customers', 'Sellers'],
        datasets: [{
          label: ' Users segregation',
          data: [CountofCustomers, CountofSellers],
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


 
    
    const sellerRequestsTable = document.getElementById('sellerRequestsTable').getElementsByTagName("tbody")[0];
    const sellerRequests = Seller.getSellerRequests();
    sellerRequestsTable.innerHTML = ''; // Clear existing rows
    if(sellerRequests.length === 0  ){
        console.log('Empty')
        const emptyRow = document.createElement('tr');
        emptyRow.innerHTML=
        `        
        <tr>
            <td colspan="7">No Seller Requests available</td>
        </tr>`;
        sellerRequestsTable.appendChild(emptyRow);
    }else{
    sellerRequests.forEach(request => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <th scope="row">${request.id}</th>
            <td>${request.firstName + " "+ request.lastName}</td>
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
    document.querySelector('#sellerRequestsTable').addEventListener('click', function(event) {
        if (event.target && event.target.classList.contains('btn')) {
            const requestId = event.target.getAttribute('data-id');
            const requestAction = event.target.getAttribute('data-action');

            if (requestAction === 'approve') {
                const sellerRequestData = Seller.getSellerRequestById(parseInt(requestId));
                AdminController.approveSellerRequest(sellerRequestData);
                renderSellerRequestsTable()
            } else if (requestAction === 'reject') {
                const modal = new bootstrap.Modal(document.getElementById('Rejection_Reason'));
                modal.show();
                
                // Remove previous event listener to avoid duplication
                const saveBtn = document.getElementById("saveBtn");
                saveBtn.removeEventListener('click', handleSaveClick);
                saveBtn.addEventListener('click', handleSaveClick.bind(null, requestId));
                renderSellerRequestsTable()
            }
        }
    });

    function handleSaveClick(requestId) {
        const rejectionReason = document.getElementById("rejectionReasoninput").value;
        const sellerRequestData = Seller.getSellerRequestById(parseInt(requestId));
        AdminController.rejectSellerRequest(sellerRequestData, rejectionReason);

        // const recipientEmail = sellerRequestData.email; 

        // Sending email using SMTPJS


    }

    // Rejected Table

    const rejectedSellerRequestsTable = document.getElementById('RejectedSellerRequests').getElementsByTagName("tbody")[0];
    const rejectedSellerRequests = Seller.getRejectedSellerRequests();
    rejectedSellerRequestsTable.innerHTML = ''; // Clear existing rows
    if(rejectedSellerRequests.length === 0  ){
        
        const emptyRow = document.createElement('tr');
        emptyRow.innerHTML=
        `        
        <tr>
            <td colspan="8">No Seller Requests available</td>
        </tr>`;
        rejectedSellerRequestsTable.appendChild(emptyRow);
    }else{
    rejectedSellerRequests.forEach(request => {
        const row = document.createElement('tr');
        const adminName = AdminModel.getAdminById(request.rejectedBy);
        row.innerHTML = `
            <th scope="row">${request.id}</th>
            <td>${request.firstName + " "+ request.lastName}</td>
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
    });}
    rejectedSellerRequestsTable.addEventListener('click', function(event) {
        event.preventDefault();

        if (event.target && event.target.classList.contains('btn')) {

            const sellerId = parseInt(event.target.getAttribute('data-id'));
            const requestAction = event.target.getAttribute('data-action');
            
          
            if (requestAction === 'approve') {
                const sellerRequestData = Seller.getRejectedSellerRequestByID(sellerId);
                AdminController.approveRejectedSellerRequest(sellerRequestData);
            }
        }


    })

    const sellersTable = document.getElementById('sellerDataTable').getElementsByTagName("tbody")[0];
    const sellerData = Seller.getSeller();
    
    sellersTable.innerHTML = ''; // Clear existing rows
    sellerData.forEach(seller => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <th scope="row">${seller.id}</th>
            <td>${seller.firstName +" " + seller.lastName}</td>
            <td>${seller.email}</td>
            <td>${seller.contact}</td>
            <td>${seller.username}</td>
            <td>${seller.state}</td>
            
            <td>
                <button class="btn btn-outline-success btn-sm" type="button" data-id="${seller.id}" data-action="activate">Activate</button>
                <button class="btn btn-outline-warning btn-sm" type="button" data-id="${seller.id}" data-action="suspend">Suspend</button>
                <button class="btn btn-outline-primary btn-sm" type="button" data-id="${seller.id}" data-action="edit">Modify</button>
                <button class="btn btn-outline-warning btn-sm" type="button" data-id="${seller.id}" data-action="resetpass">Reset Password</button>
            </td>
        `;
        sellersTable.appendChild(row);
    });

    document.querySelector('#sellerDataTable').addEventListener('click', function(event) {
        if (event.target && event.target.classList.contains('btn')) {
            const sellerId = parseInt(event.target.getAttribute('data-id'));
            const requestAction = event.target.getAttribute('data-action');
            
          
            if (requestAction === 'activate') {
                
                UserController.setState(true, sellerId)
            }else if (requestAction === 'suspend'){
                UserController.setState(false, sellerId)
            } else if (requestAction === 'edit') {
                // Get the seller data
                const seller = sellerData.find(s => s.id === sellerId);
                // Populate the form
                document.getElementById('editSellerId').value = seller.id;
                document.getElementById('editSellerFirstName').value = seller.firstName;
                document.getElementById('editSellerLastName').value = seller.lastName;
                document.getElementById('editSellerEmail').value = seller.email;
                document.getElementById('editSellerContact').value = seller.contact;
                document.getElementById('editSellerUsername').value = seller.username;
                document.getElementById('editSellerState').value = seller.state;
                // Show the modal
                new bootstrap.Modal(document.getElementById('editSellerModal')).show();
            }else if(requestAction === 'resetpass'){
                resetUserPass(sellerId);
            }
        }

        
    });

    document.getElementById('sellerSearch').addEventListener('input', function() {
        filterTable('sellerDataTable', this.value);
    });

    document.getElementById('editSellerForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const id = document.getElementById('editSellerId').value;
        const updatedSeller = {
            id: parseInt(id),
            firstName: document.getElementById('editSellerFirstName').value,
            lastName: document.getElementById('editSellerLastName').value,
            email: document.getElementById('editSellerEmail').value,
            contact: document.getElementById('editSellerContact').value,
            username: document.getElementById('editSellerUsername').value,
            state: document.getElementById('editSellerState').value,
        };
    
        // Update the seller in the data store
        UserController.updateUserDetails(parseInt(id),updatedSeller);
    
        // Refresh the table
        refreshSellersTable();
    
        // Hide the modal
        new bootstrap.Modal(document.getElementById('editSellerModal')).hide();
    });




    
    const usersTable = document.getElementById('usersTable').getElementsByTagName("tbody")[0];
    const usersData = User.getCustomers();
    
    usersTable.innerHTML = ''; // Clear existing rows
    usersData.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <th scope="row">${user.id}</th>
            <td>${user.firstName +" " + user.lastName}</td>
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

    document.querySelector('#usersTable').addEventListener('click', function(event) {
        if (event.target && event.target.classList.contains('btn')) {
            const userId = parseInt(event.target.getAttribute('data-id'));
            const requestAction = event.target.getAttribute('data-action');
            
          
            if (requestAction === 'activate') {
                UserController.setState(true, userId);
                location.reload();
            }else if (requestAction === 'suspend'){
                UserController.setState(false, userId);
                location.reload();
            } else if (requestAction === 'edit') {
                // Get the seller data
                const user = usersData.find(s => s.id === userId);
                // Populate the form
                document.getElementById('editUserId').value = user.id;
                document.getElementById('editUserFirstName').value = user.firstName;
                document.getElementById('editUserLastName').value = user.lastName;
                document.getElementById('editUserEmail').value = user.email;
                document.getElementById('editUserContact').value = user.contact;
                document.getElementById('editUserUsername').value = user.username;
                document.getElementById('editUserState').value = user.state;
                // Show the modal
                new bootstrap.Modal(document.getElementById('editUserModal')).show();
                refreshUsersTable();
            }else if(requestAction === 'resetpass'){
                resetUserPass(userId);
                refreshUsersTable();
            }
        }


    });

    document.getElementById('userSearch').addEventListener('input', function() {
        filterTable('usersTable', this.value);
    });

    document.getElementById('editUserModal').addEventListener('submit', function(event) {
        event.preventDefault();
        const id = document.getElementById('editUserId').value;
        const updatedUser = {
            id: parseInt(id),
            firstName: document.getElementById('editUserFirstName').value,
            lastName: document.getElementById('editUserLastName').value,
            email: document.getElementById('editUserEmail').value,
            contact: document.getElementById('editUserContact').value,
            username: document.getElementById('editUserUsername').value,
            state: document.getElementById('editUserState').value,
        };
    
        // Update the seller in the data store
        UserController.updateUserDetails(parseInt(id),updatedUser);
    
        // Refresh the table
        refreshUsersTable();
    
        // Hide the modal
        new bootstrap.Modal(document.getElementById('editUserModal')).hide();
    });


    const supportTable = document.getElementById('supportTable').getElementsByTagName("tbody")[0];
    const supportData = SupportRequest.getSupportRequests();
    
    supportTable.innerHTML = ''; // Clear existing rows
    supportData.forEach(request => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <th scope="row">${request.id}</th>
            <td>${request.fullName}</td>
            <td>${request.emailAddress}</td>
            <td>${request.subject}</td>
            <td>${request.message}</td>
            <td>${request.state}</td>
            <td>
                ${request.state === "Opened" ? `<button class="btn btn-outline-success btn-sm" type="button" data-id="${request.id}" data-action="resolve">Resolve</button>` : ''}
            </td>
        `;
        supportTable.appendChild(row);
    });


    supportTable.addEventListener('click', function(event) {
        if (event.target && event.target.classList.contains('btn')) {
            const reqID = parseInt(event.target.getAttribute('data-id'));
            const requestAction = event.target.getAttribute('data-action');
            
          
            if (requestAction === 'resolve') {
               
                SupportRequest.closeRequest(reqID);
                refreshSupportTable();
            }
        }


    });

    const productsTable = document.getElementById('productsTable').getElementsByTagName("tbody")[0];
    const productData = Product.getProducts(); // Assuming getProducts() fetches all products
    // const productData = JSON.parse(localStorage.getItem('products'));

    productsTable.innerHTML = ''; // Clear existing rows
    productData.forEach(product => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <th scope="row">${product.id}</th>
        <td>${product.description}</td>
        <td><img src=${product.images[0]} alt="${product.name}" style="width: 50px; height: auto;"></td>
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td>${product.stock}</td>
        <td>${product.seller_id}</td>
        <td>
            <button class="btn btn-outline-warning btn-sm" type="button" data-id="${product.id}" data-action="edit">Edit</button>
            <button class="btn btn-outline-danger btn-sm" type="button" data-id="${product.id}" data-action="remove">Remove</button>
        </td>
    `;
    productsTable.appendChild(row);
});

// Add event listener for product actions
    document.querySelector('#productsTable').addEventListener('click', function(event) {
        if (event.target && event.target.classList.contains('btn')) {
            const productId = parseInt(event.target.getAttribute('data-id'));
            const requestAction = event.target.getAttribute('data-action');
            
            if (requestAction === 'edit') {
                // Get the product data
                const product = productData.find(p => p.id === productId);
                // Populate the form
                document.getElementById('editProductId').value = product.id;
                document.getElementById('editProductDescription').value = product.description;
                document.getElementById('editProductImage').value = product.images;
                document.getElementById('editProductName').value = product.name;
                document.getElementById('editProductPrice').value = product.price;
                document.getElementById('editProductStock').value = product.stock;
                document.getElementById('editProductSellerId').value = product.seller_id;
                // Show the modal
                new bootstrap.Modal(document.getElementById('editProductModal')).show();
            }else if(requestAction === 'remove'){
                Product.deleteProduct(productId);
                refreshProductsTable()

            }
        }
    });

 

    document.getElementById('productSearch').addEventListener('input', function() {
        filterTable('productsTable', this.value);
    });
      // Add event listener for product form submission
        document.getElementById('editProductForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const id = document.getElementById('editProductId').value;
        const updatedProduct = {
            id: parseInt(id),
            description: document.getElementById('editProductDescription').value,
            image: document.getElementById('editProductImage').value,
            name: document.getElementById('editProductName').value,
            price: document.getElementById('editProductPrice').value,
            stock: document.getElementById('editProductStock').value,
            seller_id: document.getElementById('editProductSellerId').value,
        };

// Update the product in the data store
    ProductController.updateProductDetails(parseInt(id), updatedProduct);

// Refresh the table
    refreshProductsTable();

// Hide the modal
    new bootstrap.Modal(document.getElementById('editProductModal')).hide();
}); 


}
});

