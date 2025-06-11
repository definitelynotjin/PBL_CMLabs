'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Employee } from './types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { EmployeeDocuments } from './employeedocuments';
import TambahDokumen from './TambahDokumen';

export default function EmployeeDetailDialog({
  employee,
  onClose,
}: {
  employee: Employee;
  onClose: () => void;
}) {
  const [showDocuments, setShowDocuments] = useState(false);
  const [showUploadDialog, setShowUploadDialog] = useState(false);

  // Upload handler function for TambahDokumen
  async function handleUpload(file: File, documentType: string, employeeId: string) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('document_type', documentType);
    formData.append('user_id', employeeId);

    const res = await fetch('/api/documents', {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      throw new Error('Upload failed');
    }
  }

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
            <Button onClick={() => setShowUploadDialog(true)}>Tambah Dokumen</Button>
            <Button variant="secondary" onClick={() => setShowDocuments(true)}>
              Lihat Dokumen
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Upload Dialog */}
      {showUploadDialog && (
        <TambahDokumen
          employee={employee}
          onClose={() => setShowUploadDialog(false)}
          onUpload={handleUpload}
        />
      )}

      {/* Documents List Dialog */}
      <Dialog open={showDocuments} onOpenChange={setShowDocuments}>
        <DialogContent className="max-h-[80vh] sm:max-w-lg overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Dokumen Karyawan</DialogTitle>
          </DialogHeader>
          <EmployeeDocuments employeeId={employee.id} />
        </DialogContent>
      </Dialog>
    </>
  );
}
