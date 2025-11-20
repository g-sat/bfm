"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, cubicBezier } from "framer-motion";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Work", href: "/#work" },
  { label: "Contact", href: "/#contact" },
];

const mobileMenuVariants = {
  hidden: { opacity: 0, y: -12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: cubicBezier(0.22, 1, 0.36, 1) } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.2, ease: cubicBezier(0.25, 0.46, 0.45, 0.94) } },
};

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/about") {
      return pathname === "/about";
    }
    if (href === "/") {
      return pathname === "/";
    }
    return false;
  };

  return (
    <nav className="fixed inset-x-0 top-4 z-40 flex justify-center px-4">
      <div
        className={cn(
          "relative flex w-full max-w-7xl items-center justify-between rounded-full border border-white/10 px-5 py-3 transition-all duration-500 backdrop-blur",
          isScrolled ? "bg-[#090614]/90 shadow-[0_12px_36px_rgba(9,6,20,0.35)]" : "bg-black/30",
        )}
      >
        <Link href="/" className="relative flex items-center gap-3 pl-1">
          <Image
            src="/BFM_Main2_White.png"
            alt="Bold Frame Media"
            width={84}
            height={84}
            className="h-10 w-auto transition-transform duration-300 hover:scale-[1.02]"
            priority
          />
          <span className="hidden text-xs font-semibold uppercase tracking-[0.4em] text-white/70 md:block">Bold Frame Media</span>
        </Link>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors duration-200 hover:border-white/30 sm:hidden"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label="Toggle navigation"
        >
          <span className="block h-px w-6 bg-current" />
        </button>

        <div className="hidden items-center gap-6 sm:flex">
          <ul className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.32em] text-white/60">
            {navLinks.map(({ label, href }) => {
              const active = isActive(href);
              return (
                <li key={label}>
                  <Link href={href} className="relative block overflow-hidden rounded-full px-5 py-2">
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-full border border-white/15 bg-white/10"
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      />
                    )}
                    <span className={`relative z-10 transition-colors duration-200 ${active ? "text-white" : "text-white/60 hover:text-white"}`}>
                      {label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link
            href="mailto:hello@boldframemedia.com"
            className="rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-white transition-transform duration-300 hover:scale-[1.03] hover:border-white/35"
          >
            Start a project
          </Link>
        </div>

        <AnimatePresence>
          {isMenuOpen ? (
            <motion.div
              className="absolute left-0 right-0 top-[110%] rounded-3xl border border-white/10 bg-[#090614]/95 p-6 text-sm text-white/80 shadow-[0_16px_44px_rgba(9,6,20,0.5)] backdrop-blur"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <ul className="space-y-4">
                {navLinks.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="flex items-center justify-between uppercase tracking-[0.3em]"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span>{label}</span>
                      <span className="text-xs text-white/40">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Link
                  href="mailto:hello@boldframemedia.com"
                  className="flex w-full items-center justify-center rounded-full border border-white/20 bg-white/10 px-5 py-3 text-xs font-semibold uppercase tracking-[0.32em] text-white"
                >
                  Start a project
                </Link>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </nav>
  );
}

