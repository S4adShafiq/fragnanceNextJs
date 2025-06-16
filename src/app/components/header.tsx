"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, Search, ShoppingCart } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hideTopBar, setHideTopBar] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHideTopBar(window.scrollY > 0);
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`w-full text-sm sticky top-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled ? "shadow-[0_4px_24px_0_rgba(120,120,120,0.12)]" : ""
      }`}
    >
      {/* Topbar */}
      <div
        className={`transition-all duration-300 ${
          hideTopBar
            ? "opacity-0 pointer-events-none h-0 overflow-hidden"
            : "opacity-100 h-auto"
        }`}
      >
        <div className="flex flex-wrap justify-between items-center px-2 md:px-4 py-2 bg-white text-xs md:text-sm relative">
          {/* Mobile: Centered Logo & Menu Button */}
          <div className="flex items-center w-full justify-between lg:hidden relative">
            {/* Centered Logo */}
            <div className="absolute left-0 right-0 flex justify-center pointer-events-none">
              <Link href="/" className="pointer-events-auto">
                <Image src="/jlogo.webp" alt="Logo" width={30} height={30} />
              </Link>
            </div>

            <button
              aria-label="Open menu"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 z-10 ml-auto"
            >
              <Menu color="black" />
            </button>
          </div>
       
          <div className="hidden lg:flex flex-wrap items-center gap-2 md:gap-3">
            <a href="#" className="hover:underline uppercase text-black">
              Welcome to J.
            </a>
            <a href="#" className="hover:underline uppercase text-black">
              Sign In
            </a>
            <span className="text-green-600 text-xs">🇵🇰</span>
            <a href="#" className="hover:underline text-black hidden sm:inline">
              Tracking Info
            </a>
            <a href="#" className="hover:underline text-black hidden sm:inline">
              Corporate Inquiry
            </a>
            <a href="#" className="hover:underline text-black hidden sm:inline">
              Create an Account
            </a>
            <span className="text-black hidden sm:inline">PKR &#9660;</span>
          </div>
          <div className="hidden lg:flex items-center gap-2 md:gap-4 mt-2 md:mt-0">
            <ShoppingCart className="w-4 h-4 text-black" />
            <Search className="w-4 h-4 text-black" />
            <span className="text-xs uppercase hidden sm:inline text-black">
              Search
            </span>
          </div>
        </div>
      </div>

   
      <div className="hidden lg:flex justify-center py-3 md:py-4 bg-white">
        <Link href="/">
          <Image src="/jlogo.webp" alt="Logo" width={30} height={30} />
        </Link>
      </div>

 
      <nav className="hidden lg:flex items-center justify-center gap-4 xl:gap-8 px-2 xl:px-4 py-2 xl:py-3 bg-white flex-wrap">
        <Link
          href="/allProduct"
          className="uppercase font-medium text-black/70 hover:text-black"
        >
          New Arrivals
        </Link>
        <Link
          href="/allProduct"
          className="font-light tracking-widest text-black/70 hover:text-black"
        >
          SYNCC
        </Link>
        <Link
          href="/allProduct"
          className="text-[#c6a675] font-light hover:text-[#a88c4a]"
        >
          cast & crew
        </Link>
        <Link
          href="/allProduct"
          className="text-red-600 font-medium hover:text-red-700"
        >
          FEATURED COLLECTION
        </Link>
        <Link
          href="/allProduct"
          className="uppercase text-black/70 hover:text-black"
        >
          Women
        </Link>
        <Link
          href="/allProduct"
          className="uppercase text-black/70 hover:text-black"
        >
          Men
        </Link>
        <Link
          href="/allProduct"
          className="uppercase text-black/70 hover:text-black"
        >
          Boys & Girls
        </Link>
        <Link
          href="/allProduct"
          className="uppercase text-black/70 hover:text-black relative px-3 py-1"
        >
          <span className="uppercase text-black/70 hover:text-black px-2 py-1">
            Fragrances
          </span>
          <span
            className="absolute inset-0 border-4 border-red-600 animate-pulse pointer-events-none rounded-md"
            aria-hidden="true"
          ></span>
        </Link>
        <Link
          href="/allProduct"
          className="uppercase text-black/70 hover:text-black"
        >
          Makeup
        </Link>
        <Link
          href="/allProduct"
          className="text-red-600 font-medium uppercase hover:text-red-700"
        >
          Sale
        </Link>
      </nav>

  
      {isMenuOpen && (
        <div className="lg:hidden flex flex-col px-2 md:px-4 py-2 bg-white">
          <div className="flex flex-col gap-2 mt-2 border-t pt-2 animate-slide-down">
            <Link href="/allProduct" className="text-black/70 hover:text-black">
              New Arrivals
            </Link>
            <Link href="/allProduct" className="text-black/70 hover:text-black">
              SYNCC
            </Link>
            <Link href="/allProduct" className="text-black/70 hover:text-black">
              cast & crew
            </Link>
            <Link href="/allProduct" className="text-red-600">
              FEATURED COLLECTION
            </Link>
            <Link href="/allProduct" className="text-black/70 hover:text-black">
              Women
            </Link>
            <Link href="/allProduct" className="text-black/70 hover:text-black">
              Men
            </Link>
            <Link href="/allProduct" className="text-black/70 hover:text-black">
              Boys & Girls
            </Link>

            <Link
              href="/allProduct"
              className="uppercase text-black/70 hover:text-black relative px-3 py-1 inline-block"
            >
              <span className="relative inline-block px-2 py-1">
                <span className="uppercase text-black/70 hover:text-black z-10 relative">
                  Fragrances
                </span>
                <span
                  className="absolute inset-0 border-4 border-red-600 animate-pulse pointer-events-none rounded-md"
                  aria-hidden="true"
                ></span>
              </span>
            </Link>

            <Link href="/allProduct" className="text-black/70 hover:text-black">
              Makeup
            </Link>
            <Link href="/allProduct" className="text-red-600">
              Sale
            </Link>
            <div className="flex gap-4 mt-2">
              <ShoppingCart className="w-4 h-4" />
              <Search className="w-4 h-4" />
              <span className="text-xs uppercase">Search</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
