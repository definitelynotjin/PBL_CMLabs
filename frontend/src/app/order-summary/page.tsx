'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import PackageSelection from '@/components/order-summary/package-selection'
import TeamSizeSelection from '@/components/order-summary/team-size-selection'
import EmployeeCount from '@/components/order-summary/employee-count'
import OrderDetails from '@/components/order-summary/order-detail'
import Sidebar from '@/components/sidebar'

export default function OrderSummaryPage() {
  const [billing, setBilling] = useState('single')
  const [teamSize, setTeamSize] = useState('1-50')
  const [employees, setEmployees] = useState(2)
  const pricePerUser = 17000

  const total = employees * pricePerUser

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar /> {/* Include the sidebar here */}
      <div className="flex flex-col items-center justify-center w-full px-8 py-12 md:flex-row md:items-start md:justify-between md:px-32 md:py-16">
        <div className="w-full max-w-xl space-y-8">
          <Image src="/HRIS.png" alt="Logo" width={60} height={60} />
          
          <PackageSelection setBilling={setBilling} billing={billing} />
          <TeamSizeSelection teamSize={teamSize} setTeamSize={setTeamSize} />
          <EmployeeCount employees={employees} setEmployees={setEmployees} />

          <Button className="w-full mt-8 border border-black text-black hover:text-white hover:bg-black">
            Continue to Payment
          </Button>
        </div>

        <OrderDetails billing={billing} teamSize={teamSize} employees={employees} pricePerUser={pricePerUser} total={total} />
      </div>
    </div>
  )
}