'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ViewDialogProps {
  openDialog: boolean;
  setOpenDialog: (value: boolean) => void;
  selectedEmployee: any; // Ideally type this better
}

export const ViewDialog = ({
  openDialog,
  setOpenDialog,
  selectedEmployee,
}: ViewDialogProps) => {
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
              <div>
                <h2 className="text-lg font-semibold">{selectedEmployee.name}</h2>
                <p className="text-[#7CA5BF]">
                  {selectedEmployee.position} &mdash; {selectedEmployee.ck_setting?.name || 'Unknown Department'}
                </p>
                <span
                  className={`text-sm font-medium ${selectedEmployee.status === "Approved"
                    ? "text-green-600"
                    : selectedEmployee.status === "Rejected"
                      ? "text-red-600"
                      : selectedEmployee.status === "Late"
                        ? "text-yellow-600"
                        : "text-gray-600"
                    }`}
                >
                  {selectedEmployee.status}
                </span>
              </div>
            </div>

            {/* 🟨 Section 2: Attendance Info */}
            <div className="space-y-2 border-b pb-4">
              <h3 className="text-base font-semibold">Attendance Information</h3>
              <p><strong>Clock In:</strong> {selectedEmployee.clockIn}</p>
              <p><strong>Clock Out:</strong> {selectedEmployee.clockOut}</p>
              <p><strong>Work Hours:</strong> {selectedEmployee.workHours}</p>
              <p><strong>Position:</strong> {selectedEmployee.position}</p>
            </div>

            {/* 🟩 Section 3: Location & Proof */}
            <div className="space-y-2">
              <h3 className="text-base font-semibold">Proof of Attendance</h3>
              <p><strong>Location:</strong> {selectedEmployee.ck_setting?.name || 'Unknown'}</p>
              {/* Display image or file proof */}
              {selectedEmployee.proof_file_url ? (
                <div className="mt-2">
                  <Image
                    src={selectedEmployee.proof_file_url}
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
