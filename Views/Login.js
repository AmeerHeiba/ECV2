
const loginForm = document.getElementById('login-form');
    
if (loginForm) {
    // Store the clicked button's value
    let clickedButtonValue = null;

    // Add event listeners to the submit buttons to capture their value
    const submitButtons = loginForm.querySelectorAll('button[type="submit"]');
    submitButtons.forEach(button => {
        button.addEventListener('click', function () {
            clickedButtonValue = this.value;
        });
    });

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        

        const formData = new FormData(this);
        formData.append('submitBtn', clickedButtonValue); 

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        console.log('Submit button value:', clickedButtonValue);

        if (clickedButtonValue === 'userLogin') {
            
            AuthController.customerLogin(username, password);
        } else if (clickedButtonValue === 'sellerLogin') {
            
            AuthController.sellerLogin(username, password);
        }
    });
}