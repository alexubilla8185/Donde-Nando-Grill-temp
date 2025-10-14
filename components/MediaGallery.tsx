import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useLocalization } from '../hooks/useLocalization.ts';
import { content } from '../constants/content.ts';
import { ChevronLeftIcon, ChevronRightIcon } from './icons.tsx';

const images = [
  { src: "https://images.unsplash.com/photo-1546964124-0cce460f38ef?q=80&w=2070&auto=format&fit=crop", alt: "A large tomahawk steak resting on a wooden board, garnished with herbs." },
  { src: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop", alt: "Sliced grilled steak served with a side of french fries and sauce." },
  { src: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1998&auto=format&fit=crop", alt: "A juicy cheeseburger with lettuce, tomato, and cheese on a sesame seed bun." },
  { src: "https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=2070&auto=format&fit=crop", alt: "A delicious plate of grilled meat with sides of corn, asparagus, and potatoes." }
];

const MediaGallery: React.FC = () => {
  const { language } = useLocalization();
  const galleryContent = content.mediaGallery;
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<number | null>(null);
  const AUTOPLAY_DELAY = 5000;
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const resetTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = window.setTimeout(nextSlide, AUTOPLAY_DELAY);

    return () => {
      resetTimeout();
    };
  }, [currentIndex, nextSlide, resetTimeout]);

  return (
    <section id="gallery" ref={sectionRef} className={`py-20 bg-brand-bg dark:bg-brand-bg-dark scroll-animate ${isVisible ? 'is-visible' : ''}`}>
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-brand-text dark:text-brand-text-dark mb-4">
            {galleryContent.title[language]}
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            {galleryContent.subtitle[language]}
          </p>
        </div>
      </div>
      
      <div className="relative max-w-6xl mx-auto group" aria-roledescription="carousel" aria-label="Gallery of restaurant dishes">
        <div className="overflow-hidden">
          <div 
            className="flex transition-transform ease-out duration-500"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            aria-live="off"
          >
            {images.map((image, index) => (
              <div 
                key={image.src} 
                className="flex-shrink-0 w-full"
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${images.length}`}
              >
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="w-full h-[60vh] object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 -translate-y-1/2 left-5 z-30 bg-black bg-opacity-30 text-white rounded-full p-2 hover:bg-opacity-50 transition-all opacity-0 group-hover:opacity-100"
          aria-label="Previous image"
        >
          <ChevronLeftIcon className="w-8 h-8" />
        </button>
        
        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="absolute top-1/2 -translate-y-1/2 right-5 z-30 bg-black bg-opacity-30 text-white rounded-full p-2 hover:bg-opacity-50 transition-all opacity-0 group-hover:opacity-100"
          aria-label="Next image"
        >
          <ChevronRightIcon className="w-8 h-8" />
        </button>

        <div className="absolute bottom-5 right-0 left-0">
            <div className="flex items-center justify-center gap-2" role="group" aria-label="gallery pagination">
                {images.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => goToSlide(i)}
                        className={`transition-all w-3 h-3 bg-white rounded-full ${currentIndex === i ? 'p-2 ring-2 ring-offset-2 ring-offset-black/50 ring-white' : 'bg-opacity-50'}`}
                        aria-label={`Go to slide ${i + 1}`}
                        aria-current={currentIndex === i}
                    />
                ))}
            </div>
        </div>
      </div>
    </section>
  );
};

export default MediaGallery;