import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export default function DateRangePicker() {
  return (
    <Button variant="outline" className="text-sm flex items-center gap-2">
      Pilih Rentang Tanggal <ChevronDown className="h-4 w-4" />
    </Button>
  );
}
