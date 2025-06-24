'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ViewDialogProps {
  openDialog: boolean;
  setOpenDialog: (value: boolean) => void;
  selectedEmployee: any;
}

export const ViewDialog = ({
  openDialog,
  setOpenDialog,
  selectedEmployee,
}: ViewDialogProps) => {
  return (
    <Dialog
      open={openDialog}
      onOpenChange={(open) => {
        if (!open) setOpenDialog(false);
      }}
    >
      <DialogContent
        className="fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-xl overflow-y-auto p-6 animate-in slide-in-from-right duration-300 z-[9999]"
      >
        {selectedEmployee && (
          <>
            <DialogHeader>
              <DialogTitle>Attendance Details</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              <p><strong>Name:</strong> {selectedEmployee.name}</p>
              <p><strong>Position:</strong> {selectedEmployee.position}</p>
              <p><strong>Clock In:</strong> {selectedEmployee.clockIn}</p>
              <p><strong>Clock Out:</strong> {selectedEmployee.clockOut}</p>
              <p><strong>Work Hours:</strong> {selectedEmployee.workHours}</p>
              <p><strong>Status:</strong> {selectedEmployee.status}</p>
            </DialogDescription>
            <DialogFooter>
              <Button onClick={() => setOpenDialog(false)}>Close</Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
