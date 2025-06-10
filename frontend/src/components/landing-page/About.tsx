import { Statistics } from "./Statistics"
import Image from "next/image"
import pilot from "../assets/pilot.png"

export const About = () => {
  return (
    <section id="about" className="flex justify-center py-24 sm:py-32">
      <div className="bg-muted/50 border rounded-lg py-12 px-6 w-full max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12">
          <Image
            src={pilot}
            alt="Pilot image"
            width={260}
            height={260}
            className="object-contain rounded-lg"
          />
          <div className="flex flex-col items-center md:items-start text-center md:text-left justify-center max-w-xl">
            <h2 className="text-3xl md:text-4xl font-bold">
              <span className="text-green-600">About</span> Company
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit
              amet, consectetur adipiscing elit.
            </p>
            <div className="mt-6 w-full">
              <Statistics />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
