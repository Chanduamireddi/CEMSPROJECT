// components/EventDetail.tsx
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const EventDetail = () => {
  const router = useRouter();
  const { eventId } = router.query;
  const [event, setEvent] = useState<any>(null);
  const [rsvpSuccess, setRsvpSuccess] = useState(false);

  useEffect(() => {
    if (!eventId) return;
    axios.get(`/api/events/${eventId}`)
      .then(response => setEvent(response.data))
      .catch(error => console.error("Error fetching event:", error));
  }, [eventId]);

  const handleRSVP = async () => {
    try {
      await axios.post(`/api/events/rsvp`, { eventId });
      setRsvpSuccess(true);
    } catch (error) {
      console.error("Error RSVPing for event:", error);
    }
  };

  if (!event) return <div>Loading...</div>;

  return (
    <div>
      <h1>{event.name}</h1>
      <p>{event.description}</p>
      <p><strong>Date:</strong> {event.date}</p>
      <p><strong>Available Slots:</strong> {event.availableSlots}</p>
      <button onClick={handleRSVP}>RSVP</button>
      {rsvpSuccess && <p>You have successfully RSVP'd to this event!</p>}
    </div>
  );
};

export default EventDetail;
