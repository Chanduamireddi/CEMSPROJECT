"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Event {
  _id: string;
  name: string;
  date: string;
  category: string;
  capacity: number;
  participants: string[];
}

export default function UserEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    fetchEvents();
    setEmail(localStorage.getItem("email"));
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await fetch("/api/events");
      if (!res.ok) throw new Error(`Failed to fetch events. Status: ${res.status}`);

      const data = await res.json();
      setEvents(data);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  };

  const handleRegister = async (eventId: string) => {
    if (!email) {
      alert("Please log in first!");
      return;
    }

    try {
      const res = await fetch("/api/events/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId, email }),
      });

      const result = await res.json();

      if (res.ok) {
        alert("Successfully registered for the event!");
        fetchEvents();
      } else {
        alert("ERROR :: " + result.error);
      }
    } catch (error) {
      console.error("Error registering for event:", error);
    }
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
      {/* Header */}
      <header className="bg-dark text-white py-3 shadow-sm">
        <div className="container d-flex justify-content-between align-items-center">
          <h5 className="m-0">User Panel : Browse Events</h5>
          <nav className="d-flex gap-3">
            <Link href="/dashboard/user" className="btn btn-outline-light btn-sm">
              Dashboard
            </Link>
            <Link href="/dashboard/user/registered" className="btn btn-outline-warning btn-sm">
              My Events
            </Link>
            <Link href="/dashboard/user/feedback" className="btn btn-outline-success btn-sm">
              Feedback
            </Link>
            <Link href="/dashboard/user/request-organizer" className="btn btn-outline-info btn-sm">
              Organizer Request
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-5 flex-grow-1">
        <h4 className="fw-bold text-center text-primary mb-4">
          🎟️ Available Events
        </h4>

        <div className="card shadow-sm">
          <div className="card-body">
            <table className="table table-hover text-center align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Event Name</th>
                  <th>Date</th>
                  <th>Category</th>
                  <th>Available Slots</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {events.length > 0 ? (
                  events.map((event) => {
                    const eventDate = new Date(event.date);
                    const today = new Date();
                    const availableSlots = event.capacity - event.participants.length;
                    const isPastEvent = eventDate < today;
                    const isRegistered = email && event.participants.includes(email);

                    return (
                      <tr key={event._id}>
                        <td className="fw-semibold">{event.name}</td>
                        <td>{eventDate.toLocaleDateString()}</td>
                        <td>{event.category}</td>
                        <td>
                          {isPastEvent ? (
                            <span className="badge bg-danger">Event Over</span>
                          ) : availableSlots > 0 ? (
                            <span className="badge bg-success">{availableSlots} slots left</span>
                          ) : (
                            <span className="badge bg-danger">Full</span>
                          )}
                        </td>
                        <td>
                          {isPastEvent ? (
                            <button className="btn btn-secondary btn-sm" disabled>
                              Event Over
                            </button>
                          ) : isRegistered ? (
                            <button className="btn btn-outline-secondary btn-sm" disabled>
                              Registered
                            </button>
                          ) : availableSlots > 0 ? (
                            <button
                              className="btn btn-success btn-sm"
                              onClick={() => handleRegister(event._id)}
                            >
                              Register
                            </button>
                          ) : (
                            <button className="btn btn-secondary btn-sm" disabled>
                              Full
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={5} className="text-muted py-4">
                      😔 No events available at the moment.
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