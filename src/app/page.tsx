import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Benefits } from "@/components/Benefits";
import { BuyoutGallery } from "@/components/BuyoutGallery";
import { PriceCards } from "@/components/PriceCards";
import { Calculator } from "@/components/Calculator";
import { SellForm } from "@/components/SellForm";
import { Reviews } from "@/components/Reviews";
import { MapSection } from "@/components/MapSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Benefits />
        <BuyoutGallery />
        <PriceCards />
        <Calculator />
        <SellForm />
        <Reviews />
        <MapSection />
      </main>
      <Footer />
    </>
  );
}
