'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Employee } from './types';
import { EmployeeDocuments } from './employeedocuments';

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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detail Karyawan</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <p>
            <strong>Nama:</strong> {employee.first_name} {employee.last_name}
          </p>
          <p>
            <strong>Jenis Kelamin:</strong> {employee.gender}
          </p>
          <p>
            <strong>Telepon:</strong> {employee.phone}
          </p>
          <p>
            <strong>Cabang:</strong> {employee.branch}
          </p>
          <p>
            <strong>Jabatan:</strong> {employee.position}
          </p>
          <p>
            <strong>Status:</strong> {employee.employment_status}
          </p>
        </div>
        <div className="flex gap-2 pt-4">
          <Button
            onClick={() => {
              onClose();        // Close the current dialog
              onShowUpload();   // Trigger parent to show upload dialog
            }}
          >
            Tambah Dokumen
          </Button>
          <Button variant="secondary" onClick={onShowDocuments}>
            Lihat Dokumen
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
