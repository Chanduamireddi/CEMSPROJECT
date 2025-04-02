"use client";

import { useEffect, useState } from "react";
import { useUserAuth } from "@/hooks/useUserAuth";
import Link from "next/link";

interface Event {
  _id: string;
  name: string;
  date: string;
  category: string;
}

export default function RegisteredEventsPage() {
  useUserAuth();

  const [registeredEvents, setRegisteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedEmail = localStorage.getItem("email");
      setEmail(storedEmail);
    }
  }, []);

  useEffect(() => {
    if (email) {
      fetchRegisteredEvents();
    }
  }, [email]);

  const fetchRegisteredEvents = async () => {
    try {
      const res = await fetch(`/api/events/registered?email=${email}`);
      if (!res.ok) throw new Error("Failed to fetch registered events");

      const data = await res.json();
      setRegisteredEvents(data);
    } catch (error) {
      console.error("Failed to fetch registered events:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
      {/* Header */}
      <header className="bg-dark text-white py-3 shadow-sm">
        <div className="container d-flex justify-content-between align-items-center">
          <h5 className="m-0">User Panel : My Registered Events</h5>
          <nav className="d-flex gap-3">
            <Link href="/dashboard/user" className="btn btn-outline-light btn-sm">
              Dashboard
            </Link>
            <Link href="/user/events" className="btn btn-outline-light btn-sm">
              Events
            </Link>
            <Link href="/dashboard/user/registered" className="btn btn-outline-warning btn-sm">
              My Events
            </Link>
            <Link href="/dashboard/user/feedback" className="btn btn-outline-success btn-sm">
              Feedback
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container flex-grow-1 py-5">
        {loading ? (
          <p className="text-center text-muted">Loading...</p>
        ) : registeredEvents.length > 0 ? (
          <div className="card p-4 shadow-lg">
            <div className="table-responsive">
            <h4 className="fw-bold text-center mb-4 text-primary">
          📋 Registered Events
        </h4>
              <table className="table table-striped table-hover text-center mb-0">
                <thead className="table-dark">
                  <tr>
                    <th>Event Name</th>
                    <th>Date</th>
                    <th>Category</th>
                  </tr>
                </thead>
                <tbody>
                  {registeredEvents.map((event) => (
                    <tr key={event._id}>
                      <td>{event.name}</td>
                      <td>{new Date(event.date).toLocaleDateString()}</td>
                      <td>{event.category}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <p className="text-center text-muted">
            😔 You have not registered for any events yet.
          </p>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3">
        © 2025 Community Event Management System
      </footer>
    </div>
  );
}