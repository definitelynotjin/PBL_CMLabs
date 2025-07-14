import {
  Dialog,
  DialogContentCentered, // import your centered dialog content
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

export const ConfirmDialog = ({
  showConfirmModal,
  setShowConfirmModal,
  handleConfirmAction,
  confirmAction,
}: ConfirmDialogProps) => {
  return (
    <Dialog
      open={showConfirmModal}
      onOpenChange={(open) => {
        if (!open) setShowConfirmModal(false);
      }}
    >
      <DialogContentCentered className="max-w-md w-full">
        <DialogHeader>
          <DialogTitle>
            {confirmAction === 'approve' ? 'Approve Attendance' : 'Reject Attendance'}
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to {confirmAction} this employee's attendance? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowConfirmModal(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirmAction}
            variant={confirmAction === 'approve' ? 'default' : 'destructive'}
          >
            {confirmAction === 'approve' ? 'Approve' : 'Reject'}
          </Button>

        </DialogFooter>
      </DialogContentCentered>
    </Dialog>
  );
};
