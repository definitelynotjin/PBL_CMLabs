'use client';

import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import Sidebar from '@/components/sidebar'; // Use the existing Sidebar
import Header from '@/components/add-new-employee/header';
import EmployeeForm from '@/components/add-new-employee/employee-form';

export default function AddNewEmployeePage() {
  const [date, setDate] = useState<Date | undefined>();

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