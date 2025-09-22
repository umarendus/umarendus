"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const sections = ["meist", "teenused", "protsess", "hinnapoliitika", "kontakt"];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [active, setActive] = useState("");

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  // IntersectionObserver for active section
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach((id) => {
      const section = document.getElementById(id);
      if (!section) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActive(id);
          });
        },
        { threshold: 0.6 }
      );

      observer.observe(section);
      observers.push(observer);
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  // Framer Motion variants for staggered animation
  const menuVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white/70 backdrop-blur-md px-6 py-2 border-b border-white/20">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
          <Image src="/logo.svg" alt="Logo" width={80} height={80} />
        </Link>

        {/* Desktop Navigation */}
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

        {/* CTA Button = Kirjuta Meile */}
        <Link
          href="#kontakt"
          className={`hidden lg:block transition-transform duration-300 ${
            active === "kontakt" ? "scale-110 text-gray-900" : "hover:scale-110 text-gray-800"
          }`}
        >
          <Image
            src="/sinu-leht.svg"
            alt="Sinu Leht - Kirjuta Meile"
            width={100}
            height={50}
            className="h-9 w-auto"
          />
        </Link>

        {/* Mobile menu button */}
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden text-black p-2 rounded-md transition-transform duration-200 ease-in-out"
          aria-label="Toggle mobile menu"
        >
          <svg
            className={`w-8 h-8 transition-transform duration-200 ${mobileMenuOpen ? "rotate-90" : ""}`}
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

      {/* Mobile Menu with overlay and staggered items */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed top-16 left-0 py-15 right-0 z-50 bg-white/98"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* Overlay */}
            <div className="absolute inset-0" onClick={closeMobileMenu} />

            {/* Menu content */}
            <motion.div
              
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <nav className="space-y-6 text-center mb-6">
                {sections.filter((id) => id !== "kontakt").map((id) => (
                  <motion.div key={id} variants={itemVariants}>
                    <Link
                      href={`#${id}`}
                      onClick={closeMobileMenu}
                      className="block text-black text-2xl font-semibold tracking-wide hover:text-gray-700 transition-colors"
                    >
                      {id.toUpperCase()}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* CTA */}
              <motion.div variants={itemVariants}>
<Link
  href="#kontakt"
  onClick={closeMobileMenu}
  className="flex justify-center mb-6 hover:opacity-80 transition-opacity"
>
  <Image
    src="/sinu-leht.svg"
    alt="Kirjuta Meile"
    width={100}
    height={50}
    className="h-14 w-auto"
  />
</Link>



                {/* Socials */}
                <div className="flex justify-center gap-6 mt-4">
                  <motion.a href="https://facebook.com" target="_blank" rel="noopener noreferrer" variants={itemVariants}>
                    <Image src="/facebook.svg" alt="Facebook" width={28} height={28} />
                  </motion.a>
                  <motion.a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" variants={itemVariants}>
                    <Image src="/linkedin.svg" alt="LinkedIn" width={28} height={28} />
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
