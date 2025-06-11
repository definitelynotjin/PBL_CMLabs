import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Check, Linkedin } from "lucide-react";
import { LightBulbIcon } from "./Icons";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export const HeroCards = () => {
  return (
    <div className="hidden lg:flex w-full h-[680px] justify-center items-center relative"> {/* Increased overall height for more breathing room */}
      {/* Adjusted inner container size for a more clustered, synchronized look */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[550px]">

        {/* Testimonial Card - Top-left, slightly offset, base layer */}
        <Card className="absolute w-[340px] top-[10%] left-[5%] drop-shadow-xl shadow-black/10 dark:shadow-white/10 z-10">
          <CardHeader className="flex flex-row items-center gap-4 pb-2">
            <Avatar>
              <AvatarImage alt="User Avatar" src="https://i.pravatar.cc/150?img=20" />
              <AvatarFallback>AS</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <CardTitle className="text-lg">Anya Sharma</CardTitle>
              <CardDescription>HR Administrator</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            This HRIS system has transformed our workflow efficiency!
          </CardContent>
        </Card>

        {/* HR Manager Card - Top-right, overlaps slightly with Testimonial, higher z-index */}
        <Card className="absolute right-[5%] top-[5%] w-80 flex flex-col justify-center items-center drop-shadow-xl shadow-black/10 dark:shadow-white/10 z-20">
          <CardHeader className="mt-8 flex justify-center items-center pb-2">
            <img
              src="https://i.pravatar.cc/150?img=68"
              alt="Manager Avatar"
              className="absolute grayscale-[0%] -top-12 rounded-full w-24 h-24 aspect-square object-cover"
            />
            <CardTitle className="text-center">David Lee</CardTitle>
            <CardDescription className="font-normal text-primary">
              HR Manager
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center pb-2">
            <p>
              Manages employee data & attendance with ease, saving countless HR hours weekly!
            </p>
          </CardContent>
          <CardFooter>
            <div>
              <a
                rel="noreferrer noopener"
                href="#"
                target="_blank"
                className={buttonVariants({
                  variant: "ghost",
                  size: "sm",
                })}
              >
                <span className="sr-only">Github icon</span>
                <GitHubLogoIcon className="w-5 h-5" />
              </a>
              <a
                rel="noreferrer noopener"
                href="#"
                target="_blank"
                className={buttonVariants({
                  variant: "ghost",
                  size: "sm",
                })}
              >
                <span className="sr-only">X icon</span>
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-foreground w-5 h-5"
                >
                  <title>X</title>
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                </svg>
              </a>
              <a
                rel="noreferrer noopener"
                href="#"
                target="_blank"
                className={buttonVariants({
                  variant: "ghost",
                  size: "sm",
                })}
              >
                <span className="sr-only">Linkedin icon</span>
                <Linkedin size="20" />
              </a>
            </div>
          </CardFooter>
        </Card>

        {/* Basic Plan Card - Bottom-left, overlaps slightly, lower z-index */}
        <Card className="absolute bottom-[5%] left-[0%] w-72 drop-shadow-xl shadow-black/10 dark:shadow-white/10 z-0">
          <CardHeader>
            <CardTitle className="flex item-center justify-between">
              Basic Plan
              <Badge variant="secondary" className="text-sm text-primary">
                14-Day Trial
              </Badge>
            </CardTitle>
            <div>
              <span className="text-3xl font-bold">Pay-as-you-go</span>
              <span className="text-muted-foreground"> per employee / month</span>
            </div>
            <CardDescription>
              Ideal for small teams exploring core HRIS functions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Start Free Trial</Button>
          </CardContent>
          <hr className="w-4/5 m-auto mb-4" />
          <CardFooter className="flex">
            <div className="space-y-4">
              {[
                "Employee Data Mgt.",
                "Attendance Tracking",
                "Letter Management",
                "Overtime Tracking",
              ].map((benefit: string) => (
                <span key={benefit} className="flex">
                  <Check className="text-green-500" />
                  <h3 className="ml-2">{benefit}</h3>
                </span>
              ))}
            </div>
          </CardFooter>
        </Card>

        {/* Full-spectrum HR Automation Card - Bottom-right, overlaps most, highest z-index */}
        <Card className="absolute w-[350px] right-[0%] bottom-[0%] drop-shadow-xl shadow-black/10 dark:shadow-white/10 z-30">
          <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
            <div className="mt-1 bg-primary/20 p-1 rounded-2xl">
              <LightBulbIcon />
            </div>
            <div>
              <CardTitle>Full-spectrum HR Automation</CardTitle>
              <CardDescription className="text-md mt-2">
                Streamline core tasks like employee data, attendance, and official documents.
              </CardDescription>
            </div>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};