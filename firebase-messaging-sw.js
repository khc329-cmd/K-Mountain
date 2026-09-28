importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDiO-u7R7ZUIIhexv4CP4x1iYaP536YRiU",
  authDomain: "k-mountain.firebaseapp.com",
  projectId: "k-mountain",
  storageBucket: "k-mountain.firebasestorage.app",
  messagingSenderId: "230089706256",
  appId: "1:230089706256:web:6b68bbe42d59099b90b395"
});

const messaging = firebase.messaging();

// Background message handler (tab closed or in background)
messaging.onBackgroundMessage(payload => {
  const n = payload.notification || {};
  self.registration.showNotification(n.title || '산마루', {
    body: n.body || '',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    data: { url: 'https://k-mountain.champrime.kr' }
  });
});

// Open app when notification is clicked
self.addEventListener('notificationclick', event => {
  event.notification.close();
  const url = (event.notification.data && event.notification.data.url)
    ? event.notification.data.url
    : 'https://k-mountain.champrime.kr';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      for (const c of list) {
        if (c.url.startsWith('https://k-mountain.champrime.kr') && 'focus' in c)
          return c.focus();
      }
      return clients.openWindow(url);
    })
  );
});
