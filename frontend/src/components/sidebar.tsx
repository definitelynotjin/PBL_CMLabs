"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Grid,
  Users,
  Clock,
  Calendar,
  MessageCircle,
  Headphones,
  Settings,
} from "lucide-react";

const Sidebar: React.FC = () => (
  <aside className="w-16 h-screen flex flex-col justify-between items-center bg-gray-100 py-4">
    <div className="flex flex-col items-center gap-6">
      <Image src="/HRIS.png" alt="Logo" width={32} height={32} />
      <Link href="/dashboard">
        <Grid className="w-5 h-5 text-gray-600 cursor-pointer" />
      </Link>
      <Link href="/employee-database">
        <Users className="w-5 h-5 text-gray-600 cursor-pointer" />
      </Link>
      <Link href="/checkclock-admin">
        <Clock className="w-5 h-5 text-gray-600 cursor-pointer" />
      </Link>
      <Link href="/pricing-package">
        <Calendar className="w-5 h-5 text-gray-600 cursor-pointer" />
      </Link>
      <Link href="/order-summary">
        <MessageCircle className="w-5 h-5 text-gray-600 cursor-pointer" />
      </Link>
    </div>
    <div className="flex flex-col items-center gap-4 mb-4">
      <Link href="/headphones">
        <Headphones className="w-5 h-5 text-gray-600 cursor-pointer" />
      </Link>
      <Link href="/settings">
        <Settings className="w-5 h-5 text-gray-600 cursor-pointer" />
      </Link>
    </div>
  </aside>
);

export default Sidebar;
