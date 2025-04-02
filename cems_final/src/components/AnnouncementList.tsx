"use client";
import { useEffect, useState } from "react";

const AnnouncementList = () => {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAnnouncements = async () => {
    setLoading(true);
    const res = await fetch("/api/announcements");
    const data = await res.json();
    setAnnouncements(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch("/api/announcements", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        fetchAnnouncements();
      } else {
        alert("Failed to delete announcement.");
      }
    } catch (error) {
      alert("Error deleting announcement.");
    }
  };

  return (
    <div className="p-4 bg-gray-900 text-white">
      <h2 className="text-xl font-semibold mb-3">📢 Recent Announcements</h2>

      {loading ? (
        <p>Loading...</p>
      ) : announcements.length > 0 ? (
        <ul>
          {announcements.map((announcement) => (
            <li key={announcement._id} className="p-3 mb-2 bg-gray-700 rounded">
              <h3 className="text-lg font-bold">{announcement.title}</h3>
              <p>{announcement.message}</p>
              <button onClick={() => handleDelete(announcement._id)} className="text-red-500 mt-2">
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No announcements available.</p>
      )}
    </div>
  );
};

export default AnnouncementList;
