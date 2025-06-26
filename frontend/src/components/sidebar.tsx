'use client'

import Link from "next/link";
import Image from "next/image";
import {
  Users,
  Clock,
  LayoutDashboard,
  ShoppingCart,
  WalletMinimal
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";

const iconClass = "w-5 h-5 text-white hover:text-[#7CA5BF] transition-colors duration-200";

const Sidebar: React.FC = () => (
  <TooltipProvider>
    <aside className="w-16 h-screen sticky top-0 flex flex-col justify-between items-center bg-[#1E3A5F] py-4">
      <div className="flex flex-col items-center gap-10">
        <Image
          src="/HRIS_White_Transparent.png"
          alt="Logo"
          width={28}
          height={28}
          className="mb-8"
        />

        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="/dashboard" className="group flex flex-col items-center gap-2">
              <LayoutDashboard className={iconClass} />
              <div className="h-0.5 w-4 bg-white transform scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-300 rounded" />
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Dashboard</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="/employee-database" className="group flex flex-col items-center gap-2">
              <Users className={iconClass} />
              <div className="h-0.5 w-4 bg-white transform scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-300 rounded" />
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Employee Database</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="/checkclock-admin" className="group flex flex-col items-center gap-2">
              <Clock className={iconClass} />
              <div className="h-0.5 w-4 bg-white transform scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-300 rounded" />
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Check Clock</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="/pricing-package" className="group flex flex-col items-center gap-2">
              <WalletMinimal className={iconClass} />
              <div className="h-0.5 w-4 bg-white transform scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-300 rounded" />
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Pricing Package</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="/order-summary" className="group flex flex-col items-center gap-2">
              <ShoppingCart className={iconClass} />
              <div className="h-0.5 w-4 bg-white transform scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-300 rounded" />
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Order Summary</TooltipContent>
        </Tooltip>

      </div>
    </aside>
  </TooltipProvider>
);

export default Sidebar;
