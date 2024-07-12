
document.addEventListener('DOMContentLoaded', function() {

if (document.getElementById('registration-form')) {
    document.getElementById('registration-form').addEventListener('submit', (event) => {
        event.preventDefault();

        const form = event.target;
        const actionUrl = form.action; // Get the form action URL
        const urlObject = new URL(actionUrl);
        // Get the pathname
        const pathname = urlObject.pathname;
        // Extract the part after the last slash and before the first space or period
        const filename = pathname.split('/').pop().split('%20')[0].split('.')[0];
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const email = document.getElementById('email').value;
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const contact = document.getElementById('contact').value;
        const address1 = document.getElementById('address-1').value;
        const address2 = document.getElementById('address-2').value;
        const addresses = [address1, address2]

        // const role = document.getElementById('role').value;
       
        if (filename === 'sellerRegister') {

            //Validation 
            // user name not empty, not repeated, not 
            //Password validation
            //email correct and not repeated 
            if (AuthController.validateUsername(username) === false){
                alert('Invalid username. It should be 3-15 characters long and contain only alphanumeric characters and underscores.')
            }else if (AuthController.validatePassword(password) === false) {
                alert('Invalid password. It should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.')
            } else if (AuthController.validateEmail(email) === false) {
                alert('Invalid email format.')
            }else{
                AuthController.submitSellerRegRequest(username, password, email,firstName, lastName,contact,addresses);
            }
        }
        
    });
}

});