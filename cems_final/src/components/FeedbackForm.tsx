// components/FeedbackForm.tsx
import { useState } from "react";
import axios from "axios";

const FeedbackForm = ({ eventId }: any) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = async () => {
    try {
      await axios.post(`/api/events/${eventId}/feedback`, { rating, comment });
      alert("Feedback submitted successfully");
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <div>
      <h3>Rate and Leave Feedback</h3>
      <input 
        type="number" 
        min="1" 
        max="5" 
        value={rating} 
        onChange={(e) => setRating(Number(e.target.value))}
        placeholder="Rating (1-5)"
      />
      <textarea 
        value={comment} 
        onChange={(e) => setComment(e.target.value)} 
        placeholder="Write your feedback here..."
      />
      <button onClick={handleSubmit}>Submit Feedback</button>
    </div>
  );
};

export default FeedbackForm;
