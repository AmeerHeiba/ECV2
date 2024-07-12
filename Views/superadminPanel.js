function removeAdmin(id){

    const admins = AdminModel.getAdmins();
    let index = admins.findIndex(obj => obj.id === id);
    if (index !== -1) {
        admins.splice(index, 1);
    }

    AdminModel.saveAdmins(admins);


}

document.addEventListener('DOMContentLoaded', function() {

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