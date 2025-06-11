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
  priceDetails: string; // Updated to reflect varying price descriptions
  description: string;
  buttonText: string;
  benefitList: string[];
}

const pricingList: PricingProps[] = [
  {
    title: "Basic",
    popular: PopularPlanType.NO,
    priceDetails: "Contact for Pricing", // Placeholder, as no price is given
    description: "Recommended for small businesses seeking essential HR automation.",
    buttonText: "Select a Package",
    benefitList: [
      "GPS-based attendance validation",
      "Employee data management",
      "Leave & time-off requests",
      "Overtime management (government regulations)",
      "Fixed work schedule management",
      "Automatic tax calculation",
    ],
  },
  {
    title: "Premium",
    popular: PopularPlanType.YES,
    priceDetails: "Contact for Pricing", // Placeholder
    description: "Best for growing businesses needing comprehensive HR solutions.",
    buttonText: "Select a Package",
    benefitList: [
      "All Basic features",
      "Clock-in & clock-out attendance settings",
      "Fingerprint integration",
      "Employee document management",
      "Sick leave & time-off settings",
      "Shift management",
      "Comprehensive reports",
      "Overtime management (government & custom regulations)",
    ],
  },
  {
    title: "Ultra",
    popular: PopularPlanType.NO,
    priceDetails: "Contact for Pricing", // Placeholder
    description: "Ideal for large enterprises requiring advanced HR functionalities and analytics.",
    buttonText: "Select a Package",
    benefitList: [
      "All Premium features",
      "Face recognition",
      "Automated check-out attendance",
      "Employee turnover dashboard",
      "Custom dashboard for statistics & analysis",
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
          HRIS{" "}
          <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
            Pricing Plans
          </span>
        </h2>
        <h3 className="text-xl text-center text-muted-foreground pt-4 pb-8">
          Choose the plan that best suits your business! This HRIS offers both subscription and pay-as-you-go payment options, available in the following packages:
        </h3>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {pricingList.map((pricing: PricingProps) => (
            <Card
              key={pricing.title}
              className={`mx-auto w-full max-w-md ${
                pricing.popular === PopularPlanType.YES
                  ? "drop-shadow-xl shadow-black/10 dark:shadow-white/10 border-primary"
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
                  <span className="text-2xl font-bold">{pricing.priceDetails}</span>
                </div>
                <CardDescription className="mt-2">{pricing.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <Button className="w-full">{pricing.buttonText}</Button>
              </CardContent>

              <hr className="w-4/5 mx-auto my-4 border-muted" />

              <CardFooter className="flex justify-center">
                <div className="space-y-3 text-left">
                  {pricing.benefitList.map((benefit: string) => (
                    <div key={benefit} className="flex items-start text-sm">
                      <Check className="text-green-500 mr-2 w-4 h-4 mt-1 flex-shrink-0" />
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