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

export const ViewDialog = ({ openDialog, setOpenDialog, selectedEmployee }: ViewDialogProps) => {
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent>
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