'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent
        className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-lg overflow-y-auto animate-in slide-in-from-right duration-300"
        onPointerDownOutside={onClose}
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
            setTimeout(onShowUpload, 200);
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
