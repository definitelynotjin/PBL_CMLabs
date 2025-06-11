import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import image from "../assets/growth.png"; // Placeholder image for data growth/insights
import image3 from "../assets/reflecting.png"; // Placeholder image for user experience
import image4 from "../assets/looking-ahead.png"; // Placeholder image for future-proofing

import type { StaticImageData } from "next/image";

interface FeatureProps {
  title: string;
  description: string;
  image: StaticImageData;
}

const features: FeatureProps[] = [
  {
    title: "Secure Authentication",
    description: "Secure logins via email/password, Google OAuth, or employee ID for both admin and staff. ",
    image: image4,
  },
  {
    title: "Flexible Attendance Settings",
    description: "Customizable attendance with geolocation, WFO/WFA/Hybrid options, and adjustable work schedules. ",
    image: image3,
  },
  {
    title: "Comprehensive Overtime Management",
    description: "Manage overtime types and rates (government/custom). Track hours and auto-calculate compensation. ",
    image: image,
  },
];

export const Features = () => {
  return (
    <section id="features" className="py-24 sm:py-32 bg-background">
      <div className="container max-w-7xl mx-auto text-center space-y-12">
        <h2 className="text-3xl lg:text-4xl font-bold">
          Empowering Your HR With{" "}
          <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
            Key HRIS Features
          </span>
        </h2>
        <p className="md:w-3/4 mx-auto text-xl text-muted-foreground">
          Our Human Resource Information System offers robust features designed to streamline your HR operations and enhance employee management.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-8 mb-12">
          {features.map(({ title }) => (
            <Badge key={title} variant="secondary" className="text-sm">
              {title}
            </Badge>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map(({ title, description, image }: FeatureProps) => (
            <Card key={title}>
              <CardHeader>
                <CardTitle>{title}</CardTitle>
              </CardHeader>

              <CardContent>{description}</CardContent>

              <CardFooter>
                <img
                  src={image.src}
                  alt={title}
                  className="w-[200px] lg:w-[300px] mx-auto"
                />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};