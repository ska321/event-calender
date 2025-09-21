"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bell } from "lucide-react";

export default function NotificationBell() {
  const [count, setCount] = useState(0);

  async function fetchCount() {
    try {
      const res = await fetch("/api/notifications/count");
      const data = await res.json();
      setCount(data.count);
    } catch (err) {
      console.error("Failed to fetch notification count", err);
    }
  }

  useEffect(() => {
    // 🔹 First fetch after 1 second
    const timeout = setTimeout(fetchCount, 1000);

    // 🔹 Poll every 5 seconds
    const interval = setInterval(fetchCount, 5000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <Link href="/notification" className="relative">
      <Bell className="w-6 h-6 text-indigo-600 hover:text-indigo-800 transition" />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {count}
        </span>
      )}
    </Link>
  );
}
