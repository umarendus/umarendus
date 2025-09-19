"use client";

import Image from "next/image";

export default function LandingPageBW() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6">
      
      {/* Logo / Pealkiri */}
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-black mb-2">
          Tere Tulemast!
        </h1>
        <p className="text-lg text-gray-700">
          Hetkel ehitame teie jaoks ägedat konseptsiooni
        </p>
      </header>

      {/* SVG naljakas illustratsioon */}
      <div className="mb-12">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-64 h-64 mx-auto"
          viewBox="0 0 64 64"
          fill="none"
        >
          <circle cx="32" cy="32" r="30" stroke="#000" strokeWidth="4"/>
          <line x1="20" y1="24" x2="28" y2="24" stroke="#000" strokeWidth="3" strokeLinecap="round"/>
          <line x1="36" y1="24" x2="44" y2="24" stroke="#000" strokeWidth="3" strokeLinecap="round"/>
          <path d="M20 40 C 28 50, 36 50, 44 40" stroke="#000" strokeWidth="3" strokeLinecap="round"/>
          <circle cx="24" cy="32" r="2" fill="#000"/>
          <circle cx="40" cy="32" r="2" fill="#000"/>
        </svg>
        <p className="text-center text-gray-800 mt-4">
          Naeratav robot ehitab teie ideed
        </p>
      </div>



      {/* Footer */}
      <footer className="mt-16 text-sm text-gray-500">
        &copy; 2025 Vartsi teie ees Konseptsioon. Kõik õigused kaitstud.
      </footer>
    </div>
  );
}
