"use client";

import { useEffect, useState } from "react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import Link from "next/link";

interface Announcement {
  _id: string;
  message: string;
}

export default function AnnouncementsPage() {
  useAdminAuth();

  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editMessage, setEditMessage] = useState("");

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const res = await fetch("/api/announcements");
      if (!res.ok) throw new Error("Failed to fetch announcements");
      const data = await res.json();
      if (Array.isArray(data)) setAnnouncements(data);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  };

  const handleCreate = async () => {
    if (!newMessage.trim()) return alert("Message cannot be empty.");
    try {
      const res = await fetch("/api/announcements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: newMessage.trim() }),
      });
      if (res.ok) {
        setNewMessage("");
        fetchAnnouncements();
      } else alert("Failed to create announcement.");
    } catch (error) {
      console.error("Error creating announcement:", error);
    }
  };

  const handleUpdate = async () => {
    if (!editId || !editMessage.trim()) return alert("Invalid input");
    try {
      const res = await fetch("/api/announcements", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editId, message: editMessage.trim() }),
      });
      if (res.ok) {
        setEditId(null);
        setEditMessage("");
        fetchAnnouncements();
      } else alert("Failed to update announcement.");
    } catch (error) {
      console.error("Error updating announcement:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      const res = await fetch("/api/announcements", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) fetchAnnouncements();
      else alert("Failed to delete announcement.");
    } catch (error) {
      console.error("Error deleting announcement:", error);
    }
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
      {/* Header */}
      <header className="bg-dark text-white py-3 shadow">
        <div className="container d-flex justify-content-between align-items-center">
          <h5 className="m-0">Admin Panel : Announcements</h5>
          <nav className="d-flex gap-3">
            <Link href="/dashboard" className="btn btn-outline-light btn-sm">Dashboard</Link>
            <Link href="/dashboard/events" className="btn btn-outline-warning btn-sm">Events</Link>
            <Link href="/dashboard/manageusers" className="btn btn-outline-info btn-sm">Users</Link>
            <Link href="/dashboard/ratings&reviews" className="btn btn-outline-success btn-sm">Feedback</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container flex-grow-1 py-5">
        {/* 📬 Add New Announcement */}
        <div className="card shadow-sm mb-5">
          <div className="card-body">
            <h4 className="text-center text-primary fw-bold mb-3">📢 Post New Announcement</h4>
            <div className="d-flex flex-column flex-md-row gap-3">
              <input
                type="text"
                placeholder="Enter announcement message"
                className="form-control"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button className="btn btn-primary fw-semibold" onClick={handleCreate}>
                ➕ Add
              </button>
            </div>
          </div>
        </div>

        {/* 📄 Announcements List */}
        <div className="card shadow-sm">
          <div className="card-body">
            <h4 className="text-secondary fw-bold mb-3">📋 Announcement History</h4>

            {announcements.length > 0 ? (
              <ul className="list-group">
                {announcements.map((announcement) => (
                  <li
                    key={announcement._id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    {editId === announcement._id ? (
                      <input
                        type="text"
                        className="form-control me-3"
                        value={editMessage}
                        onChange={(e) => setEditMessage(e.target.value)}
                      />
                    ) : (
                      <span>{announcement.message}</span>
                    )}

                    <div className="d-flex gap-2">
                      {editId === announcement._id ? (
                        <button className="btn btn-success btn-sm" onClick={handleUpdate}>
                          ✅ Save
                        </button>
                      ) : (
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() => {
                            setEditId(announcement._id);
                            setEditMessage(announcement.message);
                          }}
                        >
                          ✏️ Edit
                        </button>
                      )}
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(announcement._id)}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted">No announcements available.</p>
            )}
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