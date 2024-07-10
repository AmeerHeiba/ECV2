
class User {
    constructor(id, username, password, email, role, firstName,lastName,contact, addresses) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.role = role; // 'customer', 'seller', 'admin'
        this.firstName = firstName;
        this.lastName=lastName;
        this.contact = contact;
        this.addresses = addresses;
        this.state = true;
        this.cart = []; // Array of objects
        this.paymentInfo = {}, // card#,cardName,ExpirySDate,cvv
        this.wishList=[]
    }

    static getUsers() {
        return JSON.parse(localStorage.getItem('users')) || [];
    }

    static getCustomers(){
        return JSON.parse(localStorage.getItem('users')).filter(seller => seller.role === 'customer') || [];
    }

    static saveUsers(users) {
        localStorage.setItem('users', JSON.stringify(users));
    }

    static addUser(user) {
        const users = User.getUsers();
        users.push(user);
        User.saveUsers(users);
    }


    static authenticate(username, password) {
        const users = User.getUsers();
        return users.find(user => user.username === username && user.password === password);
    }



    
}
