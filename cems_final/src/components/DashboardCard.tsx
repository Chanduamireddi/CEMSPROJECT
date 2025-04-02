import Link from "next/link";
import React, { ReactNode } from "react";

interface DashboardCardProps {
  title: string;
  link: string;
  icon: ReactNode;
  color: string;
}

export default function DashboardCard({ title, link, icon, color }: DashboardCardProps) {
  return (
    <Link href={link}>
      <div className={`p-6 rounded-lg text-white text-center cursor-pointer ${color} hover:opacity-80`}>
        <div className="text-4xl mb-3">{icon}</div>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
    </Link>
  );
}
