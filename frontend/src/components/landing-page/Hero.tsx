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
    <div className="hidden lg:flex w-full h-[600px] justify-center items-center relative">
      {/* Increased container size for better spacing */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px]">

        {/* Testimonial Card - Positioned top-left */}
        <Card className="absolute w-[340px] top-0 left-0 drop-shadow-xl shadow-black/10 dark:shadow-white/10">
          <CardHeader className="flex flex-row items-center gap-4 pb-2">
            <Avatar>
              <AvatarImage alt="" src="https://i.pravatar.cc/150?img=20" /> {/* Generic avatar */}
              <AvatarFallback>EC</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <CardTitle className="text-lg">Emily Chen</CardTitle>
              <CardDescription>HR Specialist</CardDescription>
            </div>
          </CardHeader>
          <CardContent>This HRIS is a game-changer for our team efficiency and task management! </CardContent>
        </Card>

        {/* HR Manager / Team Card - Positioned top-right */}
        <Card className="absolute right-0 top-0 w-80 flex flex-col justify-center items-center drop-shadow-xl shadow-black/10 dark:shadow-white/10">
          <CardHeader className="mt-8 flex justify-center items-center pb-2">
            <img
              src="https://i.pravatar.cc/150?img=58" // Generic avatar
              alt="HR Manager Avatar"
              className="absolute grayscale-[0%] -top-12 rounded-full w-24 h-24 aspect-square object-cover"
            />
            <CardTitle className="text-center">Sarah Johnson</CardTitle>
            <CardDescription className="font-normal text-primary">
              HR Manager
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center pb-2">
            <p>
              Manages employee data & attendance with ease. It saves us hours of manual work weekly! 
            </p>
          </CardContent>
          <CardFooter>
            {/* Generic social links, adjust if specific profiles exist */}
            <div>
              <a
                rel="noreferrer noopener"
                href="https://github.com"
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
                href="https://twitter.com"
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
                href="https://linkedin.com"
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

        {/* Flexible Pricing Card - Positioned bottom-left */}
        <Card className="absolute bottom-0 left-0 w-72 drop-shadow-xl shadow-black/10 dark:shadow-white/10">
          <CardHeader>
            <CardTitle className="flex item-center justify-between">
              Flexible Pricing
              <Badge variant="secondary" className="text-sm text-primary">
                Start Free
              </Badge>
            </CardTitle>
            <div>
              <span className="text-3xl font-bold">14-Day Free Trial</span>
              <span className="text-muted-foreground"> / Pay-as-you-go </span>
            </div>
            <CardDescription>
              Tailored plans for all business sizes, including a free trial. 
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Choose Your Plan</Button>
          </CardContent>
          <hr className="w-4/5 m-auto mb-4" />
          <CardFooter className="flex">
            <div className="space-y-4">
              {["Comprehensive HR modules", "Scalable to your needs", "Integrated Payment Gateway"].map(
                (benefit: string) => (
                  <span key={benefit} className="flex">
                    <Check className="text-green-500" />
                    <h3 className="ml-2">{benefit}</h3>
                  </span>
                )
              )}
            </div>
          </CardFooter>
        </Card>

        {/* Streamlined HR Tasks Card - Positioned bottom-right */}
        <Card className="absolute w-[350px] right-0 bottom-0 drop-shadow-xl shadow-black/10 dark:shadow-white/10">
          <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
            <div className="mt-1 bg-primary/20 p-1 rounded-2xl">
              <LightBulbIcon />
            </div>
            <div>
              <CardTitle>Streamlined HR Tasks</CardTitle>
              <CardDescription className="text-md mt-2">
                Manage employee data, attendance, and documents effortlessly on web & mobile versions. 
              </CardDescription>
            </div>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};