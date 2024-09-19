import { Notification, app } from "electron";

export interface ShowNotificationInterface {
    title: string,
    body: string
}

class Alert {
    static show_notification(props: ShowNotificationInterface) {
        try {
            const notificationProps: ShowNotificationInterface = {
                title: props.title || app.getName(),
                body: props.body || "Some Message"
            };

            new Notification(notificationProps).show();
            console.log("✓ Alert.show_notification \t\t\t—▶ New Notification has been created successfully!");
        } catch (err) {
            console.error("✕ Alert.show_notification \t\t\t—▶ Ups! Something went wrong!\n", err);
        }
    }
}

export default Alert;
