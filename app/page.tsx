// Import the global navigation bar component.
import { Navbar } from "../components/Overalls/Navbar";
// Import the 3D dome gallery showcase.
import DomeGallery from "@/components/Overalls/DomeGallery";
// Import the encapsulated hero section.
import { HeroSection } from "@/components/Hero/HeroSection";
import About from "@/components/About/About";
import WorksSection from "@/components/Works/WorksSection";
import ContactSection from "@/components/Contact/ContactSection";
import FooterSection from "@/components/Footer/FooterSection";

// Define the default export for the landing page.
export default function Home() {
  // Return the rendered structure for the homepage.
  return (
    // Render the main element with relative positioning and full viewport height.
    <main className="relative min-h-screen bg-[#05030F] text-white">
      {/* Insert the top-level navigation bar. */}
      <Navbar />
      {/* Wrap the hero and gallery within a unified container. */}
      <div className="relative min-h-screen"> {/* Allow hero + gallery to size naturally without excess whitespace */}
        <HeroSection />
        
      {/* Render the dome gallery beneath the hero content, without overriding background. */}
      <div className="relative overflow-hidden "> {/* Added min-h-screen for consistent section height */}
        <DomeGallery />
      </div>
      <section id="about">
        <About />
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