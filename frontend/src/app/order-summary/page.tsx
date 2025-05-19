'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

export default function OrderSummaryPage() {
  const [billing, setBilling] = useState('single')
  const [teamSize, setTeamSize] = useState('1-50')
  const [employees, setEmployees] = useState(2)
  const pricePerUser = 17000

  const subtotal = pricePerUser
  const total = employees * pricePerUser

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-white px-8 py-12 md:flex-row md:items-start md:justify-between md:px-32 md:py-16">
      <div className="w-full max-w-xl space-y-8">
        <Image src="/HRIS.png" alt="Logo" width={60} height={60} />

        <div>
          <h1 className="text-xl font-medium">Nama Paket yang dipilih</h1>
          <p className="text-sm text-muted-foreground">
            Upgrade to Premium (Nama Paket)
          </p>
          <p className="text-sm text-primary cursor-pointer mt-1">Change plan</p>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Billing Period</h2>
          <div className="flex gap-2">
            <Button
              variant={billing === 'single' ? 'default' : 'outline'}
              onClick={() => setBilling('single')}
            >
              Single Payment - Rp (harga) / User
            </Button>
            <Button
              variant={billing === 'monthly' ? 'default' : 'outline'}
              onClick={() => setBilling('monthly')}
            >
              Monthly - Rp (harga) / User
            </Button>
          </div>
        </div>

        <div>
          <h2 className="font-semibold mb-1 mt-6">Size Matters</h2>
          <p className="text-sm text-muted-foreground mb-3">
            Choose the right fit for your team!
          </p>

          <RadioGroup
            value={teamSize}
            onValueChange={setTeamSize}
            className="flex gap-6"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1-50" id="size-1" />
              <label htmlFor="size-1" className="text-sm">
                1 - 50
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="51-100" id="size-2" />
              <label htmlFor="size-2" className="text-sm">
                51 - 100
              </label>
            </div>
          </RadioGroup>
        </div>

        <div className="mt-4">
          <h2 className="font-medium mb-2">Number of Employees</h2>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => setEmployees(Math.max(1, employees - 1))}>
              -
            </Button>
            <span className="text-lg font-semibold w-6 text-center">{employees}</span>
            <Button variant="outline" onClick={() => setEmployees(employees + 1)}>
              +
            </Button>
          </div>
        </div>

        <Button className="w-full mt-8 border border-black text-black hover:text-white hover:bg-black">
          Continue to Payment
        </Button>
      </div>

      <div className="mt-12 w-full max-w-md rounded-md bg-muted p-8 text-sm text-muted-foreground md:mt-0">
        <h3 className="mb-4 text-lg font-semibold text-black">Order Summary</h3>
        <div className="space-y-2">
          <p className="flex justify-between">
            <span>Package</span> <span className="text-black">: Premium</span>
          </p>
          <p className="flex justify-between">
            <span>Billing Period</span>{' '}
            <span className="text-black">: {billing === 'single' ? 'Single Payment' : 'Monthly'}<br /> (sesuai pilihan user)</span>
          </p>
          <p className="flex justify-between">
            <span>Team Size</span> <span className="text-black">: {teamSize} (sesuai pilihan user)</span>
          </p>
          <p className="flex justify-between">
            <span>Number of Employees</span> <span className="text-black">: {employees} (sesuai yang diinputkan user)</span>
          </p>
          <p className="flex justify-between">
            <span>Price per User</span> <span className="text-black">: Rp {pricePerUser.toLocaleString()}</span>
          </p>
        </div>

        <hr className="my-4 border-gray-300" />

        <p className="flex justify-between">
          <span>Subtotal</span> <span className="text-black">Rp {pricePerUser.toLocaleString()}</span>
        </p>
        <p className="flex justify-between">
          <span>Tax</span> <span className="text-black">Rp 0.000</span>
        </p>

        <hr className="my-4 border-gray-300" />

        <p className="flex justify-between text-base font-medium text-black">
          <span>Total at renewal</span>
          <span>Rp {total.toLocaleString()}</span>
        </p>

        <Button className="mt-6 w-full" variant="secondary">
          Confirm and upgrade
        </Button>
      </div>
    </div>
  )
}
