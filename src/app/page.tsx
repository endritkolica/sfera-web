import { getContent } from "@/lib/content";
import HeroSection from "@/components/HeroSection";
import PortfolioSection from "@/components/PortfolioSection";
import ServicesSection from "@/components/ServicesSection";
import PricingSection from "@/components/PricingSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default async function Home() {
  const content = await getContent();
  return (
    <main>
      <HeroSection content={content?.hero} />
      <PortfolioSection content={content?.portfolio} />
      <ServicesSection content={content?.services} />
      <PricingSection content={content?.pricing} />
      <ContactSection content={content?.contact} />
      <Footer content={content?.footer} />
    </main>
  );
}
