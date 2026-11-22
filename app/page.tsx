import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Studio from "@/components/Studio";
import Work from "@/components/Work";
import Process from "@/components/Process";
import Cities from "@/components/Cities";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
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
    </>
  );
}
