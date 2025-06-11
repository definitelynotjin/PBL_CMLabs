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
import { Check, Linkedin } from "lucide-react"; // Linkedin icon is used for mentor card
import { LightBulbIcon } from "./Icons"; // Used for 'Growth Environment' card
import { GitHubLogoIcon } from "@radix-ui/react-icons"; // Used for mentor card

export const HeroCards = () => {
  return (
    <div className="hidden lg:flex w-full h-[500px] justify-center items-center relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px]">
        {/* Testimonial Card */}
        <Card className="absolute w-[340px] -top-[15px] drop-shadow-xl shadow-black/10 dark:shadow-white/10">
          <CardHeader className="flex flex-row items-center gap-4 pb-2">
            <Avatar>
              {/* Replace with an image of a past intern or generic professional */}
              <AvatarImage alt="Intern Avatar" src="https://i.pravatar.cc/150?img=20" />
              <AvatarFallback>NK</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <CardTitle className="text-lg">Michael Nathanael</CardTitle>
              <CardDescription>@mickeyyy</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            This Human Resource Information System (HRIS) is a game-changer!
          </CardContent>
        </Card>

        {/* Mentor/Team Card */}
        <Card className="absolute right-[20px] top-4 w-80 flex flex-col justify-center items-center drop-shadow-xl shadow-black/10 dark:shadow-white/10">
          <CardHeader className="mt-8 flex justify-center items-center pb-2">
            {/* Replace with an image of a Sarastya mentor or team member */}
            <img
              src="https://i.pravatar.cc/150?img=68"
              alt="Mentor Avatar"
              className="absolute grayscale-[0%] -top-12 rounded-full w-24 h-24 aspect-square object-cover"
            />
            <CardTitle className="text-center">M. Hartigan</CardTitle>
            <CardDescription className="font-normal text-primary">
              HR Manager
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center pb-2">
            <p>
              This HRIS makes managing employee data and attendance so much easier. It saves us hours of manual work every week!
            </p>
          </CardContent>
          <CardFooter>
            {/* Consider updating these links to Sarastya's official profiles or relevant professional profiles */}
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
                href="#" // Link to Sarastya's Twitter/X or a mentor's relevant profile
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
                href="#" // Link to Sarastya's LinkedIn or a mentor's relevant profile
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

        {/* Internship Program Highlights Card (Re-purposed from Pricing Card) */}
        <Card className="absolute top-[150px] left-[50px] w-72 drop-shadow-xl shadow-black/10 dark:shadow-white/10">
          <CardHeader>
            <CardTitle className="flex item-center justify-between">
              Basic
              <Badge variant="secondary" className="text-sm text-primary">
                Pay-As-You-Go
              </Badge>
            </CardTitle>
            {/* Removed pricing section */}
            <CardDescription>
              Our PKL and Internship programs are designed for holistic development, offering a truly immersive experience.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Explore Opportunities</Button> {/* Changed button text */}
          </CardContent>
          <hr className="w-4/5 m-auto mb-4" />
          <CardFooter className="flex">
            <div className="space-y-4">
              {[
                "Dedicated Mentorship",
                "Real-world Projects",
                "Networking Opportunities",
                "Skill Development Workshops",
              ].map((benefit: string) => (
                <span key={benefit} className="flex">
                  <Check className="text-green-500" />
                  <h3 className="ml-2">{benefit}</h3>
                </span>
              ))}
            </div>
          </CardFooter>
        </Card>

        {/* Key Feature/Approach Card (Re-purposed from Service Card) */}
        <Card className="absolute w-[350px] -right-[10px] bottom-[35px] drop-shadow-xl shadow-black/10 dark:shadow-white/10">
          <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
            <div className="mt-1 bg-primary/20 p-1 rounded-2xl">
              <LightBulbIcon /> {/* Icon remains suitable for 'innovation' or 'ideas' */}
            </div>
            <div>
              <CardTitle>Comprehensive HR Features</CardTitle>
              <CardDescription className="text-md mt-2">
                Manage employee data, attendance, official letters, and overtime with ease.
              </CardDescription>
            </div>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};