'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
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
      <DialogContent
        className="fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-xl overflow-y-auto p-6 animate-in slide-in-from-right duration-300 z-[9999]"
      >

        <DialogHeader>
          <DialogTitle>Employee Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-2">
          <p><strong>Name:</strong> {employee.first_name} {employee.last_name}</p>
          <p><strong>Email:</strong> {employee.email}</p>
          <p><strong>Gender:</strong> {employee.gender}</p>
          <p><strong>Phone Number:</strong> {employee.phone}</p>
          <p><strong>Department:</strong> {employee.check_clock_setting?.name || '-'}</p>
          <p><strong>Position:</strong> {employee.position}</p>
          <p><strong>Status:</strong> {Number(employee.status) === 1 ? 'Active' : 'Inactive'}</p>
        </div>

        <div className="flex gap-2 pt-4">
          <Button onClick={() => {
            onClose();
            setTimeout(onShowUpload, 300);
          }}>
            Add Document
          </Button>
          <Button variant="secondary" onClick={onShowDocuments}>
            View Documents
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
