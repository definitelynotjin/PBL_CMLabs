import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface TeamProps {
  name: string;
  studentId: string;
  socialNetworks: SociaNetworkslProps[];
}

interface SociaNetworkslProps {
  name: string;
  url: string;
}

const teamList: TeamProps[] = [
  {
    name: "Gastiadirijal N.K.",
    studentId: "2241720001",
    socialNetworks: [
      { name: "Linkedin", url: "https://www.linkedin.com/in/gastiadirijal-n-k/" },
    ],
  },
  {
    name: "Lenka Melinda Florienka",
    studentId: "2241720074",
    socialNetworks: [
      { name: "Linkedin", url: "https://www.linkedin.com/in/lenka-melinda/" },
    ],
  },
  {
    name: "Malik Abdul Azis",
    studentId: "2241720024",
    socialNetworks: [
      { name: "Linkedin", url: "https://www.linkedin.com/in/malik-abdul-azis/" },
    ],
  },
];

export const Team = () => {
  const socialIcon = (iconName: string) => {
    switch (iconName) {
      case "Linkedin":
        return <Linkedin size={20} />;
      case "Facebook":
        return <Facebook size={20} />;
      case "Instagram":
        return <Instagram size={20} />;
      default:
        return null;
    }
  };

  return (
    <section id="team" className="max-w-6xl mx-auto px-4 py-24 sm:py-32">
      <h2 className="text-3xl md:text-4xl font-bold text-center">
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Our Dedicated{" "}
        </span>
        Team
      </h2>

      <p className="mt-4 mb-10 text-xl text-muted-foreground text-center max-w-2xl mx-auto">
        Meet the talented individuals behind the development of our Human Resource Information System for the Project Based Learning (PBL) Agenda.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
        {teamList.map(({ name, studentId, socialNetworks }: TeamProps) => (
          <Card
            key={studentId}
            className="bg-muted/50 relative pt-20 pb-6 px-6 flex flex-col items-center text-center w-full max-w-xs"
          >
            {/* Anonymous Avatar */}
            <div className="absolute -top-12">
              <Avatar className="w-24 h-24 bg-gray-300 border-4 border-white shadow-md">
                <AvatarFallback className="text-3xl font-bold text-gray-600">
                  {name
                    .split(" ")
                    .map((word) => word[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Nama dan NIM */}
            <CardHeader className="pt-4 text-center">
              <CardTitle className="text-lg font-semibold">{name}</CardTitle>
              <CardDescription className="text-primary text-sm">
                {studentId}
              </CardDescription>
            </CardHeader>

            {/* Institusi */}
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Politeknik Negeri Malang
              </p>
            </CardContent>

            {/* Social Media */}
            <CardFooter className="gap-2">
              {socialNetworks.map(({ name: socialName, url }) => (
                <a
                  key={socialName}
                  rel="noreferrer noopener"
                  href={url}
                  target="_blank"
                  className={buttonVariants({ variant: "ghost", size: "sm" })}
                >
                  <span className="sr-only">{socialName} icon</span>
                  {socialIcon(socialName)}
                </a>
              ))}
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};
