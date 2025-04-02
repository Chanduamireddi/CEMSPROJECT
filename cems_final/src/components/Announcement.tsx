// components/Announcement.tsx
const Announcement = ({ eventId, announcement }: any) => {
    return (
      <div>
        <h4>Announcement for Event {eventId}</h4>
        <p>{announcement}</p>
      </div>
    );
  };
  
  export default Announcement;
  