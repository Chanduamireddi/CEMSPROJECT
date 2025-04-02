"use client";

import { useState, useEffect } from "react";
import { useUserAuth } from "@/hooks/useUserAuth";
import Link from "next/link";

interface OrganizerRequest {
  _id: string;
  eventName: string;
  date: string;
  category: string;
  place: string;
  capacity: number;
  message: string;
  status: string;
  createdAt: string;
  userEmail: string;
}

export default function RequestOrganizerPage() {
  useUserAuth();

  const [form, setForm] = useState({
    eventName: "",
    date: "",
    category: "",
    place: "",
    capacity: "",
    message: "",
  });

  const [userEmail, setUserEmail] = useState("");
  const [requests, setRequests] = useState<OrganizerRequest[]>([]);

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      setUserEmail(email);
      fetchRequests(email);
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/organizer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, userEmail }),
      });

      const result = await res.json();
      if (res.ok) {
        alert("Request sent successfully!");
        setForm({
          eventName: "",
          date: "",
          category: "",
          place: "",
          capacity: "",
          message: "",
        });
        fetchRequests(userEmail);
      } else {
        alert("Error: " + result.error);
      }
    } catch (err) {
      console.error("Error sending request:", err);
      alert("Something went wrong.");
    }
  };

  const fetchRequests = async (email: string) => {
    try {
      const res = await fetch("/api/organizer");
      const data = await res.json();
      const userRequests = data.filter((req: OrganizerRequest) => req.userEmail === email);
      setRequests(userRequests);
    } catch (err) {
      console.error("Error fetching requests:", err);
    }
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
      {/* Header */}
      <header className="bg-dark text-white py-3 shadow-sm">
        <div className="container d-flex justify-content-between align-items-center">
          <h5 className="m-0">User Panel : Request Organizer</h5>
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
      <main className="container flex-grow-1 py-5">
        <h4 className="text-center text-primary mb-4">📧 Request to Organize an Event</h4>

        {/* FORM */}
        <div className="card p-4 shadow-sm mb-5">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold">Event Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="eventName"
                  value={form.eventName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Category</label>
                <select
                  className="form-select"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Seminar">Seminar</option>
                  <option value="Competition">Competition</option>
                  <option value="Cultural">Cultural</option>
                  <option value="Tech Talk">Tech Talk</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Place</label>
                <input
                  type="text"
                  className="form-control"
                  name="place"
                  value={form.place}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Available Slots</label>
                <input
                  type="number"
                  className="form-control"
                  name="capacity"
                  value={form.capacity}
                  onChange={handleChange}
                  required
                  min={1}
                />
              </div>
              <div className="col-12">
                <label className="form-label fw-semibold">Message (Optional)</label>
                <textarea
                  className="form-control"
                  rows={3}
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Explain why you want to organize this event..."
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-100 fw-bold mt-4">
              Submit Organizer Request
            </button>
          </form>
        </div>

        {/* TABLE */}
        <h4 className="text-secondary mb-3">📋 Your Previous Requests</h4>
        {requests.length === 0 ? (
          <p className="text-muted">No requests submitted yet.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-hover bg-white shadow-sm">
              <thead className="table-primary">
                <tr>
                  <th>Event</th>
                  <th>Date</th>
                  <th>Category</th>
                  <th>Place</th>
                  <th>Slots</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req) => (
                  <tr key={req._id}>
                    <td>{req.eventName}</td>
                    <td>{new Date(req.date).toLocaleDateString()}</td>
                    <td>{req.category}</td>
                    <td>{req.place}</td>
                    <td>{req.capacity}</td>
                    <td>
                      <span
                        className={`badge ${
                          req.status === "accepted"
                            ? "bg-success"
                            : req.status === "rejected"
                            ? "bg-danger"
                            : "bg-secondary"
                        }`}
                      >
                        {req.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3">
        © 2025 Community Event Management System
      </footer>
    </div>
  );
}