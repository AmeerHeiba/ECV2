class AdminModel {
    constructor(id, username, password, email, role, contact, fullName) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.role = role; //'admin'
        this.contact= contact;
        this.fullName = fullName;
        this.state = true;
    }


    static getAdmins() {
        return JSON.parse(localStorage.getItem('admins')) || [];
    }

    static saveAdmins(admins) {
        localStorage.setItem('admins', JSON.stringify(admins));
    }

    static addAdmin(admin) {
        const admins = AdminModel.getAdmins();
        admins.push(admin);
        AdminModel.saveAdmins(admins);
    }

    static authenticateAdmin(username, password) {
        const admins = AdminModel.getAdmins();
        return admins.find(admin => admin.username === username && admin.password === password);
    }

    static getAdminById(id){
        const admins = AdminModel.getAdmins();
        return admins.find(admin => admin.id === id);
    }

    static updateAdminDetails(adminId, newDetails) {
        const admins = this.getAdmins();
        const adminIndex = admins.findIndex((admin) => admin.id === adminId);
    
        if (adminIndex !== -1) {
            admins[adminIndex] = { ...admins[adminIndex], ...newDetails };
          this.saveAdmins(admins);
          alert("Account details updated successfully.");
        } else {
          alert("User not found.");
        }
      }
}
