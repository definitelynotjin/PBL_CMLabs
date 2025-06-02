import { Button } from '@/components/ui/button'

interface PackageSelectionProps {
  billing: string;
  setBilling: (billing: string) => void;
}

const PackageSelection: React.FC<PackageSelectionProps> = ({ billing, setBilling }) => {
  return (
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
  )
}

export default PackageSelection;