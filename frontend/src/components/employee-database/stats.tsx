import React from 'react';
import { Employee } from './types';

interface StatsProps {
  employees: Employee[];
  periode: string;
}

function getNewHiresThisMonth(employees: Employee[], periode: string) {
  return employees.filter((emp) => {
    const joinDate = emp.join_date || emp.created_at;
    if (!joinDate) return false;

    const joinMonth = new Date(joinDate).toISOString().slice(0, 7); // "YYYY-MM"
    return joinMonth === periode;
  }).length;
}


const Stats: React.FC<StatsProps> = ({ employees, periode }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="border rounded-lg p-3">
        <p className="text-sm text-muted-foreground">Periode</p>
        <p className="text-lg font-semibold">{periode}</p>
      </div>
      <div className="border rounded-lg p-3">
        <p className="text-sm text-muted-foreground">Total Employee</p>
        <p className="text-lg font-semibold">{employees.length}</p>
      </div>
      <div className="border rounded-lg p-3">
        <p className="text-sm text-muted-foreground">Total New Hire</p>
        <p className="text-lg font-semibold">{getNewHiresThisMonth(employees, periode)}</p>
      </div>
      <div className="border rounded-lg p-3">
        <p className="text-sm text-muted-foreground">Full Time Employee</p>
        <p className="text-lg font-semibold">
          {employees.filter(emp => emp.contract_type === 'Tetap').length}
        </p>
      </div>
    </div>
  );
};

export default Stats;
