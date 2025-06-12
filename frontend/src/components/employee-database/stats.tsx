import React from 'react';

interface StatsProps {
  employees: any[];
  periode: string;
}

const Stats: React.FC<StatsProps> = ({ employees, periode }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="border rounded-lg p-1">
        <p className="text-sm text-muted-foreground">Periode</p>
        <p className="text-lg font-semibold">{periode}</p>
      </div>
      <div className="border rounded-lg p-3">
        <p className="text-sm text-muted-foreground">Total Employee</p>
        <p className="text-lg font-semibold">{employees.length}</p>
      </div>
      <div className="border rounded-lg p-3">
        <div>
          <p className="text-sm text-muted-foreground">Total New Hire</p>
          <p className="text-lg font-semibold">20</p>
        </div>
      </div>
      <div className="border rounded-lg p-3">
        <div>
          <p className="text-sm text-muted-foreground">Full Time Employee</p>
          <p className="text-lg font-semibold">20</p>
        </div>
      </div>
    </div>
  );
};

export default Stats;