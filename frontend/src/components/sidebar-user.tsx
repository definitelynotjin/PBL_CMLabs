'use client'

import Link from "next/link";
import Image from "next/image";
import {
  Clock,
  LayoutDashboard,
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
    <aside className="w-16 h-screen sticky top-0 flex flex-col justify-between items-center bg-[#1E3A5F] py-4 overflow-y-auto">
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
            <Link href="/dashboard-user">
              <LayoutDashboard className={iconClass} />
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">
            Dashboard
          </TooltipContent>
        </Tooltip>


        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="/checkclock">
              <Clock className={iconClass} />
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">
            Check Clock
          </TooltipContent>
        </Tooltip>

      </div>
    </aside>
  </TooltipProvider>
);

export default Sidebar;
