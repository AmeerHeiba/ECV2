class notifier {
    constructor (notificationID, targetUserID, adminID, title, subject, date){
        this.notificationID = notificationID;
        this.targetUserID = targetUserID;
        this.adminID = adminID;
        this.title = title;
        this.subject = subject;
        this.date = date;
    }


    static getNotifications() {
        return JSON.parse(localStorage.getItem('notifications')) || [];
    }

    
      static saveNotification(notification) {
        localStorage.setItem('notifications', JSON.stringify(notification));
      }

      static addNotification(notification) {
        const notifications = this.getNotifications();
        notifications.push(notification);
        this.saveNotification(notifications);
      }

      static getNotificationsbyUserID(id) {
        const notifications = this.getNotifications();
        return notifications.find((notification) => notification.targetUserID === id);
      }

      static getNotificationsbyAdminID(id) {
        const notifications = this.getNotifications();
        return notifications.find((notification) => notification.adminID === id);
      }

      
}