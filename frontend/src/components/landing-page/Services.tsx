import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MagnifierIcon, WalletIcon, ChartIcon } from "./Icons";
import cubeLeg from "../assets/cube-leg.png";
import Image from "next/image";
import { JSX } from "react";

interface ServiceProps {
  title: string;
  description: string;
  icon: JSX.Element;
}

const serviceList: ServiceProps[] = [
  {
    title: "Code Collaboration",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi nesciunt est nostrum omnis ab sapiente.",
    icon: <ChartIcon />,
  },
  {
    title: "Project Management",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi nesciunt est nostrum omnis ab sapiente.",
    icon: <WalletIcon />,
  },
  {
    title: "Task Automation",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi nesciunt est nostrum omnis ab sapiente.",
    icon: <MagnifierIcon />,
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
                Client-Centric{" "}
              </span>
              Services
            </h2>

            <p className="text-muted-foreground text-xl mt-4 mb-8 text-center lg:text-left">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Veritatis dolor.
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
              src={cubeLeg}
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
