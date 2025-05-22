"use client";

import Image from 'next/image';
import Link from 'next/link'; // Import Link
import { useState } from 'react';
import { Menu, Search, ShoppingCart } from 'lucide-react';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="w-full border-b text-sm">
            {/* Topbar */}
            <div className="flex flex-wrap justify-between items-center px-2 md:px-4 py-2 bg-white text-xs md:text-sm relative">
                {/* Mobile: Centered Logo & Menu Button */}
                <div className="flex items-center w-full justify-between lg:hidden relative">
                    {/* Centered Logo */}
                    <div className="absolute left-0 right-0 flex justify-center pointer-events-none">
                        <Link href="/" className="pointer-events-auto">
                            <Image src="/jlogo.webp" alt="Logo" width={30} height={30} />
                        </Link>
                    </div>
                    {/* Hamburger Button */}
                    <button
                        aria-label="Open menu"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="p-2 z-10 ml-auto"
                    >
                        <Menu color="black" />
                    </button>
                </div>
                {/* Desktop: Topbar Links */}
                <div className="hidden lg:flex flex-wrap items-center gap-2 md:gap-3">
                    <a href="#" className="hover:underline uppercase text-black">Welcome to J.</a>
                    <a href="#" className="hover:underline uppercase text-black">Sign In</a>
                    <span className="text-green-600 text-xs">🇵🇰</span>
                    <a href="#" className="hover:underline text-black hidden sm:inline">Tracking Info</a>
                    <a href="#" className="hover:underline text-black hidden sm:inline">Corporate Inquiry</a>
                    <a href="#" className="hover:underline text-black hidden sm:inline">Create an Account</a>
                    <span className="text-black hidden sm:inline">PKR &#9660;</span>
                </div>
                <div className="hidden lg:flex items-center gap-2 md:gap-4 mt-2 md:mt-0">
                    <ShoppingCart className="w-4 h-4 text-black" />
                    <Search className="w-4 h-4 text-black" />
                    <span className="text-xs uppercase hidden sm:inline text-black">Search</span>
                </div>
            </div>

            {/* Centered Logo for Desktop */}
            <div className="hidden lg:flex justify-center py-3 md:py-4 bg-white">
                <Link href="/">
                    <Image src="/jlogo.webp" alt="Logo" width={30} height={30} />
                </Link>
            </div>

            {/* Navbar Below Logo */}
            <nav className="hidden lg:flex items-center justify-center gap-4 xl:gap-8 px-2 xl:px-4 py-2 xl:py-3 bg-white flex-wrap">
                <a href="#" className="uppercase font-medium text-black">New Arrivals</a>
                <a href="#" className="font-light tracking-widest text-black">SYNCC</a>
                <a href="#" className="text-[#c6a675] font-light">cast & crew</a>
                <a href="#" className="text-red-600 font-medium">Featured Collection</a>
                <a href="#" className="uppercase text-black">Women</a>
                <a href="#" className="uppercase text-black">Men</a>
                <a href="#" className="uppercase text-black">Boys & Girls</a>

                {/* ✅ Updated Link for Fragrances */}
                <Link href="/allProduct" className="uppercase text-black">Fragrances</Link>

                <a href="#" className="uppercase text-black">Makeup</a>
                <a href="#" className="text-red-600 font-medium uppercase">Sale</a>
            </nav>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="lg:hidden flex flex-col px-2 md:px-4 py-2 bg-white">
                    <div className="flex flex-col gap-2 mt-2 border-t pt-2 animate-slide-down">
                        <a href="#" className="text-black">New Arrivals</a>
                        <a href="#" className="text-black">SYNCC</a>
                        <a href="#" className="text-black">cast & crew</a>
                        <a href="#" className="text-red-600">Featured Collection</a>
                        <a href="#" className="text-black">Women</a>
                        <a href="#" className="text-black">Men</a>
                        <a href="#" className="text-black">Boys & Girls</a>

                        {/* ✅ Updated Mobile Link for Fragrances */}
                        <Link href="/allProduct" className="text-black">Fragrances</Link>

                        <a href="#" className="text-black">Makeup</a>
                        <a href="#" className="text-red-600">Sale</a>
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
