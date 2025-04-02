/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import { useUserAuth } from "@/hooks/useUserAuth";
import { FaStar } from "react-icons/fa";
import Link from "next/link";

interface Feedback {
  _id: string;
  eventId: {
    _id: string;
    name: string;
  };
  rating: number;
  comment: string;
  userEmail: string;
}

export default function FeedbackPage() {
  useUserAuth();

  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({ eventId: "", rating: "", comment: "" });
  const [message, setMessage] = useState("");
  const [feedbackHistory, setFeedbackHistory] = useState<Feedback[]>([]);

  const userEmail = typeof window !== "undefined" ? localStorage.getItem("email") : null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.eventId || !form.rating || !form.comment) {
      alert("Please fill in all fields.");
      return;
    }

    const res = await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, userEmail }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("✅ Feedback submitted successfully!");
      setForm({ eventId: "", rating: "", comment: "" });
      fetchFeedbacks();
    } else {
      setMessage("Failed to submit feedback.");
    }

    setTimeout(() => setMessage(""), 4000);
  };

  const fetchEvents = async () => {
    const res = await fetch("/api/events");
    const data = await res.json();
    setEvents(data);
  };

  const fetchFeedbacks = async () => {
    const res = await fetch("/api/feedback");
    const data = await res.json();
    const userFeedbacks = data.filter((f: Feedback) => f.userEmail === userEmail);
    setFeedbackHistory(userFeedbacks);
  };

  useEffect(() => {
    fetchEvents();
    fetchFeedbacks();
  }, []);

  return (
    <div className="min-vh-100 d-flex flex-column">
      {/* Header */}
      <header className="bg-dark text-white py-3 shadow-sm">
        <div className="container d-flex justify-content-between align-items-center">
          <h5 className="m-0">User Panel : Feedback</h5>
          <nav className="d-flex gap-3">
            <Link href="/dashboard/user" className="btn btn-outline-light btn-sm">
              Dashboard
            </Link>
            <Link href="/user/events" className="btn btn-outline-light btn-sm">
              Events
            </Link>
            <Link href="/dashboard/user/registered" className="btn btn-outline-light btn-sm">
              My Events
            </Link>
            <Link href="/dashboard/user/feedback" className="btn btn-outline-warning btn-sm">
              Feedback
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container flex-grow-1 py-5">
        <div className="card p-4 shadow rounded-4 mb-5">
          <h3 className="text-center text-primary mb-4">Event Feedback</h3>

          {message && (
            <div className="alert alert-info text-center fw-semibold">{message}</div>
          )}

          <h5 className="mb-3 fw-semibold">Tell us about your experience</h5>

          <div className="mb-3">
            <label className="form-label fw-bold">Select Event</label>
            <select
              name="eventId"
              value={form.eventId}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">Select</option>
              {events.map((event: any) => (
                <option key={event._id} value={event._id}>
                  {event.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Rating</label>
            <select
              name="rating"
              value={form.rating}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">Rate 1 to 5</option>
              <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
              <option value="4">⭐⭐⭐⭐ Very Good</option>
              <option value="3">⭐⭐⭐ Good</option>
              <option value="2">⭐⭐ Fair</option>
              <option value="1">⭐ Poor</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="form-label fw-bold">Your Feedback</label>
            <textarea
              name="comment"
              value={form.comment}
              placeholder="Write your feedback here..."
              className="form-control"
              rows={4}
              onChange={handleChange}
            />
          </div>

          <button className="btn btn-primary w-100 fw-bold" onClick={handleSubmit}>
            Submit Feedback
          </button>
        </div>

        {/* Feedback History */}
        {feedbackHistory.length > 0 && (
          <div className="card p-4 shadow rounded-4">
            <h4 className="text-center text-secondary mb-4 fw-bold">
              📚 Your Feedback History
            </h4>

            <div className="row g-4">
              {feedbackHistory.map((f) => (
                <div className="col-md-6" key={f._id}>
                  <div className="card h-100 border-0 shadow-sm">
                    <div className="card-body">
                      <h5 className="card-title text-primary fw-semibold mb-2">
                        {f.eventId.name}
                      </h5>
                      <div className="mb-2">
                        {Array.from({ length: 5 }, (_, i) => (
                          <FaStar
                            key={i}
                            className={`me-1 ${
                              i < f.rating ? "text-warning" : "text-secondary"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="card-text">{f.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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