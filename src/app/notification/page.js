"use client";

import { useEffect, useState } from "react";

export default function NotificationPage() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    async function fetchNotifications() {
      try {
        // Fetch all notifications due
        const res = await fetch("/api/notifications");
        const data = await res.json();
        setNotifications(data);

        // Mark all as seen after fetching
        await fetch("/api/notifications/mark-seen", { method: "POST" });
      } catch (err) {
        console.error("Failed to fetch notifications", err);
      }
    }

    fetchNotifications();

    // Optional: refresh notifications every 1 minute
    const interval = setInterval(fetchNotifications, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-indigo-700 mb-6">🔔 Notifications</h1>

      {notifications.length === 0 ? (
        <p className="text-gray-500 text-center">No notifications yet.</p>
      ) : (
        <ul className="space-y-4">
          {notifications.map((n) => (
            <li
              key={n._id}
              className="bg-white shadow-md rounded-xl p-4 border border-gray-200 hover:shadow-lg transition"
            >
              {/* Event Name */}
              <h3 className="text-lg font-semibold text-indigo-700">{n.title}</h3>

              {/* Event Description */}
              {n.description && (
                <p className="text-gray-600 mt-1">{n.description}</p>
              )}

              {/* Event Date & Time */}
              {n.eventDate && (
                <p className="text-sm text-gray-500 mt-2">
                  📅 Event Date & Time: {new Date(n.eventDate).toLocaleString()}
                </p>
              )}

              {/* Notification Time */}
              <p className="text-sm text-gray-500 mt-1">
                🔔 Notification scheduled at: {new Date(n.notifyAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
