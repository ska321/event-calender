// lib/webpush.js
import webpush from "web-push";

const publicKey = process.env.VAPID_PUBLIC_KEY;
const privateKey = process.env.VAPID_PRIVATE_KEY;
if (!publicKey || !privateKey) {
  console.warn("VAPID keys not set. Notifications will not work without them.");
} else {
  webpush.setVapidDetails(
    "mailto:admin@example.com",
    publicKey,
    privateKey
  );
}

export function sendWebPush(subscription, payload) {
  // subscription is the object from client pushManager.getSubscription()
  return webpush.sendNotification(subscription, JSON.stringify(payload));
}
