// import { Navbar } from "../components/Overalls/Navbar";
// import AboutGrid from "@/components/About/About";
// import { HeroSection } from "@/components/Hero/HeroSection";
// import Hero3DModel from "@/components/Hero/Hero3D";
// import ContactSection from "@/components/Contact/ContactSection";
// import FooterSection from "@/components/Footer/FooterSection";
// import WorksSection from "@/components/Works/WorksSection";
// import Image from "next/image";
import ComingSoon from "@/components/comingsoon/comingSoon";

// export default function Home() {
//   return (
//     <main className="relative min-h-screen bg-[#05030F] text-white">
//       <Navbar />
//       {/* Hero3DModel lives at the ROOT level - outside all stacking contexts so it's truly on top of everything */}
//       <Hero3DModel />

//       <div className="relative min-h-screen">
//         <HeroSection />

//         <section id="about" className="flex justify-center px-4 py-20 relative z-30">
//           <AboutGrid>
//             <div className="relative w-[380px] h-[380px] md:w-[550px] md:h-[550px] xl:w-[650px] xl:h-[650px]">
//                <Image 
//                  src="/Group 1.png"
//                  alt="About section visual"
//                  fill
//                  className="object-contain"
//                  priority
//                />
//             </div>
//           </AboutGrid>
//         </section>

//         <section id="work">
//           <WorksSection />
//         </section>

//         <section id="contact">
//           <ContactSection />
//         </section>

//         <FooterSection />
//       </div>
//     </main>
//   );
// }

export default function Home() {
  return(
    <ComingSoon />
  )
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