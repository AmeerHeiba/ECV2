
document.addEventListener('DOMContentLoaded', function(){
    const supportForm = document.getElementById('contactSupportForm'); 
    supportForm.addEventListener('submit', function(event) {
        event.preventDefault(); 

       
        const fullName = document.getElementById('fullName').value;
        const emailAddress = document.getElementById('emailAddress').value;
        const phoneNumber = document.getElementById('phoneNumber').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;  
        const id = SupportRequest.getSupportRequests().length+1;

            
        
        
        const supportReq = new SupportRequest(id,fullName,emailAddress,phoneNumber,subject,message);

        SupportRequest.addsupportRequest(supportReq)
        alert(`Thanks for contacting us your request was passed to admins with ID#${id}` );
        supportForm.reset();
        window.location.href = 'home.html';
    
        
        

})
});