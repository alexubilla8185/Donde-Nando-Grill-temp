import React, { useRef, useEffect } from 'react';
import { useLocalization } from '../hooks/useLocalization.ts';
import { content } from '../constants/content.ts';
import { ChevronDownIcon } from './icons.tsx';

interface HeroProps {
  onVisibilityChange: (isHidden: boolean) => void;
}

const Hero: React.FC<HeroProps> = ({ onVisibilityChange }) => {
  const { language } = useLocalization();
  const heroContent = content.hero;
  const logoUrl = 'https://i.ibb.co/zhtsqYp3/logo.png';
  const ctaRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, newHash: string) => {
      e.preventDefault();
      if (window.location.hash !== newHash) {
          window.location.hash = newHash;
      }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // We want to hide the FAB when the CTAs are visible on screen.
        onVisibilityChange(entry.isIntersecting);
      },
      {
        // Use a negative bottom margin to trigger the change just before the element scrolls completely off-screen.
        // This makes the FAB appear as the user scrolls past the CTAs.
        rootMargin: '0px 0px -150px 0px',
        threshold: 0,
      }
    );

    const currentCtaRef = ctaRef.current;
    if (currentCtaRef) observer.observe(currentCtaRef);

    return () => {
      if (currentCtaRef) observer.unobserve(currentCtaRef);
    };
  }, [onVisibilityChange]);


  return (
    <section 
      className="relative min-h-screen bg-[#fbfbfb] flex items-center justify-center pt-24 pb-12"
    >
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center gap-y-6 md:gap-y-8 w-full">
            
            {/* --- Logo Image --- */}
            <div className="animate-fade-in-grow" style={{ animationDelay: '300ms' }}>
                <img src={logoUrl} alt="Donde Nando Grill Logo" className="w-full h-auto max-w-[12rem] sm:max-w-[14rem] md:max-w-xs lg:max-w-sm" />
            </div>
            
            {/* --- Text Content --- */}
            <div className="text-center">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold text-brand-text mb-4 animate-fade-in-grow" style={{ animationDelay: '200ms' }}>
                   <span>{heroContent.headline[language]}</span>
                </h1>
                <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-700 mb-8 animate-fade-in-grow" style={{ animationDelay: '400ms' }}>
                    {heroContent.subheadline[language]}
                </p>
                <div ref={ctaRef} className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-grow" style={{ animationDelay: '600ms' }}>
                    <a href="#/menu" onClick={(e) => handleNavClick(e, '#/menu')} className="bg-brand-red text-white font-bold py-3 px-8 rounded-md transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95">
                        {heroContent.ctaMenu[language]}
                    </a>
                     <a href="#/reservations" onClick={(e) => handleNavClick(e, '#/reservations')} className="bg-transparent border-2 border-brand-text text-brand-text font-bold py-3 px-8 rounded-md hover:bg-brand-text hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95">
                        {heroContent.ctaReserve[language]}
                    </a>
                </div>
            </div>

        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
         <button onClick={handleScroll} aria-label="Scroll to about section">
            <ChevronDownIcon className="w-8 h-8 text-brand-text animate-bounce" />
        </button>
      </div>
    </section>
  );
};

export default Hero;