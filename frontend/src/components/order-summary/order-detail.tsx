import { Button } from '@/components/ui/button'

interface OrderDetailsProps {
  billing: string;
  teamSize: string;
  employees: number;
  pricePerUser: number;
  total: number;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ billing, teamSize, employees, pricePerUser, total }) => (
  <div className="mt-12 w-full max-w-md rounded-md bg-muted p-8 text-sm text-muted-foreground md:mt-0">
    <h3 className="mb-4 text-lg font-semibold text-black">Order Summary</h3>
    <div className="space-y-2">
      <p className="flex justify-between">
        <span>Package</span> <span className="text-black">: Premium</span>
      </p>
      <p className="flex justify-between">
        <span>Billing Period</span>
        <span className="text-black">: {billing === 'single' ? 'Single Payment' : 'Monthly'}</span>
      </p>
      <p className="flex justify-between">
        <span>Team Size</span> <span className="text-black">: {teamSize}</span>
      </p>
      <p className="flex justify-between">
        <span>Number of Employees</span> <span className="text-black">: {employees}</span>
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
);

export default OrderDetails;