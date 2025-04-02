"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Sidebar() {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    console.log("User Role:", storedRole); // ✅ Debugging Line
    setRole(storedRole);
  }, []);

  return (
    <div className="sidebar">
      <h3>User Profile</h3>
      <p><strong>{role === "admin" ? "Admin" : "User"}</strong></p>

      <nav>
        {role === "admin" ? (
          <>
            <Link href="/dashboard">🏠 Admin Dashboard</Link>
            <Link href="/dashboard/users">👤 Manage Users</Link>
            <Link href="/dashboard/events">📅 Manage Events</Link>
            <Link href="/dashboard/announcements">📢 Announcements</Link>
          </>
        ) : (
          <>
            <Link href="/dashboard/user">🏠 User Dashboard</Link>
            <Link href="/user/events">📅 View Events</Link>
            <Link href="/dashboard/user/registered">🎟 My Registered Events</Link>
            <Link href="/dashboard/user/feedback">📝 Feedback</Link>
          </>
        )}
      </nav>

      <button className="logout-btn" onClick={() => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        window.location.href = "/login";
      }}>
        Logout
      </button>
    </div>
  );
}
