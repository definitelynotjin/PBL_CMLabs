'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/sidebar';
import Header from '@/components/add-new-employee/header';
import EmployeeForm from '@/components/add-new-employee/employee-form.tsx';

export default function AddNewEmployeePage() {
  const [date, setDate] = useState<Date | undefined>(undefined);

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 p-6 space-y-6">
        <Header />
        <EmployeeForm date={date} setDate={setDate} />
      </div>
    </div>
  );
}
