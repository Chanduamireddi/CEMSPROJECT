"use client";

import { useEffect, useState } from "react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import Link from "next/link";

interface Event {
  _id: string;
  name: string;
  date: string;
  category: string;
  capacity: number;
}

export default function ManageEventsPage() {
  useAdminAuth();

  const [events, setEvents] = useState<Event[]>([]);
  const [newEvent, setNewEvent] = useState({ name: "", date: "", category: "", capacity: "" });
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await fetch("/api/events");
      const data = await res.json();
      setEvents(data);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  };

  const handleAddEvent = async () => {
    if (!newEvent.name || !newEvent.date || !newEvent.category || !newEvent.capacity) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newEvent.name,
          date: new Date(newEvent.date).toISOString(),
          category: newEvent.category,
          capacity: parseInt(newEvent.capacity, 10),
        }),
      });

      if (res.ok) {
        setNewEvent({ name: "", date: "", category: "", capacity: "" });
        fetchEvents();
      } else {
        alert("Failed to add event.");
      }
    } catch (error) {
      console.error("Error adding event:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;

    try {
      const res = await fetch("/api/events", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) fetchEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setNewEvent({
      name: event.name,
      date: event.date.split("T")[0],
      category: event.category,
      capacity: event.capacity.toString(),
    });
  };

  const handleUpdateEvent = async () => {
    if (!editingEvent) return;

    setLoading(true);
    try {
      const res = await fetch("/api/events", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingEvent._id,
          name: newEvent.name,
          date: new Date(newEvent.date).toISOString(),
          category: newEvent.category,
          capacity: parseInt(newEvent.capacity, 10),
        }),
      });

      if (res.ok) {
        setEditingEvent(null);
        setNewEvent({ name: "", date: "", category: "", capacity: "" });
        fetchEvents();
      } else {
        alert("Failed to update event.");
      }
    } catch (error) {
      console.error("Error updating event:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
      {/* Header */}
      <header className="bg-dark text-white py-3 shadow">
        <div className="container d-flex justify-content-between align-items-center">
          <h5 className="m-0">Admin Panel : Manage Events</h5>
          <nav className="d-flex gap-3">
            <Link href="/dashboard" className="btn btn-outline-light btn-sm">
              Dashboard
            </Link>
            <Link href="/dashboard/events" className="btn btn-outline-warning btn-sm">
              Events
            </Link>
            <Link href="/dashboard/manageusers" className="btn btn-outline-info btn-sm">
              Users
            </Link>
            <Link href="/dashboard/ratings&reviews" className="btn btn-outline-success btn-sm">
              Feedback
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container flex-grow-1 py-5">
        <div className="card shadow-lg p-4 mb-4">
          <h4 className="text-center mb-4 text-primary fw-bold">
            {editingEvent ? "Edit Event" : "Add New Event"}
          </h4>

          <div className="row g-3">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Event Name"
                value={newEvent.name}
                onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                required
              />
            </div>

            <div className="col-md-6">
              <input
                type="date"
                className="form-control"
                value={newEvent.date}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                required
              />
            </div>

            <div className="col-md-6">
              <select
                className="form-select"
                value={newEvent.category}
                onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
                required
              >
                <option value="">Select Category</option>
                <option value="Conference">Conference</option>
                <option value="Workshop">Workshop</option>
                <option value="Networking">Networking</option>
                <option value="Social">Social</option>
              </select>
            </div>

            <div className="col-md-6">
              <input
                type="number"
                className="form-control"
                placeholder="Capacity"
                value={newEvent.capacity}
                onChange={(e) => setNewEvent({ ...newEvent, capacity: e.target.value })}
                required
              />
            </div>

            <div className="col-12 text-center">
              {editingEvent ? (
                <>
                  <button
                    className="btn btn-success me-2 px-4"
                    onClick={handleUpdateEvent}
                    disabled={loading}
                  >
                    {loading ? "Updating..." : "Update Event"}
                  </button>
                  <button
                    className="btn btn-secondary px-4"
                    onClick={() => setEditingEvent(null)}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  className="btn btn-warning px-5 fw-bold"
                  onClick={handleAddEvent}
                  disabled={loading}
                >
                  {loading ? "Adding..." : "Add Event"}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Events Table */}
        <div className="card shadow-sm">
          <div className="table-responsive">
            <table className="table table-striped table-hover text-center mb-0">
              <thead className="table-dark">
                <tr>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Category</th>
                  <th>Capacity</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.length > 0 ? (
                  events.map((event) => (
                    <tr key={event._id}>
                      <td className="fw-semibold">{event.name}</td>
                      <td>{new Date(event.date).toLocaleDateString()}</td>
                      <td>{event.category}</td>
                      <td>{event.capacity}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-primary me-2"
                          onClick={() => handleEdit(event)}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(event._id)}
                        >
                          🗑️ Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center text-muted py-4">
                      No events available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3">
        © 2025 Community Event Management System
      </footer>
    </div>
  );
}