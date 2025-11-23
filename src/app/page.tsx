'use client'
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
import { getSiteConfig } from "@/config/prviewconfig";
import defaultsiteConfig from "@/config/siteConfig";
import { SiteConfig } from "@/types/config";
import { useState, useEffect } from 'react'

export default function Home() {
  const [siteConfig, setSiteconfig] = useState<SiteConfig>(defaultsiteConfig)
  useEffect(() => {
    setSiteconfig(getSiteConfig())
  }, [])
  return (
    <SmoothScroll>
      <div className="flex flex-col gap-0"
        style={{ background: `linear-gradient(to bottom right, ${siteConfig.colors.background}, ${siteConfig.colors.secondary})` }}
      >
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
