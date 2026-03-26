import type { Metadata } from 'next';
import HomeHeroSection from '@/components/sections/HomeHeroSection';
import WhoWeAreSection from '@/components/sections/WhoWeAreSection';
import TrustedPartnersSection from '@/components/sections/TrustedPartnersSection';
import WhoWeServeSection from '@/components/sections/WhoWeServeSection';
import AdvisoryServicesSection from '@/components/sections/AdvisoryServicesSection';
import HowWeWorkSection from '@/components/sections/HowWeWorkSection';
import CaseStudiesSection from '@/components/sections/CaseStudiesSection';
import InsightsSection from '@/components/sections/InsightsSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import CTABanner from '@/components/sections/CTABanner';

export const metadata: Metadata = {
  title: 'Applore — Technology Advisory That Delivers Results',
  description: 'Advisory-led technology consulting for enterprises, mid-market, and high-growth companies. Strategy, architecture, data & AI.',
  openGraph: {
    title: 'Applore — Technology Advisory That Delivers Results',
    description: 'Advisory-led technology consulting for enterprises, mid-market, and high-growth companies.',
  },
};

export default function HomePage() {
  return (
    <>
      <HomeHeroSection />
      <WhoWeAreSection />
      <TrustedPartnersSection />
      <WhoWeServeSection />
      <AdvisoryServicesSection />
      <HowWeWorkSection />
      <CaseStudiesSection />
      <InsightsSection />
      <TestimonialsSection />
      <CTABanner />
    </>
  );
}
