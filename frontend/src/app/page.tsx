"use client";

import "./App.css";

// Landing Page Components
import { Navbar } from "@/components/landing-page/Navbar";
import { Hero } from "@/components/landing-page/Hero";
import { Sponsors } from "@/components/landing-page/Sponsors";
import { About } from "@/components/landing-page/About";
import { HowItWorks } from "@/components/landing-page/HowItWorks";
import { Features } from "@/components/landing-page/Features";
import { Services } from "@/components/landing-page/Services";
import { Cta } from "@/components/landing-page/Cta";
import { Testimonials } from "@/components/landing-page/Testimonials";
import { Team } from "@/components/landing-page/Team";
import { Pricing } from "@/components/landing-page/Pricing";
import { Newsletter } from "@/components/landing-page/Newsletter";
import { FAQ } from "@/components/landing-page/FAQ";
import { Footer } from "@/components/landing-page/Footer";
import { ScrollToTop } from "@/components/landing-page/ScrollToTop";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Sponsors />
      <About />
      <HowItWorks />
      <Features />
      <Services />
      <Cta />
      <Testimonials />
      <Team />
      <Pricing />
      <Newsletter />
      <FAQ />
      <Footer />
      <ScrollToTop />
    </>
  );
}


