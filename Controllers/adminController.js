class AdminController {


    static approveSellerRequest(request){
        
        //addSeller(seller)
        const id = request.id;
        Seller.addSeller(request);
        Seller. removeSellerRequest(id);
    }
    static rejectSellerRequest(request,reason){
        const adminID = User.getCurrentUser().id;
        console.log(adminID)
        const targetUserID = request.id;
        const title = 'Rejected Account';
        // const reason = 'Test';
        const subject = `Dear Valued Customer your account was rejected due to ${reason}`;
        request.rejectedBy = adminID;
        Seller.addSellerRequestToRejected(request);
        notificationsController.sendNotification(targetUserID, adminID, title, subject);
        Seller.removeSellerRequest(request.id);

        location.reload();
    }

    static approveRejectedSellerRequest(request){

                //addSeller(seller)
                const id = User.getUsers().length+1;
                const addresses = request.addresses;
                const contact = request.contact;
                const firstName = request.firstName;
                const lastName = request.lastName;
                const username = request.username;
                const password = request.password;
                const email = request.email;
                const newUser = new User(id, username, password, email, 'seller', firstName,lastName,contact, addresses);
                User.addUser(newUser);
                Seller.removeRejectedSellerRequest(request.id);
                location.reload();

    }

    static registerAdmin(adminUser,adminPassword,adminEmail,role='admin',adminContact,adminName){

        console.log(adminName, adminContact, adminPassword, adminUser)
        if (this.validateAdminEmail(adminEmail) === false) {
            alert('Email already exist please try another one');
        }else if(this.validateAdminUsername(adminUser) === false){
            alert('User already exist please try another one');
        }else if(AuthController.validatePassword(adminPassword) === false){
            alert('Invalid password. It should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.')
        }else{

            const newAdmin = new AdminModel(AdminController.getAllAdmins().length +1,adminUser,adminPassword,adminEmail,role,adminContact,adminName);
            AdminModel.addAdmin(newAdmin);
            alert('Admin Added!');

        }


    }


    static adminLogin(username, password) {
        const admin = AdminModel.authenticateAdmin(username, password);
        console.log(admin)
        if (admin) {
            AuthController.setCurrentUser(admin);
            // localStorage.setItem('currentUser', JSON.stringify(user));
            window.location.href = 'adminPanel.html';
        } else {
            alert('Invalid username or password');
        }
    }

    static getAllAdmins(){
        return AdminModel.getAdmins();
    }

    static validateAdminUsername(username) {
        // Username should be between 3 and 15 characters and contain only alphanumeric characters and underscores
        const usernameRegex = /^[a-zA-Z0-9_]{3,15}$/;
        const users = AdminModel.getAdmins();
        const user = users.find(user => user.username === username);

        if(user){
            alert('duplicate user name')
            return false;
        };
        if (!usernameRegex.test(username)) {
            return false;
        }
        return true;
    }
    
    static validateAdminEmail(email) {
        // Basic email validation pattern
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const users = AdminModel.getAdmins();
        const user = users.find(user => user.email === email);

        if(user){
            alert('already regestered ')
            return false;
        };
        if (!emailRegex.test(email)) {
            // alert('Invalid email format.');
            return false;
        }
        return true;
    }


    static setState(newState, id){
        const users = AdminModel.getAdmins()
        const userIndex = users.findIndex(user => user.id === id);
        const newDetails = {state:newState};
      

        if (userIndex !== -1) {
            users[userIndex] = { ...users[userIndex], ...newDetails };
            AdminModel.saveAdmins(users);
            localStorage.setItem('currentUser', JSON.stringify(users[userIndex])); // Update current user data in localStorage
            alert('Account details updated successfully.');
        } else {
            alert('User not found.');
        }
    }

    static getCountofCustomers(){
        const users = User.getCustomers();
        return users.length;
    }

    static getCountofSellers(){
        const sellers = Seller.getSeller();
        return sellers.length;
    }
}
