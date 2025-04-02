"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function UserSidebar() {
  const [username, setUsername] = useState<string | null>("User");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) setUsername(storedUsername);
  }, []);

  return (
    <div className="sidebar d-flex flex-column justify-content-between">
      <div>
        {/* Profile section */}
        <div className="text-center mb-4">
          <img
            src="/images/profile.png"
            alt="User Avatar"
            className="img-fluid rounded-circle mb-2"
            style={{ width: "90px", height: "90px", objectFit: "cover" }}
          />
          <h5 className="text-white">{username}</h5>
          <small className="text-muted">Event Participant</small>
        </div>

        {/* Navigation Links */}
        <nav className="nav flex-column">
          <Link href="/dashboard/user" className="nav-link text-white">
            🏠 Dashboard
          </Link>
          <Link href="/user/events" className="nav-link text-white">
            📅 View Events
          </Link>
          <Link href="/dashboard/user/registered" className="nav-link text-white">
            🎟 My Registered Events
          </Link>
          <Link href="/dashboard/user/feedback" className="nav-link text-white">
            📝 Feedback
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