import { Button } from "@/components/ui/button"

interface PricingToggleProps {
  activeTab: "package" | "seat";
  setActiveTab: (tab: "package" | "seat") => void;
}

export function PricingToggle({ activeTab, setActiveTab }: PricingToggleProps) {
  return (
    <div className="inline-flex mt-4 bg-muted p-1 rounded-md">
      <Button
        variant={activeTab === "package" ? "default" : "ghost"}
        className={`rounded-md text-sm px-4 py-1.5 ${
          activeTab !== "package" ? "text-muted-foreground" : ""
        }`}
        onClick={() => setActiveTab("package")}
      >
        Package
      </Button>
      <Button
        variant={activeTab === "seat" ? "default" : "ghost"}
        className={`rounded-md text-sm px-4 py-1.5 ${
          activeTab !== "seat" ? "text-muted-foreground" : ""
        }`}
        onClick={() => setActiveTab("seat")}
      >
        Seat
      </Button>
    </div>
  )
}