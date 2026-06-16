// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: 'AIzaSyCkTesKQEb-uJNRVUStNQh3_bghhOZcXX4',
  authDomain: 'vetez-53126.firebaseapp.com',
  projectId: 'vetez-53126',
  storageBucket: 'vetez-53126.appspot.com',
  messagingSenderId: '333981268559',
  appId: '1:333981268559:web:166e57b803081acc9b883a',
  measurementId: 'G-8X5WNHL398',
});

const messaging = firebase.messaging();