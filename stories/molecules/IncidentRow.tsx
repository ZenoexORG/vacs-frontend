import React from "react";

export interface IncidentData {
  id: number;
  status: string;
  priority: string;
  vehicle_id: string;
  date: string;
  history: {
    message: string;
    author: string;
    date: string;
  }[];
}

export interface IncidentRowProps {
  incident: IncidentData;
  isDark?: boolean;
  onClick?: (incident: IncidentData) => void;
}

export const IncidentRow: React.FC<IncidentRowProps> = ({
  incident,
  isDark = false,
  onClick,
}) => {
  // Format time from date string (assuming ISO format)
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const bgColor = isDark ? "bg-dark-800" : "bg-black-100/10";
  const textColor = isDark ? "text-white-50" : "text-black-950";
  const hoverColor = isDark ? "hover:bg-dark-700" : "hover:bg-black-100/20";

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-emerald-500";
      default:
        return "bg-emerald-500";
    }
  };

  return (
    <div
      className={`flex items-center justify-between py-5 px-5 border-b border-black-300/20 ${bgColor} ${textColor} ${hoverColor} cursor-pointer`}
      onClick={() => onClick?.(incident)}
    >
      <div className="font-medium">{incident.vehicle_id}</div>
      <div className="flex items-center space-x-4">
        <span className={`${getPriorityColor(incident.priority)} text-white-50 px-4 py-1 rounded-md text-sm`}>
          {incident.priority.charAt(0).toUpperCase() + incident.priority.slice(1)}
        </span>
        <span className="text-sm">{formatTime(incident.date)}</span>
      </div>
    </div>
  );
};
