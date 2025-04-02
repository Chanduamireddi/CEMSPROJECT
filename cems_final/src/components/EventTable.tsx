"use client";
import { useState, useEffect } from "react";

const EventTable = ({ refreshEvents }: { refreshEvents: () => void }) => {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  // ✅ Fetch Events
  const fetchEvents = async () => {
    try {
      const res = await fetch("/api/events");

      if (!res.ok) {
        console.error("Failed to fetch events. Response status:", res.status);
        return;
      }

      const data = await res.json();
      console.log("Fetched Events:", data); // ✅ Debugging Line
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  // ✅ Handle Event Deletion
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;

    try {
      const res = await fetch("/api/events", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        alert("Event deleted successfully.");
        refreshEvents();
      } else {
        alert("Failed to delete event.");
      }
    } catch (error) {
      alert("An error occurred while deleting the event.");
      console.error(error);
    }
  };

  // ✅ Handle Event Editing
  const handleEdit = async (event: any) => {
    const newName = prompt("Edit Event Name:", event.name);
    if (!newName) return;

    const updatedEvent = { ...event, name: newName };

    try {
      const res = await fetch("/api/events", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedEvent),
      });

      if (res.ok) {
        alert("Event updated successfully!");
        refreshEvents();
      } else {
        alert("Failed to update event.");
      }
    } catch (error) {
      alert("An error occurred while updating the event.");
      console.error(error);
    }
  };

  return (
    <div className="table-responsive">
      <table className="table table-striped table-dark">
        <thead>
          <tr className="bg-secondary text-white">
            <th>Name</th>
            <th>Date</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.length > 0 ? (
            events.map((event) => (
              <tr key={event._id}>
                <td>{event.name}</td>
                <td>{new Date(event.date).toLocaleDateString()}</td>
                <td>{event.category}</td>
                <td>
                  <button onClick={() => handleEdit(event)} className="btn btn-primary btn-sm me-2">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(event._id)} className="btn btn-danger btn-sm">
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center text-gray-500">
                No events available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EventTable;
