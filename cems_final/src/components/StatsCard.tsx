import React from "react";

interface StatsCardProps {
  title: string;
  value: string;
  percentage: string;
  color: string;
}

export default function StatsCard({ title, value, percentage, color }: StatsCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <h2 className="text-xl font-semibold text-gray-600">{title}</h2>
      <p className="text-3xl font-bold text-gray-800">{value}</p>
      <p className={color}>{percentage} Increase</p>
    </div>
  );
}
