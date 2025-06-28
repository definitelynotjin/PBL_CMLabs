import {
    Dialog,
    DialogContentCentered,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeleteConfirmDialogProps {
    showDeleteConfirm: boolean;
    setShowDeleteConfirm: (value: boolean) => void;
    handleDeleteConfirm: () => void;
    documentName?: string;
}

export const DeleteConfirmDialog = ({
    showDeleteConfirm,
    setShowDeleteConfirm,
    handleDeleteConfirm,
    documentName = "this document",
}: DeleteConfirmDialogProps) => {
    return (
        <Dialog
            open={showDeleteConfirm}
            onOpenChange={(open) => {
                if (!open) setShowDeleteConfirm(false);
            }}
        >
            <DialogContentCentered className="max-w-md w-full">
                <DialogHeader>
                    <DialogTitle>Delete Document</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete <strong>{documentName}</strong>? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>
                        Cancel
                    </Button>
                    <Button variant="destructive" onClick={handleDeleteConfirm}>
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContentCentered>
        </Dialog>
    );
};
