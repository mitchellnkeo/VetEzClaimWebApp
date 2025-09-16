// firebase-messaging.js
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import app from "./firebase";

// client-only initialization
const getMessagingClient = () => {
    if (typeof window === "undefined") return null; // SSR check
    try {
      return getMessaging(app);
    } catch (err) {
      console.warn("Messaging not supported in this browser:", err);
      return null;
    }
  };
  
export const requestNotificationPermission = async () => {
    const messaging = getMessagingClient();
    if (!messaging) return null;
  
    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        const token = await getToken(messaging, { vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY });
        console.log("FCM Token:", token);
        localStorage.setItem("fcm_token", token);
        return token;
      } else {
        console.log("Notification permission denied");
        return null;
      }
    } catch (err) {
      console.error("Error getting FCM token", err);
      return null;
    }
};
  
export const onMessageListener = () =>
    new Promise((resolve) => {
      const messaging = getMessagingClient();
      if (!messaging) return;
      onMessage(messaging, (payload) => resolve(payload));
    });