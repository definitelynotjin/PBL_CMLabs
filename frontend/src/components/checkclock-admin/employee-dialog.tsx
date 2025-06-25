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

interface Employee {
  name: string;
  position: string;
  clockIn: string;
  clockOut: string;
  workHours: string;
  status: string;
}

interface EmployeeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedEmployee: Employee | null;
  actionType: "approve" | "reject" | null;
  handleConfirm: () => void;
}

const EmployeeDialog: React.FC<EmployeeDialogProps> = ({ open, onOpenChange, selectedEmployee, actionType, handleConfirm }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="z-[100] max-w-md w-full">
        {selectedEmployee && actionType && (
          <>
            <DialogHeader>
              <DialogTitle>
                {actionType === "approve" ? "Approve Attendance" : "Reject Attendance"}
              </DialogTitle>
            </DialogHeader>
            <DialogDescription>
              Are you sure you want to {actionType} attendance for <strong>{selectedEmployee.name}</strong>?
            </DialogDescription>
            <DialogFooter>
              <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button onClick={handleConfirm}>Confirm</Button>
            </DialogFooter>
          </>
        )}
        {selectedEmployee && !actionType && (
          <>
            <DialogHeader>
              <DialogTitle>Attendance Details</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              <div className="space-y-2">
                <p><strong>Name:</strong> {selectedEmployee.name}</p>
                <p><strong>Position:</strong> {selectedEmployee.position}</p>
                <p><strong>Clock In:</strong> {selectedEmployee.clockIn}</p>
                <p><strong>Clock Out:</strong> {selectedEmployee.clockOut}</p>
                <p><strong>Work Hours:</strong> {selectedEmployee.workHours}</p>
                <p><strong>Status:</strong> {selectedEmployee.status}</p>
              </div>
            </DialogDescription>
            <DialogFooter>
              <Button onClick={() => onOpenChange(false)}>Close</Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeDialog;