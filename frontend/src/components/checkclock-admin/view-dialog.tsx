'use client';

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Check, X } from "lucide-react";
import { DetailedEmployee } from '@/components/checkclock-admin/type'; // adjust path if needed

interface ViewDialogProps {
  openDialog: boolean;
  setOpenDialog: (value: boolean) => void;
  selectedEmployee: DetailedEmployee | null;
  onStatusChange?: (employeeId: string, newStatus: string) => void;
  onOpenConfirmDialog: (employee: DetailedEmployee, action: 'approve' | 'reject') => void;
}

export const ViewDialog = ({
  openDialog,
  setOpenDialog,
  selectedEmployee,
  onOpenConfirmDialog,
}: ViewDialogProps) => {

  // Helper function untuk mengkonversi waktu string ke menit
  const timeToMinutes = (timeStr: string): number => {
    if (!timeStr || timeStr === "0" || timeStr === "00:00") return 0;
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const isReviewableStatus = (
    selectedEmployee?.clockIn &&
    selectedEmployee?.clockOut &&
    ["Waiting Approval", "Ready for Review"].includes(selectedEmployee?.status || "Waiting Approval")
  );

  const proofUrl = selectedEmployee?.supporting_document_path
    ? (selectedEmployee.supporting_document_path.startsWith('http')
      ? selectedEmployee.supporting_document_path
      : `/storage/${selectedEmployee.supporting_document_path}`)
    : null;


  // Function untuk menentukan status berdasarkan aturan bisnis
  const determineStatus = (): string => {
    // Menggunakan nilai dari attendance information yang sudah ditampilkan
    const clockInTime = selectedEmployee?.clockIn || "0";
    const clockOutTime = selectedEmployee?.clockOut || "0";

    // Jika clock in dan clock out bernilai 0, maka absent
    if ((clockInTime === "0" || clockInTime === "00:00" || !clockInTime) &&
      (clockOutTime === "0" || clockOutTime === "00:00" || !clockOutTime)) {
      return "Absent";
    }

    // Konversi waktu ke menit untuk perbandingan
    const clockInMinutes = timeToMinutes(clockInTime);
    const clockOutMinutes = timeToMinutes(clockOutTime);

    // Waktu standar dalam menit
    const standardClockIn = 8 * 60; // 08:00 = 480 menit
    const lateThreshold = 8 * 60 + 15; // 08:15 = 495 menit
    const standardClockOut = 16 * 60; // 16:00 = 960 menit

    // Cek apakah terlambat (clock in > 08:15)
    if (clockInMinutes > 0 && clockInMinutes > lateThreshold) {
      return "Late";
    }

    // Cek apakah pulang lebih awal (clock out < 16:00)
    if (clockOutMinutes > 0 && clockOutMinutes < standardClockOut) {
      return "Early Leave";
    }

    return "Approved";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "text-green-600";
      case "Rejected":
        return "text-red-600";
      case "Late":
        return "text-yellow-600";
      case "Absent":
        return "text-gray-600";
      case "Early Leave":
        return "text-orange-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent className="fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-xl overflow-y-auto p-6 animate-in slide-in-from-right duration-300 z-[9999]">
        {selectedEmployee && (
          <div className="space-y-6">
            {/* 🟦 Section 1: Employee Info */}
            <div className="flex items-center gap-4 border-b pb-4">
              <Image
                src={selectedEmployee.avatar || "/placeholder-avatar.png"}
                alt={selectedEmployee.name}
                width={64}
                height={64}
                className="rounded-full object-cover"
              />
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{selectedEmployee.name}</h2>
                <p className="text-[#7CA5BF]">
                  {selectedEmployee.position || 'Unknown Position'} &mdash; {selectedEmployee.department || 'Unknown Department'}
                </p>

                <span className={`text-sm font-medium ${getStatusColor(selectedEmployee.status || "Waiting Approval")}`}>
                  {selectedEmployee.status || "Waiting Approval"}
                </span>
              </div>

              {/* Action Buttons - Check and X */}
              {isReviewableStatus && (
                <div className="flex gap-2">
                  <button
                    onClick={() => onOpenConfirmDialog(selectedEmployee, 'approve')}
                    className="w-8 h-8 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors"
                  >
                    <Check className="w-5 h-5 text-white" />
                  </button>
                  <button
                    onClick={() => onOpenConfirmDialog(selectedEmployee, 'reject')}
                    className="w-8 h-8 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>
              )}
            </div>

            {/* 🟨 Section 2: Attendance Info */}
            <div className="space-y-2 border-b pb-4">
              <h3 className="text-base font-semibold">Attendance Information</h3>
              <div className="font-semibold space-y-1">
                <p>Clock In: {selectedEmployee.clockIn}</p>
                <p>Clock Out: {selectedEmployee.clockOut}</p>
                <p>Work Hours: {selectedEmployee.workHours}</p>
              </div>
            </div>

            {/* 🟩 Section 3: Location & Proof */}
            <div className="space-y-2">
              <h3 className="text-base font-semibold">Proof of Attendance</h3>
              <div className="font-semibold">
                <p>Location: {selectedEmployee.ck_setting_id?.name || 'Unknown'}</p>
              </div>
              {proofUrl ? (
                <div className="mt-2">
                  <Image
                    src={proofUrl}
                    alt="Proof of attendance"
                    width={320}
                    height={180}
                    className="rounded border"
                  />
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">No proof file uploaded.</p>
              )}
            </div>

            <div className="pt-4">
              <Button onClick={() => setOpenDialog(false)} className="w-full">
                Close
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
