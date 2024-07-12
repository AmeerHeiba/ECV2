function removeAdmin(id){

    const admins = AdminModel.getAdmins();
    let index = admins.findIndex(obj => obj.id === id);
    if (index !== -1) {
        admins.splice(index, 1);
    }

    AdminModel.saveAdmins(admins);


}

document.addEventListener('DOMContentLoaded', function() {

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


    if (window.location.pathname === '/Views/superadminPanel.html') {

        

        const adminsTable = document.getElementById('adminsTable').getElementsByTagName("tbody")[0];
        const allAdmins = AdminController.getAllAdmins();
        
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
                </td>
            `;
            adminsTable.appendChild(row);
        });

        adminsTable.addEventListener('click', function(event) {
            event.preventDefault();
    
            if (event.target && event.target.classList.contains('btn')) {
    
                const adminId = parseInt(event.target.getAttribute('data-id'));
                const requestAction = event.target.getAttribute('data-action');
                
              
                if (requestAction === 'delete') {
                    removeAdmin(adminId);
                 
                }
            }
    
    
        })

        const addAdminForm = document.getElementById('add-admin-form');
        if (addAdminForm) {
            addAdminForm.addEventListener('submit',function (event){
                event.preventDefault();
                const adminName = document.getElementById('admin-name').value;
                const adminEmail = document.getElementById('admin-email').value;
                const adminPassword = document.getElementById('admin-password').value;
                const adminUser = document.getElementById('admin-user').value;
                const adminContact = document.getElementById('admin-contact').value;

                AdminController.registerAdmin(adminUser,adminPassword,adminEmail,'admin',adminContact,adminName);
                this.reset();


            });//end of add admin form

            
        }


    }


});