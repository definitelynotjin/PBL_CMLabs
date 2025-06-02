interface SummaryCardProps {
  title: string;
  value: string;
  className?: string;
}

export default function SummaryCard({ title, value }: SummaryCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow p-4 flex flex-col gap-2 w-full">
      <span className="text-sm text-gray-500">{title}</span>
      <span className="text-2xl font-bold">{value}</span>
    </div>
  );
}
