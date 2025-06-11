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
    <div className="hidden lg:flex w-full h-[500px] justify-center items-center relative">
      {/* Increased the size of the inner container slightly to give more room for cards */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[550px] ">
        {/* Testimonial Card - Adjusted top and left for better spacing */}
        <Card className="absolute w-[340px] top-[0px] left-[0px] drop-shadow-xl shadow-black/10 dark:shadow-white/10">
          <CardHeader className="flex flex-row items-center gap-4 pb-2">
            <Avatar>
              <AvatarImage alt="" src="https://github.com/shadcn.png" />
              <AvatarFallback>SH</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <CardTitle className="text-lg">Michael</CardTitle>
              <CardDescription>@mickeeyy</CardDescription>
            </div>
          </CardHeader>
          <CardContent>This Human Resource Information System (HRIS) is a game-changer!</CardContent>
        </Card>

        {/* Team Card - Adjusted top and right for better spacing */}
        <Card className="absolute right-[0px] top-[-20px] w-80 flex flex-col justify-center items-center drop-shadow-xl shadow-black/10 dark:shadow-white/10">
          <CardHeader className="mt-8 flex justify-center items-center pb-2">
            <img
              src="https://i.pravatar.cc/150?img=58"
              alt="user avatar"
              className="absolute grayscale-[0%] -top-12 rounded-full w-24 h-24 aspect-square object-cover"
            />
            <CardTitle className="text-center">Sarah Johnson</CardTitle>
            <CardDescription className="font-normal text-primary">
              HR Manager
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center pb-2">
            <p>
              This HRIS makes managing employee data and attendance so
              much easier. It saves us hours of manual work every week!
            </p>
          </CardContent>
          <CardFooter>
            <div>
              <a
                rel="noreferrer noopener"
                href="https://github.com/leoMirandaa"
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
                href="https://twitter.com/leo_mirand4"
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
                href="https://www.linkedin.com/in/leopoldo-miranda/"
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

        {/* Pricing Card - Adjusted top and left for better spacing */}
        <Card className="absolute top-[200px] left-[0px] w-72 drop-shadow-xl shadow-black/10 dark:shadow-white/10">
          <CardHeader>
            <CardTitle className="flex item-center justify-between">
              Basic
              <Badge variant="secondary" className="text-sm text-primary">
                Most popular
              </Badge>
            </CardTitle>
            <div>
              <span className="text-3xl font-bold">Pay-as-you-go</span>
              <span className="text-muted-foreground"> per employee / month</span>
            </div>
            <CardDescription>
              Ideal for small teams looking for essential HR automation with flexible payment.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Start 14-Day Free Trial</Button>
          </CardContent>
          <hr className="w-4/5 m-auto mb-4" />
          <CardFooter className="flex">
            <div className="space-y-4">
              {["Employee Data Management", "Attendance Tracking", "Letter Management"].map(
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

        {/* Service Card - Adjusted right and bottom for better spacing */}
        <Card className="absolute w-[350px] right-[0px] bottom-[0px] drop-shadow-xl shadow-black/10 dark:shadow-white/10">
          <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
            <div className="mt-1 bg-primary/20 p-1 rounded-2xl">
              <LightBulbIcon />
            </div>
            <div>
              <CardTitle>Comprehensive HR Features</CardTitle>
              <CardDescription className="text-md mt-2">
                Manage employee data, attendance, official letters, and overtime with ease. Our system simplifies HR tasks for both web and mobile users.
              </CardDescription>
            </div>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};