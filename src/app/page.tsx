import SmoothScroll from "@/components/SmoothScroll";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import Features from "@/components/Features";
import About from "@/components/About";
import Roadmap from "@/components/Roadmap";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import Team from "@/components/Team";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <SmoothScroll>
      <div className="flex flex-col gap-0">
        <Hero />
        <Stats />
        <Services />
        <Features />
        <About />
        <Roadmap />
        <Pricing />
        <Testimonials />
        <Team />
        <FAQ />
        <CTA />
        <Contact />
      </div>
    </SmoothScroll>
  );
}
