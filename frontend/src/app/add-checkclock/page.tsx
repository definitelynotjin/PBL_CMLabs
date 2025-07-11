"use client"; // Mark as Client Component for Next.js

import * as React from "react";
import SidebarUser from '@/components/sidebar-user'; // Import the existing Sidebar
import Header from "@/components/add-checkclock/header";
import CheckclockForm from "@/components/add-checkclock/checkclock-form";



const AddCheckclock: React.FC = () => {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="flex min-h-screen bg-white">
      <SidebarUser />
      <div className="flex-1 p-6">
        <Header />
        <CheckclockForm isClient={isClient} />
      </div>
    </div>
  );
};

export default AddCheckclock;
