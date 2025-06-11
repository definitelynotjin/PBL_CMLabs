import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// Importing new icons to better represent consultation, support, and technical aspects
import { Wrench, Handshake, MonitorCheck } from "lucide-react";
import cubeLeg from "../assets/cube-leg.png"; // Placeholder image - consider replacing with an image related to support or implementation
import Image from "next/image";
import { JSX } from "react";

interface ServiceProps {
  title: string;
  description: string;
  icon: JSX.Element;
}

const serviceList: ServiceProps[] = [
  {
    title: "Technical Consultancies",
    description:
      "Leverage our expertise in Next.js, Laravel, and MySQL to ensure your HRIS application is built on a solid and efficient technical foundation, meeting all specified requirements.",
    icon: <Wrench size={24} />, // Icon for technical support/consultation
  },
  {
    title: "Integration & Implementation Support",
    description:
      "We provide seamless integration support, especially for critical components like Xendit Payment Gateway, ensuring smooth deployment and operation of all HRIS features, including paid subscriptions.",
    icon: <Handshake size={24} />, // Icon for partnership/support
  },
  {
    title: "Ongoing System Monitoring & Optimization",
    description:
      "Our team offers continuous monitoring and optimization support for the HRIS, ensuring its performance, scalability, and security to meet your evolving HR needs and employee management tasks.",
    icon: <MonitorCheck size={24} />, // Icon for monitoring/checking
  },
];

export const Services = () => {
  return (
    <section className="h-screen flex items-center justify-center">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 place-items-center">
          {/* Content */}
          <div className="w-full">
            <h2 className="text-3xl md:text-4xl font-bold text-center lg:text-left">
              <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                Comprehensive{" "}
              </span>
              Support for Your HRIS
            </h2>

            <p className="text-muted-foreground text-xl mt-4 mb-8 text-center lg:text-left">
              Beyond development, we offer a range of services to ensure your Human Resource Information System operates flawlessly and efficiently.
            </p>

            <div className="flex flex-col gap-6">
              {serviceList.map(({ icon, title, description }: ServiceProps) => (
                <Card key={title} className="p-4">
                  <CardHeader className="flex flex-row items-start gap-4 p-0">
                    <div className="mt-1 bg-primary/20 p-2 rounded-2xl">
                      {icon}
                    </div>
                    <div>
                      <CardTitle>{title}</CardTitle>
                      <CardDescription className="text-md mt-2">
                        {description}
                      </CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="flex justify-center">
            <Image
              src={cubeLeg} // Consider replacing this with an image that represents support, technology, or services
              alt="About services"
              className="object-contain max-w-[300px] md:max-w-[450px] lg:max-w-[600px] w-full h-auto"
              width={600}
              height={400}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};