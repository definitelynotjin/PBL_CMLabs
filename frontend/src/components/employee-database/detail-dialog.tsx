"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface Employee {
  first_name: string
  last_name: string
  gender: string
  phone: string
  branch: string
  position: string
  employment_status: string
}

interface EmployeeDetailDialogProps {
  employee: Employee | null
  onClose: () => void
  onAddDocument: () => void
}

export function EmployeeDetailDialog({ employee, onClose, onAddDocument }: EmployeeDetailDialogProps) {
  if (!employee) return null

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detail Karyawan</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <p><strong>Nama:</strong> {employee.first_name} {employee.last_name}</p>
          <p><strong>Jenis Kelamin:</strong> {employee.gender}</p>
          <p><strong>Telepon:</strong> {employee.phone}</p>
          <p><strong>Cabang:</strong> {employee.branch}</p>
          <p><strong>Jabatan:</strong> {employee.position}</p>
          <p><strong>Status:</strong> {employee.employment_status}</p>
        </div>
        <Button onClick={onAddDocument}>Tambah Dokumen</Button>
      </DialogContent>
    </Dialog>
  )
}
