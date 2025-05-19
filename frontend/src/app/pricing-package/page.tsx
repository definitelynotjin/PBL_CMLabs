"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function HRISPricingPage() {
  const [activeTab, setActiveTab] = useState<"package" | "seat">("package")

  return (
    <div className="min-h-screen bg-white px-4 py-10 md:px-20 lg:px-32">
      <div className="text-center space-y-2 mb-10">
        <h1 className="text-4xl font-bold">HRIS Pricing Plans</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Choose the plan that best suits your business! This HRIS offers both
          subscription and pay-as-you-go payment options, available in the
          following packages:
        </p>

        {/* Toggle Buttons */}
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
      </div>

      {activeTab === "package" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Standard Plan */}
          <div className="rounded-xl border bg-muted/10 p-6 text-left shadow-sm space-y-4">
            <h3 className="text-xl font-semibold">Basic</h3>
            <p className="text-sm text-muted-foreground">
              deskripsi direkomendasikan untuk siapa
            </p>
            <ul className="space-y-2 text-sm">
              {[
                "List fitur",
                "GPS-based attendance validation",
                "Employee data management",
                "Leave & time-off requests",
                "Overtime management (government regulations)",
                "Fixed work schedule management",
                "Automatic tax calculation",
              ].map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <CheckCircle className="text-primary w-4 h-4" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button className="w-full mt-4">Select a Package→</Button>
          </div>

          {/* Premium Plan */}
          <div className="rounded-xl border bg-primary text-white p-6 text-left shadow-lg space-y-4">
            <h3 className="text-xl font-bold">Premium</h3>
            <p className="text-sm text-white/80">Best for growing business</p>
            <ul className="space-y-2 text-sm">
              {[
                "All Standard features",
                "Clock-in & clock-out attendance settings",
                "Fingerprint integration",
                "Employee document management",
                "Sick leave & time-off settings",
                "Shift management",
                "Comprehensive reports",
                "Overtime management (government & custom regulations)",
              ].map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <CheckCircle className="text-white w-4 h-4" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button variant="secondary" className="w-full mt-4 text-primary">
              Select a Package →
            </Button>
          </div>

          {/* Ultra Plan */}
          <div className="rounded-xl border bg-muted/10 p-6 text-left shadow-sm space-y-4">
            <h3 className="text-xl font-semibold">Ultra</h3>
            <p className="text-sm text-muted-foreground">
              deskripsi direkomendasikan untuk siapa
            </p>
            <ul className="space-y-2 text-sm">
              {[
                "All Premium features",
                "Face recognition",
                "Automated check-out attendance",
                "Employee turnover dashboard",
                "Custom dashboard for statistics & analysis",
              ].map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <CheckCircle className="text-primary w-4 h-4" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button className="w-full mt-4">Select a Package →</Button>
          </div>
        </div>
      )}

      {activeTab === "seat" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SeatCard
            title="STANDARD SEAT"
            price="Rp 15.000"
            description="Up to 50 users"
          />
          <SeatCard
            title="PREMIUM SEAT"
            price="Rp 12.000"
            description="Up to 100 users"
          />
          <SeatCard
            title="ULTRA SEAT"
            price="Rp 10.000"
            description="Unlimited users"
          />
        </div>
      )}
    </div>
  )
}

function SeatCard({
  title,
  price,
  description,
}: {
  title: string
  price: string
  description: string
}) {
  return (
    <div className="rounded-xl border bg-muted/10 p-6 text-left shadow-sm space-y-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="text-2xl font-bold">{price}</div>
      <p className="text-sm text-muted-foreground">{description}</p>
      <Button className="w-full mt-2">Choose Seat Plan →</Button>
    </div>
  )
}
