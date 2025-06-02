interface ChartDataItem {
  name: string;
  value: number;
}

export const EmployeeStatusChart: React.FC<{ data: ChartDataItem[] }> = ({ data }) => (
  <div className="mt-4">
    {data.map((item, index) => (
      <div key={index} className="mb-4">
        <div className="flex justify-between mb-1">
          <span className="text-sm">{item.name}</span>
          <span className="text-sm font-semibold">{item.value}</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full">
          <div
            className={`h-2 rounded-full ${index === 0 ? 'bg-gray-700' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-gray-300' : 'bg-gray-200'}`}
            style={{ width: `${(item.value / 150) * 100}%` }}
          ></div>
        </div>
      </div>
    ))}
    <div className="flex justify-between mt-4 text-xs text-muted-foreground">
      <span>0</span><span>25</span><span>50</span><span>75</span><span>150</span>
    </div>
  </div>
);