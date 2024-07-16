function getCurrentFormattedDate() {
    const now = new Date();

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); 
    const year = now.getFullYear();

    return `${hours}:${minutes}/${day}/${month}/${year}`;
}

document.addEventListener('DOMContentLoaded', function(){

    $('#searchButton').on('click', function() {
        const complaintNumber = parseInt($('#complaintNumber').val());
        const complaint = SupportRequest.getSupportRequestById(complaintNumber);

        if (complaint) {
            $('#complaintId').text(complaint.id);
            $('#complaintSubject').text(complaint.subject);
            $('#complaintMessage').text(complaint.message);
            $('#complaintState').text(complaint.state);
            $('#complaintResolveDate').text(complaint.resolveDate);
            $('#complaintResolveRemarks').text(complaint.remarks);
            $('.complaint-details').show();
            $('#errorMessage').hide();
        } else {
            $('.complaint-details').hide();
            $('#errorMessage').show();
        }
    });

    $('#reopenButton').on('click', function() {
        const complaintNumber = parseInt($('#complaintNumber').val());
        const reOpenDate = getCurrentFormattedDate();
        const modal = new bootstrap.Modal(document.getElementById('Reopen_Reason'));

        modal.show();

        const confirmReOpenButton = document.getElementById('confirmReOpenButton');
        
        if (confirmReOpenButton) {
            confirmReOpenButton.addEventListener('click', function() {
                const reOpenRemarks = document.getElementById("Reopen_Reasoninput").value;

                 SupportRequest.ReOpenRequest(complaintNumber,reOpenRemarks,reOpenDate)
                
                // Close the modal after resolve
                modal.hide();
                
                // Refresh tables after resolve
                location.reload();
            }, { once: true }); // Ensure the event listener is added only once
        } 

    });


})