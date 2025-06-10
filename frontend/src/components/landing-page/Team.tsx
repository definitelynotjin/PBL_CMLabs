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

interface TeamProps {
  imageUrl: string;
  name: string;
  position: string;
  socialNetworks: SociaNetworkslProps[];
}

interface SociaNetworkslProps {
  name: string;
  url: string;
}

const teamList: TeamProps[] = [
  {
    imageUrl: "https://i.pravatar.cc/150?img=35",
    name: "Emma Smith",
    position: "Product Manager",
    socialNetworks: [
      { name: "Linkedin", url: "https://www.linkedin.com/in/leopoldo-miranda/" },
      { name: "Facebook", url: "https://www.facebook.com/" },
      { name: "Instagram", url: "https://www.instagram.com/" },
    ],
  },
  {
    imageUrl: "https://i.pravatar.cc/150?img=60",
    name: "John Doe",
    position: "Tech Lead",
    socialNetworks: [
      { name: "Linkedin", url: "https://www.linkedin.com/in/leopoldo-miranda/" },
      { name: "Facebook", url: "https://www.facebook.com/" },
      { name: "Instagram", url: "https://www.instagram.com/" },
    ],
  },
  {
    imageUrl: "https://i.pravatar.cc/150?img=36",
    name: "Ashley Ross",
    position: "Frontend Developer",
    socialNetworks: [
      { name: "Linkedin", url: "https://www.linkedin.com/in/leopoldo-miranda/" },
      { name: "Instagram", url: "https://www.instagram.com/" },
    ],
  },
  {
    imageUrl: "https://i.pravatar.cc/150?img=17",
    name: "Bruce Rogers",
    position: "Backend Developer",
    socialNetworks: [
      { name: "Linkedin", url: "https://www.linkedin.com/in/leopoldo-miranda/" },
      { name: "Facebook", url: "https://www.facebook.com/" },
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
    }
  };

  return (
    <section id="team" className="max-w-6xl mx-auto px-4 py-24 sm:py-32">
      <h2 className="text-3xl md:text-4xl font-bold text-center">
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Our Dedicated{" "}
        </span>
        Crew
      </h2>

      <p className="mt-4 mb-10 text-xl text-muted-foreground text-center max-w-2xl mx-auto">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis
        dolor pariatur sit!
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
        {teamList.map(({ imageUrl, name, position, socialNetworks }: TeamProps) => (
          <Card
            key={name}
            className="bg-muted/50 relative pt-16 flex flex-col items-center text-center w-full max-w-xs"
          >
            <img
              src={imageUrl}
              alt={`${name} ${position}`}
              className="absolute -top-12 rounded-full w-24 h-24 object-cover border-4 border-white shadow-md"
            />
            <CardHeader className="pb-2">
              <CardTitle>{name}</CardTitle>
              <CardDescription className="text-primary">{position}</CardDescription>
            </CardHeader>

            <CardContent className="pb-2">
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            </CardContent>

            <CardFooter className="gap-2">
              {socialNetworks.map(({ name, url }: SociaNetworkslProps) => (
                <a
                  key={name}
                  rel="noreferrer noopener"
                  href={url}
                  target="_blank"
                  className={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                  })}
                >
                  <span className="sr-only">{name} icon</span>
                  {socialIcon(name)}
                </a>
              ))}
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};
