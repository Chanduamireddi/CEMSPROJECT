/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";
import "@/styles/dashboard.css";
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

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [eventCount, setEventCount] = useState(0);
  const [participantCount, setParticipantCount] = useState(0);
  const [avgRating, setAvgRating] = useState(0);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "admin") {
      router.push("/login");
    } else {
      setUserRole(role);
      setIsLoading(false);
      fetchAdminStats();
    }
  }, [router]);

  const fetchAdminStats = async () => {
    try {
      const [eventsRes, feedbackRes] = await Promise.all([
        fetch("/api/events"),
        fetch("/api/feedback"),
      ]);

      const events = await eventsRes.json();
      const feedbacks = await feedbackRes.json();

      const totalParticipants = events.reduce(
        (sum: number, ev: any) => sum + (ev.participants?.length || 0),
        0
      );

      const avg =
        feedbacks.length > 0
          ? feedbacks.reduce((sum: number, f: any) => sum + Number(f.rating), 0) /
            feedbacks.length
          : 0;

      setEventCount(events.length);
      setParticipantCount(totalParticipants);
      setAvgRating(Number(avg.toFixed(1)));
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  if (isLoading) {
    return <p className="text-center mt-5">Checking authentication...</p>;
  }

  const chartData = {
    labels: ["Events", "Participants", "Avg Rating"],
    datasets: [
      {
        label: "Admin Metrics",
        data: [eventCount, participantCount, avgRating],
        backgroundColor: ["#0d6efd", "#20c997", "#ffc107"],
      },
    ],
  };

  return (
    <div className="dashboard-layout">
      <AdminSidebar />
      <main className="dashboard-content">
        <h1 className="dashboard-title">
          <i className="bi bi-shield-lock me-2"></i> Admin Dashboard
        </h1>

        {/* Stats Cards */}
        <div className="row g-4 stats-section">
          <div className="col-md-4">
            <div className="card stat-card">
              <h5>📌 Total Events</h5>
              <p className="stat-count text-primary">{eventCount}</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card stat-card">
              <h5>👥 Total Participants</h5>
              <p className="stat-count text-primary">{participantCount}</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card stat-card">
              <h5>⭐ Avg. Feedback Rating</h5>
              <p className="stat-count text-primary">{avgRating}</p>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="card mt-5 p-4 shadow-sm" style={{ maxWidth: "900px", margin: "0 auto" }}>
          <h5 className="mb-3">📊 Analytics Overview</h5>
          <Bar data={chartData} options={{ responsive: true }} />
        </div>

        {/* Navigation Buttons */}
        <div className="row mt-5 g-4 action-buttons">
          <div className="col-md-4">
            <a href="/dashboard/events" className="btn btn-success btn-lg w-100">
              🗂️ Manage Events
            </a>
          </div>
          <div className="col-md-4">
            <a href="/dashboard/participants" className="btn btn-primary btn-lg w-100">
              👤 Manage Participants
            </a>
          </div>
          <div className="col-md-4">
            <a href="dashboard/ratings&reviews" className="btn btn-warning btn-lg w-100">
              💬 Feedback & Ratings
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}