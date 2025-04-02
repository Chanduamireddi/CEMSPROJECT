/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import UserSidebar from "@/components/UserSidebar";
import "@/styles/dashboard.css";
import { useUserAuth } from "@/hooks/useUserAuth";
import Link from "next/link";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function UserDashboard() {
  useUserAuth();

  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [upcomingCount, setUpcomingCount] = useState(0);
  const [registeredCount, setRegisteredCount] = useState(0);
  const [feedbackCount, setFeedbackCount] = useState(0);

  useEffect(() => {
    const email = localStorage.getItem("email");
    setUserEmail(email);

    if (email) {
      fetchCounts(email);
    }
  }, []);

  const fetchCounts = async (email: string) => {
    try {
      const [eventRes, registeredRes, feedbackRes] = await Promise.all([
        fetch("/api/events"),
        fetch(`/api/events/registered?email=${email}`),
        fetch("/api/feedback")
      ]);

      const [events, registered, feedbacks] = await Promise.all([
        eventRes.json(),
        registeredRes.json(),
        feedbackRes.json()
      ]);

      const today = new Date();
      const upcoming = events.filter((event: any) => new Date(event.date) > today);
      const userFeedbacks = feedbacks.filter((f: any) => f.userEmail === email);

      setUpcomingCount(upcoming.length);
      setRegisteredCount(registered.length);
      setFeedbackCount(userFeedbacks.length);
    } catch (error) {
      console.error("Failed to load dashboard stats:", error);
    }
  };

  const chartData = {
    labels: ["Future Events", "Registered", "Feedback"],
    datasets: [
      {
        label: "My Activity",
        data: [upcomingCount, registeredCount, feedbackCount],
        backgroundColor: ["#0d6efd", "#198754", "#ffc107"],
      },
    ],
  };

  return (
    <div className="dashboard-layout">
      <UserSidebar />
      <main className="dashboard-content">
        <h1 className="dashboard-title">
          <i className="bi bi-person-circle me-2"></i> User Dashboard
        </h1>

        <div className="row g-4 stats-section">
          <div className="col-md-4">
            <div className="card stat-card">
              <h5>📅 Future Events</h5>
              <p className="stat-count text-primary">{upcomingCount}</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card stat-card">
              <h5>🎟️ Your Registrations</h5>
              <p className="stat-count text-primary">{registeredCount}</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card stat-card">
              <h5>🗣️ Shared Insights</h5>
              <p className="stat-count text-primary">{feedbackCount}</p>
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="card mt-5 p-4 shadow-sm">
          <h5 className="mb-3">📊 Your Activity Overview</h5>
          <Bar data={chartData} options={{ responsive: true }} />
        </div>

        {/* Navigation Cards */}
        <div className="row mt-5 g-4 action-buttons">
          <div className="col-md-4">
            <Link href="/user/events" className="btn btn-success w-100 btn-lg">
              📌 View Events
            </Link>
          </div>
          <div className="col-md-4">
            <Link href="/dashboard/user/registered" className="btn btn-primary w-100 btn-lg">
              📝 My Registered Events
            </Link>
          </div>
          <div className="col-md-4">
            <Link href="/dashboard/user/feedback" className="btn btn-warning w-100 btn-lg">
              💬 My Feedback
            </Link>
          </div>
        </div>

        <div className="mt-4">
          <Link href="/dashboard/user/request-organizer" className="btn btn-outline-info btn-lg w-100">
            ✉️ Submit Request to Organize an Event
          </Link>
        </div>
      </main>
    </div>
  );
}