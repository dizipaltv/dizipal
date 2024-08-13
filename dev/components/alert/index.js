const { Notification, app } = require("electron");

class Alert {
    static show_notification(props = {}) {
        try {
            const notificationProps = {
                title: props.title || app.getName(),
                body: props.body || "Some Message"
            };

            new Notification(notificationProps).show();
            console.log("✅ [--alert.Alert.show_notification--] - New Notification has been created successfully!");
        } catch (err) {
            console.error("❌ [--alert.Alert.show_notification--] - Ups! Something went wrong!\n", err);
        }
    }
}

module.exports=Alert;
