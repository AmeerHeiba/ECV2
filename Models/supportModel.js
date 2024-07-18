class SupportRequest{
    constructor(id,fullName,emailAddress,phoneNumber,subject,message){
        this.id = id;
        this.fullName = fullName;
        this.emailAddress = emailAddress;
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

    static getSupportRequestById(id){
        const supportReqs = this.getSupportRequests();
        return supportReqs.find(sr => sr.id === id);
    }


    static closeRequest(id,remarks,resolveDate){
        const reqs = this.getSupportRequests()
        const reqIndex = reqs.findIndex(req => req.id === id);
      

        if (reqIndex !== -1) {
            reqs[reqIndex].state = "Closed"
            reqs[reqIndex].resolvedBy = AuthController.getCurrentUser().id;
            reqs[reqIndex].remarks = remarks;
            reqs[reqIndex].resolveDate = resolveDate;
            this.savesupportRequests(reqs);
        } else {
            alert('User not found.');
        }

    }


    static ReOpenRequest(id,remarks,reopenDate){
        const reqs = this.getSupportRequests()
        const reqIndex = reqs.findIndex(req => req.id === id);
      

        if (reqIndex !== -1) {
            reqs[reqIndex].state = "Reopened"
            reqs[reqIndex].ReOpenRemarks = remarks;
            reqs[reqIndex].ReopenDate = reopenDate;
            this.savesupportRequests(reqs);
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