"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface OrganizerRequest {
  _id: string;
  userEmail: string;
  message: string;
  eventName: string;
  date: string;
  category: string;
  place: string;
  capacity: number;
  status: string;
  createdAt: string;
}

export default function OrganizerRequestsPage() {
  const [requests, setRequests] = useState<OrganizerRequest[]>([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    const res = await fetch("/api/admin/organizer-requests");
    const data = await res.json();
    setRequests(data);
  };

  const handleAction = async (id: string, action: "approve" | "reject") => {
    try {
      const res = await fetch(`/api/admin/organizer-requests`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action }),
      });

      if (res.ok) {
        fetchRequests();
      } else {
        const error = await res.json();
        alert("Error:: " + error.error);
      }
    } catch (err) {
      console.error("Action error:", err);
    }
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
      {/* Header */}
      <header className="bg-dark text-white py-3 shadow-sm">
        <div className="container d-flex justify-content-between align-items-center">
          <h5 className="m-0">Admin Panel : Organizer Requests</h5>
          <nav className="d-flex gap-3">
            <Link href="/dashboard" className="btn btn-outline-light btn-sm">
              Dashboard
            </Link>
            <Link href="/dashboard/events" className="btn btn-outline-warning btn-sm">
              Events
            </Link>
            <Link href="/dashboard/ratings&reviews" className="btn btn-outline-success btn-sm">
              Feedback
            </Link>
            <Link href="/dashboard/announcements" className="btn btn-outline-info btn-sm">
              Announcements
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-5 flex-grow-1">
        <h4 className="text-center fw-bold mb-4 text-primary">
          📋 Organizer Requests
        </h4>

        {requests.length === 0 ? (
          <div className="alert alert-info text-center">
            No organizer requests found.
          </div>
        ) : (
          <div className="card shadow-sm">
            <div className="table-responsive">
              <table className="table table-bordered table-hover align-middle text-center mb-0">
                <thead className="table-dark">
                  <tr>
                    <th>Event</th>
                    <th>Date</th>
                    <th>Category</th>
                    <th>Place</th>
                    <th>Slots</th>
                    <th>Status</th>
                    <th>Message</th>
                    <th>Action</th>
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
                            req.status === "approved"
                              ? "bg-success"
                              : req.status === "rejected"
                              ? "bg-danger"
                              : "bg-secondary"
                          }`}
                        >
                          {req.status}
                        </span>
                      </td>
                      <td>{req.message || "—"}</td>
                      <td>
                        {req.status === "pending" ? (
                          <>
                            <button
                              className="btn btn-sm btn-success me-2"
                              onClick={() => handleAction(req._id, "approve")}
                            >
                              ✅ Approve
                            </button>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => handleAction(req._id, "reject")}
                            >
                              ❌ Reject
                            </button>
                          </>
                        ) : (
                          <span className="text-muted">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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