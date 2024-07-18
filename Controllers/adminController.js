class AdminController {






    static registerAdmin(adminUser,adminPassword,adminEmail,role='admin',adminContact,adminName){


    const modal = new CustomModal();
    // Validation
    const errors = [];

        if (!adminUser) errors.push("Username is required.");
        if ((AdminModel.getAdmins().find((A) => A.username === adminUser))) errors.push("Username is already used.");
        if (!adminPassword || adminPassword.length < 6) errors.push("Password is required and must be at least 6 characters.");
        if (!adminEmail || !/\S+@\S+\.\S+/.test(adminEmail)) errors.push("Valid email is required.");
        if ((AdminModel.getAdmins().find((A) => A.email === adminEmail))) errors.push("Email is already used.");
        
        if (errors.length > 0) {
            
            modal.showCustomModal(
              'Validation Error',
              errors.join("\n"),
              'OK',
              'Cancel',
              () => { console.log('User confirmed the error modal'); },
              () => { console.log('User canceled the error modal'); }
            );
            return;
          }
            const newAdmin = new AdminModel(AdminController.getAllAdmins().length +1,adminUser,adminPassword,adminEmail,role,adminContact,adminName);
            AdminModel.addAdmin(newAdmin);
            
            modal.showCustomModal(
              'Success',
              "Admin was added",
              'OK',
              'Cancel',
              () => { console.log('User confirmed the error modal'); },
              () => { console.log('User canceled the error modal'); }
            );

        


    }


    static adminLogin(username, password) {
        const admin = AdminModel.authenticateAdmin(username, password);
        if (admin) {
            AuthController.setCurrentUser(admin);
            window.location.href = 'adminPanel.html';
        } else {
            alert('Invalid username or password');
        }
    }

    static getAllAdmins(){
        return AdminModel.getAdmins();
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
