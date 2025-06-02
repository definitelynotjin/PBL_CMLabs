interface AttendanceStatusBadgeProps {
  status: string; // Status seperti "On time", "Late"
}

export const AttendanceStatusBadge: React.FC<AttendanceStatusBadgeProps> = ({ status }) => {
  let badgeClass = "";

  if (status === "On time") badgeClass = "bg-gray-700 text-white";
  else if (status === "Late") badgeClass = "bg-gray-500 text-white";
  else if (status === "Izin") badgeClass = "bg-gray-300 text-black";
  else badgeClass = "bg-gray-400 text-white";

  return (
    <div className={`px-4 py-1 rounded-full text-sm inline-block ${badgeClass}`}>{status}</div>
  );
};