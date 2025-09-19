import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full bg-stone-100 px-6 py-4 border-b border-stone-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={44}
            height={44}
          />
        </div>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center space-x-10">
          <a href="#" className="text-gray-800 hover:text-gray-900 font-medium text-sm tracking-wide transition-colors">
            MEIST
          </a>
          <a href="#" className="text-gray-800 hover:text-gray-900 font-medium text-sm tracking-wide transition-colors">
            TEENUSED
          </a>
          <a href="#" className="text-gray-800 hover:text-gray-900 font-medium text-sm tracking-wide transition-colors">
            PROTSESS
          </a>
          <a href="#" className="text-gray-800 hover:text-gray-900 font-medium text-sm tracking-wide transition-colors">
            HINNAPOLITIKA
          </a>
        </nav>

        {/* CTA Button */}
        <button className="bg-gray-800 text-white px-6 py-3 rounded-md hover:bg-gray-900 transition-colors flex items-center gap-2 text-sm font-medium">
          KÜSITA HINNE
          <Image
            src="/arrow-right.svg"
            alt="Arrow"
            width={14}
            height={14}
            className="text-white"
          />
        </button>

        {/* Mobile menu button */}
        <button className="lg:hidden bg-gray-800 text-white p-2 rounded-md">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
}