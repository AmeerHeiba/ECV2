document.addEventListener('DOMContentLoaded', function() {

    if (window.location.pathname === '/Views/superadminPanel.html') {

        // checkAccess(['super_admin']); // only accessable to super admins 

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
                    <button class="btn btn-success btn-sm" type="button" data-id="${admin.id}" data-action="approve">Delete</button>
                    <button class="btn btn-danger btn-sm" type="button" data-id="${admin.id}" data-action="reject">Suspend</button>
                </td>
            `;
            adminsTable.appendChild(row);
        });

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