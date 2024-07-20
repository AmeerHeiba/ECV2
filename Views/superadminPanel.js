function removeAdmin(id) {
  const admins = AdminModel.getAdmins();
  const index = admins.findIndex(obj => obj.id === id);
  if (index !== -1) {
    admins.splice(index, 1);
    AdminModel.saveAdmins(admins);
  }
}

function renderAdminTable(adminsTable, allAdmins) {
  adminsTable.innerHTML = ''; // Clear existing rows
  allAdmins.forEach(admin => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <th scope="row">${admin.id}</th>
      <td>${admin.fullName}</td>
      <td>${admin.email}</td>
      <td>${admin.contact}</td>
      <td>${admin.username}</td>
      <td>
        <button class="btn btn-danger btn-sm" type="button" data-id="${admin.id}" data-action="delete">Delete</button>
        <button class="btn btn-primary btn-sm" type="button" data-id="${admin.id}" data-action="resetpass">Reset Password</button>
      </td>
    `;
    adminsTable.appendChild(row);
  });
}

function setupAdminTableActions(adminsTable) {
  adminsTable.addEventListener('click', function(event) {
    event.preventDefault();
    if (event.target && event.target.classList.contains('btn')) {
      const adminId = parseInt(event.target.getAttribute('data-id'));
      const requestAction = event.target.getAttribute('data-action');
      if (requestAction === 'delete') {
        removeAdmin(adminId);
      } else if (requestAction === 'resetpass') {
        const adminData = AdminModel.getAdminById(adminId);
        adminData.password = '123456Aa@';
        AdminModel.updateAdminDetails(adminId, adminData);
      }
    }
  });
}

function setupAddAdminForm(addAdminForm) {
  addAdminForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const adminName = document.getElementById('admin-name').value;
    const adminEmail = document.getElementById('admin-email').value;
    const adminPassword = document.getElementById('admin-password').value;
    const adminUser = document.getElementById('admin-user').value;
    const adminContact = document.getElementById('admin-contact').value;
    AdminController.registerAdmin(adminUser, adminPassword, adminEmail, 'admin', adminContact, adminName);
    this.reset();
  });
}

function createChart(ctx, labels, data, label) {
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [{
        label: label,
        data: data,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  const ctx = document.getElementById('myChart');
  const CountofCustomers = AdminController.getCountofCustomers();
  const CountofSellers = AdminController.getCountofSellers();
  createChart(ctx, ['Customers', 'Sellers'], [CountofCustomers, CountofSellers], 'Users segregation');

  const pendingSellersReqsChart = document.getElementById('pendingReq');
  const CountofRejectedReqs = Seller.getRejectedSellerRequests().length;
  createChart(pendingSellersReqsChart, ['Rejected', 'Sellers'], [CountofRejectedReqs, CountofSellers], 'Users segregation');

  const pendingSupReqChart = document.getElementById('pendingSupReq');
  const countOfOpenReqs = SupportRequest.getCountOfOpened();
  const countOfClosedReqs = SupportRequest.getCountOfClosed();
  createChart(pendingSupReqChart, ['Opened', 'Closed'], [countOfOpenReqs, countOfClosedReqs], 'Support Requests segregation');

  if (window.location.pathname === '/Views/superadminPanel.html') {
    const adminsTable = document.getElementById('adminsTable').getElementsByTagName("tbody")[0];
    const allAdmins = AdminController.getAllAdmins();
    renderAdminTable(adminsTable, allAdmins);
    setupAdminTableActions(adminsTable);

    const addAdminForm = document.getElementById('add-admin-form');
    if (addAdminForm) {
      setupAddAdminForm(addAdminForm);
    }
  }
});
