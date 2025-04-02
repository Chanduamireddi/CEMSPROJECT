// components/EventFilter.tsx
import { useState, useEffect } from "react";
import axios from "axios";

const EventFilter = ({ onFilterChange }: any) => {
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    onFilterChange({ category, date });
  }, [category, date]);

  return (
    <div>
      <select onChange={(e) => setCategory(e.target.value)} value={category}>
        <option value="">All Categories</option>
        <option value="workshop">Workshop</option>
        <option value="conference">Conference</option>
        {/* Add more categories */}
      </select>
      <input 
        type="date" 
        onChange={(e) => setDate(e.target.value)} 
        value={date}
      />
    </div>
  );
};

export default EventFilter;
