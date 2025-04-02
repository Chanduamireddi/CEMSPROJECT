"use client";

import { useEffect, useState } from "react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import Link from "next/link";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export default function ManageUsersPage() {
  useAdminAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await fetch("/api/admin/users");
    const data = await res.json();
    setUsers(data);
    setLoading(false);
  };

  const handleRoleChange = async (id: string, newRole: string) => {
    const res = await fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, role: newRole }),
    });
    if (res.ok) fetchUsers();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    const res = await fetch("/api/admin/users", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) fetchUsers();
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
      {/* Header */}
      <header className="bg-dark text-white py-3 shadow">
        <div className="container d-flex justify-content-between align-items-center">
          <h5 className="m-0">Admin Panel : Manage Users</h5>
          <nav className="d-flex gap-3">
            <Link href="/dashboard" className="btn btn-outline-light btn-sm">Dashboard</Link>
            <Link href="/dashboard/events" className="btn btn-outline-warning btn-sm">Events</Link>
            <Link href="/dashboard/manageusers" className="btn btn-outline-info btn-sm">Users</Link>
            <Link href="/dashboard/ratings&reviews" className="btn btn-outline-success btn-sm">Feedback</Link>
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="container flex-grow-1 py-5">
        {loading ? (
          <p className="text-center text-muted">Loading users...</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-hover text-center bg-white shadow-sm">
              <thead className="table-dark">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Change Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.firstName} {user.lastName}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`badge ${
                        user.role === "admin" ? "bg-danger" :
                        user.role === "organizer" ? "bg-warning text-dark" : "bg-secondary"
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td>
                      <select
                        className="form-select"
                        value={user.role}
                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                      >
                        <option value="participant">Participant</option>
                        <option value="organizer">Organizer</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(user._id)}>
                        🗑️ Delete
                      </button>
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