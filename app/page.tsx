import { Navbar } from "../components/Overalls/Navbar";
import AboutGrid from "@/components/About/About";
import { HeroSection } from "@/components/Hero/HeroSection";
import ContactSection from "@/components/Contact/ContactSection";
import FooterSection from "@/components/Footer/FooterSection";
import WorksSection from "@/components/Works/WorksSection";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#05030F] text-white">
      <Navbar />

      <div className="relative min-h-screen">
        <HeroSection />

        <section id="about" className="flex justify-center px-4 py-20">
          <AboutGrid />
        </section>

        <section id="work">
          <WorksSection />
        </section>

        <section id="contact">
          <ContactSection />
        </section>

        <FooterSection />
      </div>
    </main>
  );
}

/*
Page layout map
- Navbar: fixed shell with hash links to sections below
- HeroSection: landing hero canvas stack
- #about: About section content (White)
- #work: Portfolio/works grid
- #contact: Contact CTA block
- FooterSection: site footer; sits inside the main scroll flow
*/