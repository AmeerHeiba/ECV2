class Seller {
    constructor(id, username, password, email, firstName,lastName,contact, addresses, date, approvedBy) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.role = 'seller'; // 'customer', 'seller', 'admin'
        this.firstName = firstName;
        this.lastName = lastName; 
        this.contact = contact;
        this.addresses = addresses;
        this.state = true;
        this.date = date;
        this.approvedBy = approvedBy;
        // this.image = image; 
        
    }

    static getSeller() {
        return JSON.parse(localStorage.getItem('users')).filter(seller => seller.role === 'seller') || [];
    }

    static getRejectedSellerRequests() {
        const rejected =  localStorage.getItem('rejectedsellersRequests');
        return rejected ? JSON.parse(rejected) : [];
    }

    static getRejectedSellerRequestByID(id) {
        const rejected =  this.getRejectedSellerRequests()
        return rejected.find(seller =>seller.id === id);
    }

    static getSellerRequests() {
        const sellerRequests = localStorage.getItem('sellersRequests');
        return sellerRequests ? JSON.parse(sellerRequests) : [];
    }

    static getSellerRequestById(id){
        const sellers = this.getSellerRequests();
        return sellers.find(seller =>seller.id === id);
    }

    static saveRejectedSellerRequests(sellerRequests){

        localStorage.setItem('rejectedsellersRequests', JSON.stringify(sellerRequests));

    }

    static addSellerRequestToRejected(sellersRequest){

        // localStorage.setItem('rejectedsellersRequests', JSON.stringify(sellersRequest));
        const rejectedRequests = this.getRejectedSellerRequests()
        rejectedRequests.push(sellersRequest);
        this.saveRejectedSellerRequests(rejectedRequests)

    }

    // static saveSellers(sellers) {
    //     localStorage.setItem('users', JSON.stringify(sellers));
    // }

    static removeSellerRequest(id){

        const sellersRequests = this.getSellerRequests();
        let index = sellersRequests.findIndex(obj => obj.id === id);
        if (index !== -1) {
            sellersRequests.splice(index, 1);
        }

        Seller.saveSellersRequests(sellersRequests)
  

    }

    static removeRejectedSellerRequest(id){

        const sellersRequests = this.getRejectedSellerRequests();
        let index = sellersRequests.findIndex(obj => obj.id === id);
        if (index !== -1) {
            sellersRequests.splice(index, 1);
        }

        this.saveRejectedSellerRequests(sellersRequests);
  

    }

    static saveSellersRequests(sellersRequests){

        localStorage.setItem('sellersRequests', JSON.stringify(sellersRequests));

    }

    static addSeller(seller) {
        const users = User.getUsers();
        users.push(seller);
        User.saveUsers(users);
    }

    static authenticate(username, password) {
        const sellers = Seller.getSeller();
        return sellers.find(seller =>seller.role === 'seller'&& seller.username === username && seller.password === password);
    }
// register a seller account request to be validated by the available admin then to be approved or rejected 
    static requestAccount(sellerRequest){

        const sellersRequests = Seller.getSellerRequests();
        sellersRequests.push(sellerRequest)
        Seller.saveSellersRequests(sellersRequests)

    }


    static updateSeller(updatedSeller) {
        const sellers = this.getSeller();
        const index = sellers.findIndex(s => s.id == updatedSeller.id);
        if (index !== -1) {
            sellers[index] = updatedSeller;
            localStorage.setItem('users', JSON.stringify(sellers));
        }
    }

    
}
