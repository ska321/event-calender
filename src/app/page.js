"use client";

import { useEffect, useState } from "react";

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
    const payload = { title, date: new Date(date).toISOString(), description };
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
    <div className="max-w-3xl mx-auto">
      {/* Create Event Form */}
      <form
        onSubmit={createEvent}
        className="bg-white shadow-lg rounded-2xl p-6 mb-8 border border-gray-100"
      >
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          ➕ Create New Event
        </h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Title
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            placeholder="Enter event title"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Date & Time
          </label>
          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            placeholder="Optional details about the event"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition font-medium"
        >
          Create Event
        </button>
      </form>

      {/* Event List */}
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        📌 Upcoming Events
      </h2>
      {events.length === 0 ? (
        <p className="text-gray-500 text-center">No events yet</p>
      ) : (
        <ul className="space-y-4">
          {events.map((ev) => (
            <li
              key={ev._id}
              className="bg-white shadow-md rounded-xl p-4 border border-gray-100 hover:shadow-lg transition"
            >
              <h3 className="text-lg font-bold text-indigo-700">{ev.title}</h3>
              <p className="text-sm text-gray-500">
                {new Date(ev.date).toLocaleString()}
              </p>
              {ev.description && (
                <p className="text-gray-600 mt-2">{ev.description}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
