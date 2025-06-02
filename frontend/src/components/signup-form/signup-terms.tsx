import { Checkbox } from "@/components/ui/checkbox";

interface SignUpTermsProps {
  terms: boolean;
  onChange: (checked: boolean) => void;
}

const SignUpTerms = ({ terms, onChange }: SignUpTermsProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" checked={terms} onCheckedChange={onChange} />
      <label htmlFor="terms" className="text-sm font-medium leading-none">
        I agree with the terms of use of HRIS
      </label>
    </div>
  );
};

export default SignUpTerms;