'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { type: 'video', src: '/vid.mp4' },
    { type: 'image', src: '/banner.webp' },
  ];

  const nextSlide = () => setCurrentSlide((currentSlide + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((currentSlide - 1 + slides.length) % slides.length);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Slides */}
      {slides[currentSlide].type === 'image' ? (
        <img
          src={slides[currentSlide].src}
          alt="Slide"
          className="w-full h-full object-cover"
        />
      ) : (
        <video
          src={slides[currentSlide].src}
          autoPlay
          loop
          muted
          className="w-full h-full object-cover"
        />
      )}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-4xl font-bold z-10 hover:text-gray-300"
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-4xl font-bold z-10 hover:text-gray-300"
      >
        &#10095;
      </button>

      {/* Shop Now Button */}
      <div className="absolute bottom-10 w-full flex justify-center px-4">
        <button
          onClick={() => router.push('/allProduct')}
          className="bg-white/40 text-black font-medium text-base md:text-lg px-4 py-2 rounded transition hover:bg-black/70 hover:text-white hover:font-semibold"
        >
          Shop Now
        </button>
      </div>
    </div>
  );
}
