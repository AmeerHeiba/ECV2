class notificationsController{

    static getCurrentDateString() {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    //template_261geeu
    //service_3wvoa9j
    
    static sendNotification(targetUserID, adminID, title, subject){
        const notificationID = notifier.getNotifications().length +1;
        const date = this.getCurrentDateString();
        const newNotification = new notifier(notificationID, targetUserID, adminID, title, subject, date);
        notifier.addNotification(newNotification);

    }
}