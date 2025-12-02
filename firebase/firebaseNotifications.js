import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import app from './firebase';

const getMessagingClient = () => {
  if (typeof window === 'undefined') return null; // SSR check
  try {
    return getMessaging(app);
  } catch (err) {
    process.env.NODE_ENV === 'development' &&
      console.warn('Messaging not supported in this browser:', err);
    return null;
  }
};

export const requestNotificationPermission = async () => {
  const messaging = getMessagingClient();
  if (!messaging) return null;

  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const token = await getToken(messaging);
      process.env.NODE_ENV === 'development' &&
        console.log('FCM Token:', token);
      localStorage.setItem('fcm_token', token);
      return token;
    } else {
      process.env.NODE_ENV === 'development' &&
        console.log('Notification permission denied');
      return null;
    }
  } catch (err) {
    process.env.NODE_ENV === 'development' &&
      console.error('Error getting FCM token', err);
    return null;
  }
};

// Subscribe directly to messages
export const subscribeToMessages = (callback) => {
  const messaging = getMessagingClient();
  if (!messaging) return;

  onMessage(messaging, (payload) => {
    callback(payload);
  });
};
