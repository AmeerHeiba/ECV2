class SupportRequest{
    constructor(id,fullName,emailAdress,phoneNumber,subject,message){
        this.id = id;
        this.fullName = fullName;
        this.emailAdress = emailAdress;
        this.phoneNumber = phoneNumber;
        this.subject = subject;
        this.message = message;
        this.state = "Opened";
    }

    static getSupportRequests(){

        return JSON.parse(localStorage.getItem('support')) || [];
    
    }
    
    static savesupportRequests(reqs) {
        localStorage.setItem('support', JSON.stringify(reqs));
    }
    
    static addsupportRequest(req) {
        const reqs = this.getSupportRequests();
        reqs.push(req);
        this.savesupportRequests(reqs);
    }


    static closeRequest(id){
        const reqs = this.getSupportRequests()
        const reqIndex = reqs.findIndex(req => req.id === id);
      

        if (reqIndex !== -1) {
            reqs[reqIndex].state = "Closed"
            this.savesupportRequests(reqs);
            alert('Request details updated successfully.');
        } else {
            alert('User not found.');
        }

    }

    static getCountOfOpened(){
        const reqs = this.getSupportRequests();
        const opened = reqs.filter(req => req.state === 'Opened');
        return opened.length;
    }

    static getCountOfClosed(){
        const reqs = this.getSupportRequests();
        const closed = reqs.filter(req => req.state === 'Closed');
        return closed.length;
    }

}