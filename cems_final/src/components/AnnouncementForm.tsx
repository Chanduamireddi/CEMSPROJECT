"use client";
import { useState } from "react";

const AnnouncementForm = ({ refreshAnnouncements }: { refreshAnnouncements: () => void }) => {
  const [formData, setFormData] = useState({ title: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/announcements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, createdBy: "organizer-id" }), // Replace with actual user ID
      });

      if (res.ok) {
        alert("📢 Announcement posted!");
        setFormData({ title: "", message: "" });
        refreshAnnouncements();
      } else {
        alert("Failed to post announcement.");
      }
    } catch (error) {
      alert("Error posting announcement.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-800 rounded-lg text-white">
      <h2 className="text-xl font-semibold mb-3">Create Announcement</h2>

      <input
        type="text"
        placeholder="Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        className="w-full p-2 mb-3 border border-gray-600 rounded bg-gray-700 text-white"
        required
      />

      <textarea
        placeholder="Message"
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        className="w-full p-2 mb-3 border border-gray-600 rounded bg-gray-700 text-white"
        required
      />

      <button type="submit" className="bg-blue-500 px-4 py-2 rounded">
        Post Announcement
      </button>
    </form>
  );
};

export default AnnouncementForm;
