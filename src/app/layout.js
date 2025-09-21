import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Bell } from "lucide-react";
import NotificationBell from "@/components/NotificationBell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Event Calendar",
  description: "Event calendar with notifications",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gray-50`}
      >
        {/* Navbar */}
        <nav className="flex justify-between items-center px-6 py-4 bg-white shadow">
          <Link href="/" className="text-xl font-bold text-indigo-600">
            📅 Event Calendar
          </Link>

          {/* Notification Bell */}
          <NotificationBell />
        </nav>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
