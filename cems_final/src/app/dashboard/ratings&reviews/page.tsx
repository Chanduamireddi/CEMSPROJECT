"use client";

import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import Link from "next/link";

interface Feedback {
  _id: string;
  userEmail: string;
  comment: string;
  rating: number;
  eventId: {
    _id: string;
    name: string;
  };
}

export default function AdminFeedbackPage() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const res = await fetch("/api/feedback");
      const data = await res.json();
      setFeedbacks(data);
    } catch (error) {
      console.error("Failed to fetch feedbacks:", error);
    }
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
      {/* 🔷 Header */}
      <header className="bg-dark text-white py-3 shadow">
        <div className="container d-flex justify-content-between align-items-center">
          <h5 className="m-0">Admin Panel : Ratings & Reviews</h5>
          <nav className="d-flex gap-3">
            <Link href="/dashboard" className="btn btn-outline-light btn-sm">Dashboard</Link>
            <Link href="/dashboard/events" className="btn btn-outline-warning btn-sm">Events</Link>
            <Link href="/dashboard/manageusers" className="btn btn-outline-info btn-sm">Users</Link>
            <Link href="/dashboard/announcements" className="btn btn-outline-light btn-sm">Announcements</Link>
          </nav>
        </div>
      </header>

      {/* 🟦 Main Content */}
      <main className="container flex-grow-1 py-5">
        {feedbacks.length === 0 ? (
          <div className="alert alert-info text-center">No feedback has been submitted yet.</div>
        ) : (
          <div className="row row-cols-1 row-cols-md-2 g-4">
            {feedbacks.map((feedback) => (
              <div className="col" key={feedback._id}>
                <div className="card h-100 shadow-sm border-0">
                  <div className="card-body">
                    <h5 className="card-title text-primary mb-3">
                      🎯 {feedback.eventId?.name || "Unnamed Event"}
                    </h5>

                    <div className="mb-3 d-flex align-items-center">
                      {Array.from({ length: 5 }, (_, i) => (
                        <FaStar
                          key={i}
                          className={`me-1 ${i < feedback.rating ? "text-warning" : "text-muted"}`}
                        />
                      ))}
                      <span className="ms-2 text-dark fw-bold">{feedback.rating}/5</span>
                    </div>

                    <p className="card-text">{feedback.comment}</p>
                  </div>
                  <div className="card-footer bg-transparent border-0">
                    <small className="text-muted">Submitted by: {feedback.userEmail}</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* ⚫ Footer */}
      <footer className="bg-dark text-white text-center py-3">
        © 2025 Community Event Management System
      </footer>
    </div>
  );
}