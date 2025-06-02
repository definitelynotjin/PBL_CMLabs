import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

interface PackageCardProps {
  title: string;
  description: string;
  features: string[];
  isPremium?: boolean;
}

export function PackageCard({ title, description, features, isPremium }: PackageCardProps) {
  return (
    <div className={`rounded-xl border ${isPremium ? 'bg-primary text-white' : 'bg-muted/10'} p-6 text-left shadow-sm space-y-4`}>
      <h3 className={`text-xl ${isPremium ? 'font-bold' : 'font-semibold'}`}>{title}</h3>
      <p className={`text-sm ${isPremium ? 'text-white/80' : 'text-muted-foreground'}`}>{description}</p>
      <ul className="space-y-2 text-sm">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <CheckCircle className={`w-4 h-4 ${isPremium ? 'text-white' : 'text-primary'}`} />
            {feature}
          </li>
        ))}
      </ul>
      <Button className={`w-full mt-4 ${isPremium ? 'text-primary' : ''}`}>Select a Package →</Button>
    </div>
  )
}