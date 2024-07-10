const adminLoginForm = document.getElementById('admin-Login-form');
    
if (adminLoginForm) {

    adminLoginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        AdminController.adminLogin(username,password);

    });
}