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

    // static getSeller() {
    //     return JSON.parse(localStorage.getItem('users')).filter(seller => seller.role === 'seller') || [];
    // }

    static getSeller() {
        return JSON.parse(localStorage.getItem('sellers'))|| [];
    }

    static saveSellers(sellers) {
        localStorage.setItem("sellers", JSON.stringify(sellers));
      }

    static getSellerById(id){
        const seller = this.getSeller();
        return seller.find(seller =>seller.id === id);
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

    
    static approveRejectedSellerRequest(request,approvalDate){
        request.approvalDate = approvalDate;
        const adminID = User.getCurrentUser().id;
        request.approvedBy = adminID;
        this.addSeller(request);
        Seller.removeRejectedSellerRequest(request.id);
       

}


    static addSeller(seller) {
        const sellers = this.getSeller();
        sellers.push(seller);
        this.saveSellers(sellers);
    }

    static authenticate(username, password) {
        
        const sellers = Seller.getSeller();
        return sellers.find(seller =>seller.role === 'seller'&& seller.username === username && Encryption.decrypt(seller.password) === password);
    }
// register a seller account request to be validated by the available admin then to be approved or rejected 
    static requestAccount(sellerRequest){

        const sellersRequests = Seller.getSellerRequests();
        sellersRequests.push(sellerRequest)
        Seller.saveSellersRequests(sellersRequests)

    }


    static updateSeller(sellerId, newDetails) {
        const sellers = this.getSeller();
        const sellerIndex = sellers.findIndex((sellers) => sellers.id === sellerId);
    
        if (sellerIndex !== -1) {
            sellers[sellerIndex] = { ...sellers[sellerIndex], ...newDetails };
            this.saveSellers(sellers);
          alert("Account details updated successfully.");
        } else {
          alert("User not found.");
        }
      }

    static approveSellerRequest(id, approvalDate){
        
        const sellerRequest = this.getSellerRequestById(id);
        const adminID = User.getCurrentUser().id;
        sellerRequest.approvedBy = adminID;
        sellerRequest.approvalDate = approvalDate;
        this.addSeller(sellerRequest);
        this. removeSellerRequest(id);
    }

    static rejectSellerRequest(id,reason, rejectionDate){

        const request = this.getSellerRequestById(id);
        const adminID = User.getCurrentUser().id;
        const targetUserID = request.id;
        const title = 'Rejected Account';
       
        const subject = `Dear Valued Customer your account was rejected due to ${reason}`;
        request.rejectedBy = adminID;
        request.rejectionDate = rejectionDate;
        Seller.addSellerRequestToRejected(request);
        notificationsController.sendNotification(targetUserID, adminID, title, subject);
        Seller.removeSellerRequest(request.id);

        
    }

       // Activate a seller by ID
    static activateSeller(id) {
        let sellers = this.getSeller();
        const sellerIndex = sellers.findIndex(s => s.id == id);
        if (sellerIndex !== -1) {
            sellers[sellerIndex].state = true;
            this.saveSellers(sellers);
        }
    }


           // Suspend a seller by ID
        static suspendSeller(id) {
            let sellers = this.getSeller();
            const sellerIndex = sellers.findIndex(s => s.id == id);
            if (sellerIndex !== -1) {
                sellers[sellerIndex].state = false;
                this.saveSellers(sellers);
            }
        }
    

    
}
