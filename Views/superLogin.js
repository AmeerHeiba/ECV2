document.addEventListener('DOMContentLoaded', function(){

    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', function(event){
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const super_adminData = JSON.parse(localStorage.getItem('super_admin'))[0];
        if (username === super_adminData.username && password === super_adminData.password) {
            AuthController.setCurrentUser(super_adminData);
            window.location.href = 'superadminPanel.html';

        }else{
            alert('Wrong User Name Or Password!!')
        }

    });


});