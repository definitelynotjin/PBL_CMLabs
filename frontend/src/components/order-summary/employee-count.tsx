import { Button } from '@/components/ui/button'

interface EmployeeCountProps {
  employees: number;
  setEmployees: (count: number) => void;
}

const EmployeeCount: React.FC<EmployeeCountProps> = ({ employees, setEmployees }) => (
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
);

export default EmployeeCount;