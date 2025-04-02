"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminSidebar() {
  const [adminName, setAdminName] = useState<string | null>("Admin");

  useEffect(() => {
    const storedName = localStorage.getItem("username");
    if (storedName) setAdminName(storedName);
  }, []);

  return (
    <div className="sidebar d-flex flex-column justify-content-between">
      <div>
        {/* Profile section */}
        <div className="text-center mb-4">
          <img
            src="/images/profile.png"
            alt="Admin Avatar"
            className="img-fluid rounded-circle mb-2"
            style={{ width: "90px", height: "90px", objectFit: "cover" }}
          />
          <h5 className="text-white">{adminName}</h5>
          <small className="text-muted">System Admin</small>
        </div>

        {/* Navigation Links */}
        <nav className="nav flex-column">
          <Link href="/dashboard" className="nav-link text-white">
            📊 Dashboard
          </Link>
          <Link href="/dashboard/events" className="nav-link text-white">
            📅 Manage Events
          </Link>
          <Link href="/dashboard/manageusers" className="nav-link text-white">
            👥 Manage Users
          </Link>
          <Link href="/dashboard/announcements" className="nav-link text-white">
            📢 Announcements
          </Link>
          <Link href="/dashboard/ratings&reviews" className="nav-link text-white">
            📝 User Ratings & Reviews
          </Link>
          <Link href="/dashboard/organizer-requests" className="nav-link text-white">
            🧾 Organizer Requests
          </Link>
        </nav>
      </div>

      {/* Logout */}
      <div className="text-center mt-4">
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
          className="btn btn-danger w-100"
        >
          🔒 Logout
        </button>
      </div>
    </div>
  );
}