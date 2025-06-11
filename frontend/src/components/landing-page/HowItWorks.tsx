import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// Importing new icons that better represent HRIS features
import { UserCog, FileText, Clock, DollarSign } from "lucide-react";
import { JSX } from "react";

interface FeatureProps {
  icon: JSX.Element;
  title: string;
  description: string; // Added 'description' to the interface
}

const features: FeatureProps[] = [
  {
    icon: <UserCog size={34} />, // Icon for employee management
    title: "Employee Data Management",
    description:
      "Easily manage comprehensive employee information, including personal data, job details, promotion history, and more. Admins can add, edit, view, delete, import, and export employee data in .CSV format.",
  },
  {
    icon: <FileText size={34} />, // Icon for letter/document management
    title: "Letter & Document Management",
    description:
      "Handle important employment documents like work contracts, training certificates, and evaluation documents. Keep performance records and awards up-to-date with easy adding, editing, viewing, and deleting features.",
  },
  {
    icon: <Clock size={34} />, // Icon for attendance/check-clock
    title: "Attendance Management",
    description:
      "Manage employee attendance with flexible check-clock settings, including geolocation, WFO/WFA/Hybrid types, and customizable work schedules. Track clock-in/out times, breaks, and automatic遅延 and 'not present' flagging.",
  },
  {
    icon: <DollarSign size={34} />, // Icon for payment/subscription or overtime
    title: "Subscription & Overtime Management",
    description:
      "Our 'Pay-as-you-go' pricing model calculates usage based on the total number of employees per month. Integrate with payment gateways like Xendit for seamless transactions. Manage overtime types, rates (government or custom), and track employee overtime hours with estimated nominal amounts.",
  },
];

export const HowItWorks = () => {
  return (
    <section
      id="howItWorks"
      className="min-h-screen flex items-center justify-center flex-col text-center px-4 py-16"
    >
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold">
          Key{" "}
          <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
            Features
          </span>{" "}
          of Our HRIS
        </h2>
        <p className="md:w-3/4 mx-auto mt-4 mb-8 text-xl text-muted-foreground">
          Discover the core functionalities that make our Human Resource Information System an indispensable tool for your HR team.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map(({ icon, title, description }: FeatureProps) => ( // Destructuring 'description' correctly
            <Card key={title} className="bg-muted/50">
              <CardHeader>
                <CardTitle className="grid gap-4 place-items-center">
                  {icon}
                  {title}
                </CardTitle>
              </CardHeader>
              <CardContent>{description}</CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};