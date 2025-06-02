// Example of EmployeeCard Component

interface EmployeeCardProps {
  title: string;
  value: number;
  update: string;
  className?: string; // Allow className as an optional prop
}

export const EmployeeCard: React.FC<EmployeeCardProps> = ({ title, value, update, className }) => {
  return (
    <div className={`bg-white rounded-lg shadow-lg p-4 ${className}`}>
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-2xl">{value}</p>
      <p className="text-sm text-gray-500">{update}</p>
    </div>
  );
};