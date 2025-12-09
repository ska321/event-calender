"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarPlus,
  CalendarDays,
  Clock,
  Info,
  ListChecks,
} from "lucide-react";

export default function Home() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    const res = await fetch("/api/events");
    const data = await res.json();
    setEvents(data);
  }

  async function createEvent(e) {
    e.preventDefault();
    if (!title || !date) return alert("Title and date required");

    const payload = {
      title,
      date: new Date(date).toISOString(),
      description,
    };

    const res = await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setTitle("");
      setDate("");
      setDescription("");
      fetchEvents();
    } else {
      alert("Failed to create event");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-8">

      {/* Top Description Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-white/60 backdrop-blur-lg border border-white shadow-xl p-6 rounded-2xl mb-10"
      >
        <h1 className="text-3xl font-bold text-indigo-700 flex items-center gap-3">
          <Info className="text-indigo-600" /> Event Planner Dashboard
        </h1>
        <p className="text-gray-600 mt-2 leading-relaxed">
          This website allows you to easily schedule events, keep track of upcoming activities,
          and manage all your plans in one place. Create events using the left panel and view
          all upcoming events on the right panel.
        </p>
      </motion.div>

      {/* Two Panel Layout */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* LEFT PANEL - Create Event */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white shadow-xl rounded-2xl p-6 border border-gray-100 backdrop-blur"
        >
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
            <CalendarPlus className="text-indigo-600" /> Create New Event
          </h2>

          <form onSubmit={createEvent} className="space-y-4">
            <motion.div whileHover={{ scale: 1.02 }}>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Event Title
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                placeholder="Enter event title"
              />
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }}>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Date & Time
              </label>
              <input
                type="datetime-local"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }}>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Description (optional)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                placeholder="Write some details about the event..."
              />
            </motion.div>

            <motion.button
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.03 }}
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-lg shadow-md hover:bg-indigo-700 transition font-medium flex items-center justify-center gap-2"
            >
              <ListChecks size={20} /> Create Event
            </motion.button>
          </form>
        </motion.div>

        {/* RIGHT PANEL - Upcoming Events */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white shadow-xl rounded-2xl p-6 border border-gray-100"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <CalendarDays className="text-indigo-600" /> Upcoming Events
          </h2>

          {events.length === 0 ? (
            <p className="text-gray-500 text-center">No events yet</p>
          ) : (
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {events.map((ev) => (
                <motion.div
                  key={ev._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-gray-200 shadow-md rounded-xl p-4"
                >
                  <h3 className="text-lg font-bold text-indigo-700">{ev.title}</h3>

                  <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                    <Clock size={16} className="text-indigo-500" />
                    {new Date(ev.date).toLocaleString()}
                  </div>

                  {ev.description && (
                    <p className="text-gray-700 mt-2">{ev.description}</p>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
