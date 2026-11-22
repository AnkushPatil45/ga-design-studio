import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Studio from "@/components/Studio";
import Work from "@/components/Work";
import Process from "@/components/Process";
import Cities from "@/components/Cities";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Motion from "@/components/Motion";
import Preloader from "@/components/Preloader";
import { SkipLink, WhatsAppArch } from "@/components/Extras";

export default function Home() {
  return (
    <>
      <SkipLink />
      <Preloader />
      <Nav />
      <main>
        <Hero />
        <Studio />
        <Work />
        <Process />
        <Cities />
        <Contact />
      </main>
      <Footer />
      <WhatsAppArch />
      <Motion />
    </>
  );
}
