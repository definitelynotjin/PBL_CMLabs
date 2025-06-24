import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ConfirmDialogProps {
  showConfirmModal: boolean;
  setShowConfirmModal: (value: boolean) => void;
  handleConfirmAction: () => void;
  confirmAction: 'approve' | 'reject' | null;
}

export const ConfirmDialog = ({ showConfirmModal, setShowConfirmModal, handleConfirmAction, confirmAction }: ConfirmDialogProps) => {
  return (
    <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{confirmAction === 'approve' ? 'Approve Attendance' : 'Reject Attendance'}</DialogTitle>
          <DialogDescription>
            Are you sure you want to {confirmAction} this employees attendance? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowConfirmModal(false)}>Cancel</Button>
          <Button onClick={handleConfirmAction}>{confirmAction === 'approve' ? 'Approve' : 'Reject'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};