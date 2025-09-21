// public/sw.js
self.addEventListener('push', function (event) {
  if (!event.data) return;
  const payload = event.data.json();
  const title = payload.title || "Event reminder";
  const options = {
    body: payload.body || "",
    data: { url: payload.url || "/" }
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  const url = event.notification.data && event.notification.data.url ? event.notification.data.url : "/";
  event.waitUntil(clients.openWindow(url));
});
