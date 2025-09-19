"use client";

import Image from "next/image";
import {useEffect, useState } from "react";
const sections = ["meist","teenused", "protsess", "hinnapoliitika", "kontakt"];
import Link from "next/link";


export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [active, setActive] = useState("");
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach((id) => {
  const section = document.getElementById(id);
  if (!section) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(id);  // nüüd töötab ka "kontakt"
        }
      });
    },
    { threshold: 0.6 }
  );

  observer.observe(section);
  observers.push(observer);
});

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white/80 backdrop-blur-md px-6 py-2 border-b border-white/20">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={90}
            height={90}
          />
       </Link>

        {/* Navigation */}
<nav className="hidden lg:flex items-center space-x-10">
  {sections.map((id) =>
    id !== "kontakt" ? (
      <Link
        key={id}
        href={`#${id}`}
        className={`relative font-medium text-sm tracking-wide transition-colors duration-300 ${
          active === id
            ? "text-gray-900 font-semibold"
            : active === ""
            ? "text-gray-800 hover:text-gray-900"
            : "text-gray-600 hover:text-gray-900"
        }`}
      >
        {id.toUpperCase()}
        {active === id && (
          <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-gray-900 transition-all duration-300" />
        )}
      </Link>
    ) : null
  )}
</nav>

{/* CTA Button = Kirjuta meile */}
<Link
  href="#kontakt"
  className={`hidden lg:block transition-transform duration-300 ${
    active === "kontakt" 
      ? "scale-110 text-gray-900" 
      : "hover:scale-110 text-gray-800"
  }`}
>
  <Image
    src="/sinu-leht.svg"
    alt="Sinu Leht - Kirjuta Meile"
    width={200}
    height={50}
    className="h-16 w-auto"
  />
</Link>


        {/* Mobile menu button */}
        <button 
          onClick={toggleMobileMenu}
          className="lg:hidden text-black p-2 rounded-md transition-transform duration-200 ease-in-out"
          aria-label="Toggle mobile menu"
        >
          <svg 
            className={`w-8 h-8 transition-transform duration-200 ${mobileMenuOpen ? 'rotate-90' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-b border-white/20 transition-all duration-300 ease-in-out overflow-hidden ${
        mobileMenuOpen ? 'max-h-100 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <nav className="px-6 py-4 space-y-6">
           <Link 
            href="#meist" 
            onClick={closeMobileMenu}
            className="block text-gray-800 hover:text-gray-900 font-medium text-base tracking-wide transition-colors py-2"
          >
            MEIST
         </Link>
          <Link
            href="#teenused" 
            onClick={closeMobileMenu}
            className="block text-gray-800 hover:text-gray-900 font-medium text-base tracking-wide transition-colors py-2"
          >
            TEENUSED
          </Link>
          <Link
            href="#protsess"
            onClick={closeMobileMenu}
            className="block text-gray-800 hover:text-gray-900 font-medium text-base tracking-wide transition-colors py-2"
          >
            PROTSESS
          </Link>
          <Link
            href="#hinnapoliitika"
            onClick={closeMobileMenu}
            className="block text-gray-800 hover:text-gray-900 font-medium text-base tracking-wide transition-colors py-2"
          >
            HINNAPOLIITIKA
          </Link>
          
          {/* Contact SVG at bottom */}
          <div className="pt-4 mt-4 border-t border-gray-200">
            <Link
              href="#kontakt"
              onClick={closeMobileMenu}
              className="block hover:opacity-80 transition-opacity"
            >
              <Image
                src="/sinu-leht.svg"
                alt="Sinu Leht - Kirjuta Meile"
                width={200}
                height={50}
                className="h-20 w-auto mx-auto"
              />
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}