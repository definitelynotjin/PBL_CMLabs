'use client';

import { useState } from 'react';
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
  const [showDocuments, setShowDocuments] = useState(false);

  return (
    <>
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
                onClose(); // Close this dialog
                setTimeout(() => {
                  onShowUpload(); // Trigger parent upload modal
                }, 50);
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

      {/* Documents List Dialog */}
      <Dialog open={showDocuments} onOpenChange={setShowDocuments}>
        <DialogContent className="max-h-[80vh] sm:max-w-lg overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Dokumen Karyawan</DialogTitle>
          </DialogHeader>
          <EmployeeDocuments employeeId={employee.id.toString()} />
        </DialogContent>
      </Dialog>
    </>
  );
}
