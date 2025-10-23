"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-30 transition-all duration-300 ${
        isScrolled ? 'bg-black/90' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-8 py-8 flex justify-between items-center">
        {/* SVG Logo */}
        <a href="#" className="flex items-center">
          <Image
            src="/nav_bmf.svg"
            alt="Bolt Frame Media Logo"
            width={150}
            height={150}
            className="hover:brightness-75 transition-all duration-200"
            priority
          />
        </a>
        <ul className="flex space-x-8">
          {['Home', 'About', 'Work', 'Contact'].map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                className="text-white hover:text-red-500 transition-colors duration-200 text-sm"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}