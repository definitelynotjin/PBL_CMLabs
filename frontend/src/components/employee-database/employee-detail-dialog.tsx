'use client';

import React from 'react';
import {
  Dialog,
  DialogContentSidebarRight,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Employee } from './types';

export default function EmployeeDetailDialog({
  employee,
  onClose,
  onShowDocuments,
  onShowUpload,
}: {
  employee: Employee;
  onClose: () => void;
  onShowDocuments: () => void;
  onShowUpload: () => void;
}) {

  return (
    <Dialog open={true} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContentSidebarRight
        className="fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-xl overflow-y-auto p-6 animate-in slide-in-from-right duration-300 z-[9999]">
        <div className="space-y-6">

          {/* Employee Info Header */}
          <div className="flex items-center gap-4 border-b pb-4">
            <Image
              src={employee.avatar || '/placeholder-avatar.png'}
              alt={employee.first_name}
              width={64}
              height={64}
              className="rounded-full object-cover"
            />
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{employee.first_name} {employee.last_name}</h2>

              <span className={`inline-block mt-1 px-2 py-0.5 text-xs rounded-full ${employee.status === 1 ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-500'}`}>
                {employee.status === 1 ? 'Active' : 'Inactive'}
              </span>

              <p className="text-[#7CA5BF] mt-1">
                {employee.position || '-'} &mdash; {employee.check_clock_setting?.name || '-'}
              </p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-2 border-b pb-4">
            <h3 className="text-base font-semibold">Contact Information</h3>
            <p><strong>Email:</strong> {employee.email || '-'}</p>
            <p><strong>Phone:</strong> {employee.phone || '-'}</p>
            <p><strong>Gender:</strong> {employee.gender || '-'}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2 pt-4">
            <Button onClick={onShowUpload}>
              Add Document
            </Button>
            <Button variant="secondary" onClick={onShowDocuments}>
              View Documents
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContentSidebarRight>
    </Dialog>
  );
}
