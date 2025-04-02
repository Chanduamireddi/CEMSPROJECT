"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar"; // ✅ Reuse Sidebar for users
import "../../styles/dashboard.css";

export default function UserDashboard() {
  const [user, setUser] = useState<{ role: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role") || ""; // ✅ Prevents null issue

    // ✅ Redirect unauthorized users
    if (!token || role === "admin") {
      router.push("/login");
    } else {
      setUser({ role }); // ✅ Persist user role
    }
  }, []);

  if (!user) {
    return <p>Loading...</p>; // ✅ Prevents UI flicker
  }

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="main-content p-4">
        <h1 className="display-4 fw-bold mb-4">User Dashboard</h1>

        {/* User Stats Section */}
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card text-center p-4 shadow stats-card">
              <h3 className="fw-semibold">My Events</h3>
              <p className="display-5 fw-bold text-primary">5</p>
              <p className="text-success">📈 10% Growth</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-center p-4 shadow stats-card">
              <h3 className="fw-semibold">RSVPs</h3>
              <p className="display-5 fw-bold text-primary">12</p>
              <p className="text-success">📈 5% Increase</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-center p-4 shadow stats-card">
              <h3 className="fw-semibold">Feedback Given</h3>
              <p className="display-5 fw-bold text-primary">7</p>
              <p className="text-success">📈 8% Growth</p>
            </div>
          </div>
        </div>

        {/* Dashboard Buttons */}
        <div className="row mt-5 g-4">
          <div className="col-md-4">
            <a href="/dashboard/my-events" className="dashboard-card btn btn-success btn-lg w-100">
              View My Events
            </a>
          </div>
          <div className="col-md-4">
            <a href="/dashboard/rsvp" className="dashboard-card btn btn-primary btn-lg w-100">
              Manage RSVPs
            </a>
          </div>
          <div className="col-md-4">
            <a href="/dashboard/feedback" className="dashboard-card btn btn-warning btn-lg w-100">
              My Feedback & Reviews
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
