import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";

enum PopularPlanType {
  NO = 0,
  YES = 1,
}

interface PricingProps {
  title: string;
  popular: PopularPlanType;
  price: number;
  description: string;
  buttonText: string;
  benefitList: string[];
}

const pricingList: PricingProps[] = [
  {
    title: "Free",
    popular: 0,
    price: 0,
    description:
      "Lorem ipsum dolor sit, amet ipsum consectetur adipisicing elit.",
    buttonText: "Get Started",
    benefitList: [
      "1 Team member",
      "2 GB Storage",
      "Upto 4 pages",
      "Community support",
      "lorem ipsum dolor",
    ],
  },
  {
    title: "Premium",
    popular: 1,
    price: 5,
    description:
      "Lorem ipsum dolor sit, amet ipsum consectetur adipisicing elit.",
    buttonText: "Start Free Trial",
    benefitList: [
      "4 Team member",
      "4 GB Storage",
      "Upto 6 pages",
      "Priority support",
      "lorem ipsum dolor",
    ],
  },
  {
    title: "Enterprise",
    popular: 0,
    price: 40,
    description:
      "Lorem ipsum dolor sit, amet ipsum consectetur adipisicing elit.",
    buttonText: "Contact US",
    benefitList: [
      "10 Team member",
      "8 GB Storage",
      "Upto 10 pages",
      "Priority support",
      "lorem ipsum dolor",
    ],
  },
];

export const Pricing = () => {
  return (
    <section
      id="pricing"
      className="min-h-screen flex items-center justify-center flex-col text-center px-4 py-16"
    >
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold text-center">
          Get
          <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
            {" "}Unlimited{" "}
          </span>
          Access
        </h2>
        <h3 className="text-xl text-center text-muted-foreground pt-4 pb-8">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias reiciendis.
        </h3>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {pricingList.map((pricing: PricingProps) => (
            <Card
              key={pricing.title}
              className={`mx-auto w-full max-w-md ${
                pricing.popular === PopularPlanType.YES
                  ? "drop-shadow-xl shadow-black/10 dark:shadow-white/10"
                  : ""
              }`}
            >
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2">
                  {pricing.title}
                  {pricing.popular === PopularPlanType.YES && (
                    <Badge variant="secondary" className="text-sm text-primary">
                      Most popular
                    </Badge>
                  )}
                </CardTitle>
                <div className="mt-2">
                  <span className="text-3xl font-bold">${pricing.price}</span>
                  <span className="text-muted-foreground"> /month</span>
                </div>
                <CardDescription className="mt-2">{pricing.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <Button className="w-full">{pricing.buttonText}</Button>
              </CardContent>

              <hr className="w-4/5 mx-auto my-4 border-muted" />

              <CardFooter className="flex justify-center">
                <div className="space-y-3">
                  {pricing.benefitList.map((benefit: string) => (
                    <div key={benefit} className="flex items-center text-sm">
                      <Check className="text-green-500 mr-2 w-4 h-4" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
