"use client"

import { useState } from "react"
import { PricingHeader } from "@/components/pricing-package/pricing-header"
import { PricingToggle } from "@/components/pricing-package/pricing-toggle"
import { PackageCard } from "@/components/pricing-package/package-card"
import { SeatCard } from "@/components/pricing-package/seat-card"
import Sidebar from "@/components/sidebar"

export default function HRISPricingPage() {
  const [activeTab, setActiveTab] = useState<"package" | "seat">("package")

  return (
    <div className="min-h-screen bg-white flex">
      <Sidebar /> {/* Include the sidebar here */}
      <div className="flex-1 px-4 py-10 md:px-20 lg:px-32">
        <PricingHeader />

        {/* Center the PricingToggle component */}
        <div className="flex justify-center mb-8">
          <PricingToggle activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        {activeTab === "package" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <PackageCard
              title="Basic"
              description="deskripsi direkomendasikan untuk siapa"
              features={[
                "List fitur",
                "GPS-based attendance validation",
                "Employee data management",
                "Leave & time-off requests",
                "Overtime management (government regulations)",
                "Fixed work schedule management",
                "Automatic tax calculation",
              ]}
            />
            <PackageCard
              title="Premium"
              description="Best for growing business"
              isPremium
              features={[
                "All Standard features",
                "Clock-in & clock-out attendance settings",
                "Fingerprint integration",
                "Employee document management",
                "Sick leave & time-off settings",
                "Shift management",
                "Comprehensive reports",
                "Overtime management (government & custom regulations)",
              ]}
            />
            <PackageCard
              title="Ultra"
              description="deskripsi direkomendasikan untuk siapa"
              features={[
                "All Premium features",
                "Face recognition",
                "Automated check-out attendance",
                "Employee turnover dashboard",
                "Custom dashboard for statistics & analysis",
              ]}
            />
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
    </div>
  )
}