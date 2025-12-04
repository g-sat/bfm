"use client";

import Link from "next/link";
// import { cn } from "@/lib/utils";

const quickLinks = [
  { label: "Work", href: "#about-section" },
  { label: "Studios", href: "#contact" },
  { label: "Gallery", href: "#dome-gallery" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  { label: "Instagram", href: "https://instagram.com/boldframemedia" },
  { label: "Behance", href: "https://behance.net/boldframemedia" },
  { label: "LinkedIn", href: "https://linkedin.com/company/boldframemedia" },
  { label: "Vimeo", href: "https://vimeo.com/boldframemedia" },
];

const FooterSection = () => {
  return (
    <footer className="relative isolate overflow-hidden bg-[#03020A] py-16 text-white">
      <div className="absolute inset-0">
        <div className="absolute left-1/3 top-0 h-[220px] w-[220px] -translate-x-1/2 rounded-full bg-[#f43f5e]/15 blur-3xl" />
        <div className="absolute -bottom-40 right-[12%] h-[260px] w-[260px] rounded-full bg-[#38bdf8]/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(6,5,22,0.8),rgba(3,2,10,0.96))]" />
      </div>

      <div className="relative flex w-full flex-col gap-14 px-6 md:px-12 lg:px-20">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.6em] text-white/50">Bold Frame Media</p>
          </div>

          <Link
            href="#contact"
            className="group inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-6 py-3 text-sm font-semibold uppercase tracking-[0.45em] text-white transition hover:border-white/40 hover:bg-white/15"
          >
            Initiate a build
            <span className="transition group-hover:translate-x-1">\u2192</span>
          </Link>
        </div>

        <div className="grid gap-10 md:grid-cols-[0.8fr_1fr]">
          <div className="space-y-6">
            <div className="grid gap-3 text-sm uppercase tracking-[0.4em] text-white/50">
              <span>Studios: LA / Lisbon / Mumbai</span>
              <span>Residencies reopen Spring 2026</span>
              <span>hello@boldframemedia.studio</span>
            </div>

            <div className="grid gap-2 text-sm text-white/50">
              <span className="uppercase tracking-[0.45em]">Stay in resonance</span>
              <form className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#f43f5e] focus:outline-none focus:ring-0"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-full border border-transparent bg-linear-to-r from-[#f43f5e] to-[#fb7185] px-5 py-3 text-xs font-semibold uppercase tracking-[0.45em] text-black transition hover:opacity-90"
                >
                  Join
                </button>
              </form>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-[0.45em] text-white/50">Quick links</span>
              <ul className="space-y-2 text-sm text-white/70">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="transition hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <span className="text-xs uppercase tracking-[0.45em] text-white/50">Socials</span>
              <ul className="space-y-2 text-sm text-white/70">
                {socials.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="transition hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 pt-6 text-xs uppercase tracking-[0.4em] text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <span>\u00a9 {new Date().getFullYear()} Bold Frame Media. All sensory rights reserved.</span>
          <div className="flex flex-wrap gap-4 text-white/40">
            <Link href="/privacy" className="transition hover:text-white/70">
              Privacy
            </Link>
            <Link href="/terms" className="transition hover:text-white/70">
              Terms
            </Link>
            <Link href="/press" className="transition hover:text-white/70">
              Press
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
