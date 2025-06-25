'use client';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface UserCheckClockViewDialogProps {
    openDialog: boolean;
    setOpenDialog: (value: boolean) => void;
    selectedRecord: any; // Ideally typed, but for now allow any
}

export const UserCheckClockViewDialog = ({
    openDialog,
    setOpenDialog,
    selectedRecord,
}: UserCheckClockViewDialogProps) => {
    const getStatusColor = (status: string) => {
        switch (status?.toLowerCase()) {
            case "approved":
                return "text-green-600";
            case "rejected":
                return "text-red-600";
            case "late":
                return "text-yellow-600";
            case "early":
                return "text-orange-600";
            default:
                return "text-gray-600";
        }
    };

    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent className="fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-xl overflow-y-auto p-6 animate-in slide-in-from-right duration-300 z-[9999]">
                {selectedRecord && (
                    <div className="space-y-6">
                        {/* 🟦 Employee Info */}
                        <div className="flex items-center gap-4 border-b pb-4">
                            <Image
                                src={selectedRecord.avatar || "/placeholder-avatar.png"}
                                alt={selectedRecord.name || "User"}
                                width={64}
                                height={64}
                                className="rounded-full object-cover"
                            />
                            <div className="flex-1">
                                <h2 className="text-lg font-semibold">{selectedRecord.name}</h2>
                                <p className="text-[#7CA5BF]">
                                    {selectedRecord.position || "-"} &mdash; {selectedRecord.ck_setting?.name || "Unknown"}
                                </p>
                                <span className={`text-sm font-medium ${getStatusColor(selectedRecord.status)}`}>
                                    {selectedRecord.status || "Unknown Status"}
                                </span>
                            </div>
                        </div>

                        {/* 🟨 Attendance Info */}
                        <div className="space-y-2 border-b pb-4">
                            <h3 className="text-base font-semibold">Attendance Information</h3>
                            <p><strong>Clock Type:</strong> {selectedRecord.check_clock_type === "1" ? "Clock In" : "Clock Out"}</p>
                            <p><strong>Time:</strong> {selectedRecord.check_clock_time}</p>
                            <p><strong>Date:</strong> {selectedRecord.date}</p>
                            <p><strong>Latitude:</strong> {selectedRecord.latitude || "-"}</p>
                            <p><strong>Longitude:</strong> {selectedRecord.longitude || "-"}</p>
                        </div>

                        {/* 🟩 Supporting File */}
                        <div className="space-y-2">
                            <h3 className="text-base font-semibold">Proof of Attendance</h3>
                            {selectedRecord.supporting_document_path ? (
                                <div className="mt-2">
                                    {selectedRecord.supporting_document_path.endsWith(".pdf") ? (
                                        <a
                                            href={`https://pblcmlabs.duckdns.org/storage/${selectedRecord.supporting_document_path}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 underline text-sm"
                                        >
                                            View Uploaded PDF
                                        </a>
                                    ) : (
                                        <Image
                                            src={`https://pblcmlabs.duckdns.org/storage/${selectedRecord.supporting_document_path}`}
                                            alt="Proof of attendance"
                                            width={320}
                                            height={180}
                                            className="rounded border"
                                        />
                                    )}
                                </div>
                            ) : (
                                <p className="text-sm text-muted-foreground">No proof uploaded.</p>
                            )}
                        </div>

                        {/* Close Button */}
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
