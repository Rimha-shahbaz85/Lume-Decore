import Hero from "@/components/Hero";
import TrustBadges from "@/components/TrustBadges";
import FeaturedProducts from "@/components/FeaturedProducts";
import Categories from "@/components/Categories";
import HowItWorks from "@/components/HowItWorks";
import SpecialOffer from "@/components/SpecialOffer";
import NewArrivals from "@/components/NewArrivals";
import BrandStory from "@/components/BrandStory";
import Testimonials from "@/components/Testimonials";
import Features from "@/components/Features";
import InstagramFeed from "@/components/InstagramFeed";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBadges />
      <Features />
      <FeaturedProducts />
      <Categories />
      <HowItWorks />
      <SpecialOffer />
      <NewArrivals />
      <BrandStory />
      <Testimonials />
      <InstagramFeed />
      <WhatsAppButton />
    </>
  );
}
