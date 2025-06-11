import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Facebook, Instagram, Linkedin } from "lucide-react"; // Only use what's necessary
import { Avatar, AvatarFallback } from "@/components/ui/avatar"; // Import Avatar components

interface TeamProps {
  // imageUrl: string; // Removed as requested, using AvatarFallback instead
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
      { name: "Linkedin", url: "https://www.linkedin.com/in/gastiadirijal-n-k/" }, // Placeholder URL
    ],
  },
  {
    name: "Lenka Melinda Florienka",
    studentId: "2241720074",
    socialNetworks: [
      { name: "Linkedin", url: "https://www.linkedin.com/in/lenka-melinda/" }, // Placeholder URL
    ],
  },
  {
    name: "Malik Abdul Azis",
    studentId: "2241720024", // Corrected student ID based on input
    socialNetworks: [
      { name: "Linkedin", url: "https://www.linkedin.com/in/malik-abdul-azis/" }, // Placeholder URL
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

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {teamList.map(({ name, studentId, socialNetworks }: TeamProps) => (
          <Card
            key={studentId} // Using studentId as key for uniqueness
            className="bg-muted/50 relative pt-16 flex flex-col items-center text-center w-full max-w-xs" // pt-16 creates space for avatar
          >
            {/* Anonymous Avatar */}
            <div className="absolute -top-12 rounded-full w-24 h-24 flex items-center justify-center bg-gray-200 border-4 border-white shadow-md overflow-hidden">
                <Avatar className="w-24 h-24"> {/* Avatar component wrapper */}
                  {/* Using AvatarFallback to display initials for anonymity */}
                  <AvatarFallback className="text-4xl font-bold text-gray-600 bg-gray-300">
                    {name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
            </div>
            {/* Name and Student ID under avatar */}
            <CardHeader className="pb-2 pt-8 text-center"> {/* Added pt-8 to push content down, text-center for explicit centering */}
              <CardTitle className="text-lg font-semibold">{name}</CardTitle>
              <CardDescription className="text-primary text-sm">{studentId}</CardDescription> {/* Reduced font size for student ID */}
            </CardHeader>

            <CardContent className="pb-2">
              <p className="text-sm">Politeknik Negeri Malang</p>
            </CardContent>

            <CardFooter className="gap-2 pt-0"> {/* Adjusted padding */}
              {socialNetworks.map(({ name: socialName, url }: SociaNetworkslProps) => (
                <a
                  key={socialName}
                  rel="noreferrer noopener"
                  href={url}
                  target="_blank"
                  className={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                  })}
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