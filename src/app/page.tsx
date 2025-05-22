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
      {/* Slides with fade animation */}
      <div className="w-full h-full relative">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {slide.type === 'image' ? (
              <img
                src={slide.src}
                alt="Slide"
                className="w-full h-full object-cover"
              />
            ) : (
              <video
                src={slide.src}
                autoPlay
                loop
                muted
                className="w-full h-full object-cover"
              />
            )}
          </div>
        ))}
      </div>

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
      <div className="absolute bottom-10 w-full flex justify-center px-4 z-20">
        <button
          onClick={() => router.push('/allProduct')}
          className="bg-transparent text-white border border-white font-medium text-base md:text-lg px-4 py-2 rounded transition hover:bg-white hover:text-black hover:font-semibold"
        >
          Shop Now
        </button>
      </div>
    </div>
  );
}
