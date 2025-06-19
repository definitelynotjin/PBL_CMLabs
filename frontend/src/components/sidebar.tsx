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

const iconClass = "w-5 h-5 text-[#1E3A5F] hover:text-[#7CA5BF] transition-colors duration-200";

const Sidebar: React.FC = () => (
  <TooltipProvider>
    <aside className="w-16 h-screen flex flex-col justify-between items-center bg-gray-100 py-4">
      <div className="flex flex-col items-center gap-6">
        <Image src="/HRIS.png" alt="Logo" width={32} height={32} />
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="/dashboard">
              <LayoutDashboard className={iconClass} />
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">
            Dashboard
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="/employee-database">
              <Users className={iconClass} />
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">
            Employee Database
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="/checkclock-admin">
              <Clock className={iconClass} />
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">
            Check Clock
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="/pricing-package">
              <WalletMinimal className={iconClass} />
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">
            Pricing Package
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="/order-summary">
              <ShoppingCart className={iconClass} />
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">
            Order Summary
          </TooltipContent>
        </Tooltip>
        
      </div>
    </aside>
  </TooltipProvider>
);

export default Sidebar;
