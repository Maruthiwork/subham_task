// Scripts for firebase and firebase messaging
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
// eslint-disable-next-line no-undef
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyCJCqzD4MhNFMcF8Ic52oECAivvZyw2qVw",
  authDomain: "republic-prod.firebaseapp.com",
  databaseURL: "https://republic-prod.firebaseio.com",
  projectId: "republic-prod",
  storageBucket: "republic-prod.appspot.com",
  messagingSenderId: "1098766585632",
  appId: "1:1098766585632:web:00385239bc210a1cfd5145",
  measurementId: "G-XZ0F34Q4WG"
};

// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();
messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body || payload.notification.description,
    icon: payload.data?.image  || `http://img.republicworld.com/icons/icons/R.logo.svg`,
    data: {
      url: payload.data?.redirectUrl || "/",
    },
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Add an event listener to handle notification clicks
self.addEventListener("notificationclick", function (event) {
  const urlToOpen = event.notification.data.url || "/";
  event.waitUntil(clients.openWindow(urlToOpen));
});
