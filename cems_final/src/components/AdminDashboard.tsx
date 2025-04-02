// components/AdminDashboard.tsx
import { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    axios.get("/api/admin/events")
      .then(response => setEvents(response.data))
      .catch(error => console.error("Error fetching events:", error));
  }, []);

  const handleCreateAnnouncement = async (eventId: string, announcement: string) => {
    await axios.post(`/api/events/${eventId}/announcement`, { announcement });
    alert("Announcement created!");
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <ul>
        {events.map((event) => (
          <li key={event._id}>
            {event.name} - {event.date}
            <button onClick={() => handleCreateAnnouncement(event._id, "New event announcement")}>
              Create Announcement
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
