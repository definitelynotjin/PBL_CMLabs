import { Statistics } from "./Statistics" // Assuming Statistics component shows relevant HRIS stats
import Image from "next/image"
// Import your images from the assets folder
import work from "../assets/work.jpeg" // Assuming 'work.jpeg' is in the 'assets' folder
import work2 from "../assets/work2.jpg" // Assuming 'work2.jpg' is in the 'assets' folder

export const About = () => {
  return (
    <section id="about" className="flex justify-center py-24 sm:py-32">
      <div className="bg-muted/50 border rounded-lg py-12 px-6 w-full max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12">
          {/* Container for the two images - Changed to always flex-col */}
          <div className="flex flex-col items-center justify-center gap-6">
            <Image
              src={work} // Use the imported image variable
              alt="Work illustration 1"
              width={260}
              height={260}
              className="object-contain rounded-lg"
            />
            <Image
              src={work2} // Use the imported image variable
              alt="Work illustration 2"
              width={260}
              height={260}
              className="object-contain rounded-lg"
            />
          </div>
          <div className="flex flex-col items-center md:items-start text-center md:text-left justify-center max-w-xl">
            <h2 className="text-3xl md:text-4xl font-bold">
              <span className="text-[#7CA5BF]">About</span> Our HRIS Solution
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
              Our Human Resource Information System (HRIS) is designed to streamline and simplify HR activities and tasks for teams. This application, developed in both website and mobile versions, focuses on key features such as employee data management, official correspondence, attendance tracking, and overtime. It also includes a paid subscription feature using the Xendit payment gateway.
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