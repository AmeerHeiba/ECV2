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
            const username = document.getElementById('usernameReg').value;
            const password = document.getElementById('passwordReg').value;
            const email = document.getElementById('emailReg').value;
            const firstName = document.getElementById('firstNameReg').value;
            const lastName = document.getElementById('lastNameReg').value;
            const contact = document.getElementById('contactReg').value;
            const addressName = document.getElementById('titleReg').value;
            const addressText = document.getElementById('addressReg').value;
            const city = document.getElementById('cityReg').value;
            const zipCode = document.getElementById('zipReg').value;
            const address = {
                id:1,
                title:addressName,
                address:addressText,
                city:city,
                zipCode:zipCode

            }
            const addresses = [address];

    if(filename === 'customerRegister'){

                // const email = document.getElementById('email').value;
        
                //Validation 
                // user name not empty, not repeated, not 
                //Password validation
                //email correct and not repeated 
                if (AuthController.validateUsername(username) === false){
                    document.getElementById('usernameError').innerText = 'Invalid username. It should be 3-15 characters long and contain only alphanumeric characters and underscores.';
                }else if (AuthController.validatePassword(password) === false) {
                    document.getElementById('passwordError').innerText = 'Invalid password. It should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.';
                } else if (AuthController.validateEmail(email) === false) {
                    document.getElementById('emailError').innerText = 'Invalid email format.';
                }else{
                    AuthController.register(username, password, email, 'customer', firstName,lastName,contact, addresses);
                }
            }
            
        });
    }

    });

