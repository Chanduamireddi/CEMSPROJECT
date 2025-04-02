"use client";
import { useState } from "react";

const EventForm = ({ refreshEvents }: { refreshEvents: () => void }) => {
  const [eventData, setEventData] = useState({
    name: "",
    date: "",
    category: "",
    capacity: "", // ✅ Add capacity field
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventData.name || !eventData.date || !eventData.category || !eventData.capacity) {
      alert("⚠ Please fill in all fields.");
      return;
    }

    try {
      console.log("📤 Sending Event Data:", eventData);

      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
      });

      const data = await res.json();

      if (res.ok) {
        console.log("✅ Event Added Successfully:", data);
        alert(data.message);
        setEventData({ name: "", date: "", category: "", capacity: "" });
        refreshEvents();
      } else {
        console.error("❌ Error from API:", data);
        alert(data.error || "Failed to add event.");
      }
    } catch (error) {
      console.error("❌ Error adding event:", error);
      alert("An error occurred while adding the event.");
    }
  };

  return (
    <div className="event-form-container">
      <h2 className="text-center text-warning fw-bold mb-3">Create New Event</h2>
      <form className="event-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Event Name"
          className="form-control mb-2"
          value={eventData.name}
          onChange={handleChange}
        />
        <input
          type="date"
          name="date"
          className="form-control mb-2"
          value={eventData.date}
          onChange={handleChange}
        />
        <select
          name="category"
          className="form-control mb-2"
          value={eventData.category}
          onChange={handleChange}
        >
          <option value="">Select Category</option>
          <option value="Conference">Conference</option>
          <option value="Workshop">Workshop</option>
          <option value="Networking">Networking</option>
        </select>
        <input
          type="number"
          name="capacity"
          placeholder="Capacity"
          className="form-control mb-2"
          value={eventData.capacity}
          onChange={handleChange}
        />

        <button type="submit" className="btn btn-warning mt-2 w-100">
          Add Event
        </button>
      </form>
    </div>
  );
};

export default EventForm;
