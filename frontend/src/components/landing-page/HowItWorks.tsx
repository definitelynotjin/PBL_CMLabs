import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// Importing new icons that better represent HRIS features
import { UserCog, FileText, Clock, DollarSign } from "lucide-react";
import { JSX } from "react";

interface FeatureProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

const features: FeatureProps[] = [
  {
    icon: <UserCog size={34} />, // Icon for employee management
    title: "Employee Profile Setup",
    description:
      "Admins efficiently onboard and manage employee profiles, from personal details to job history, with easy import/export options. ",
  },
  {
    icon: <FileText size={34} />, // Icon for letter/document management
    title: "Document & Legal Workflow",
    description:
      "Streamline legalities by creating, managing, and tracking employee documents like contracts, certifications, and performance records. ",
  },
  {
    icon: <Clock size={34} />, // Icon for attendance/check-clock
    title: "Automated Attendance",
    description:
      "Automate attendance tracking with flexible check-clock settings, supporting WFO/WFA/Hybrid work, custom schedules, and late/absence flagging. ",
  },
  {
    icon: <DollarSign size={34} />, // Icon for payment/subscription or overtime
    title: "Flexible Payments & Overtime",
    description:
      "Manage variable overtime policies (government/custom) and seamlessly handle 'Pay-as-you-go' subscriptions via Xendit payment gateway. ",
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
          See How Our HRIS{" "}
          <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
            Streamlines Your Processes
          </span>{" "}
        </h2>
        <p className="md:w-3/4 mx-auto mt-4 mb-8 text-xl text-muted-foreground">
          Explore the simplified workflows and automated tasks that make our Human Resource Information System an indispensable tool for your team.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map(({ icon, title, description }: FeatureProps) => (
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