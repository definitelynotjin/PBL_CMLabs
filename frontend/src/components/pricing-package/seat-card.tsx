import { Button } from "@/components/ui/button"

interface SeatCardProps {
  title: string;
  price: string;
  description: string;
}

export function SeatCard({ title, price, description }: SeatCardProps) {
  return (
    <div className="rounded-xl border bg-muted/10 p-6 text-left shadow-sm space-y-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="text-2xl font-bold">{price}</div>
      <p className="text-sm text-muted-foreground">{description}</p>
      <Button className="w-full mt-2">Choose Seat Plan →</Button>
    </div>
  )
}