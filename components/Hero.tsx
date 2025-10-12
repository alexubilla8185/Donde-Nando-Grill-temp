import React from 'react';
import { useLocalization } from '../hooks/useLocalization.ts';
import { content } from '../constants/content.ts';
import { ChevronDownIcon } from './icons.tsx';

const Hero: React.FC = () => {
  const { language } = useLocalization();
  const heroContent = content.hero;

  const handleScroll = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // FIX: Handle navigation programmatically to avoid potential iframe issues.
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, newHash: string) => {
      e.preventDefault();
      if (window.location.hash !== newHash) {
          window.location.hash = newHash;
      }
  };

  return (
    <section className="relative h-screen flex items-center justify-center text-white text-center bg-cover bg-center" style={{backgroundImage: "url('https://i.ibb.co/LXQqvd8b/Profile-Picture-2.jpg')"}}>
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative z-10 p-6">
        <h1 className="text-6xl md:text-8xl font-serif font-bold mb-4">
           <span>{heroContent.headline[language]}</span>
        </h1>
        <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8">
            {heroContent.subheadline[language]}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#/menu" onClick={(e) => handleNavClick(e, '#/menu')} className="bg-brand-red text-white font-bold py-3 px-8 rounded-md hover:bg-red-800 transition-colors duration-300">
                {heroContent.ctaMenu[language]}
            </a>
             <a href="#/reservations" onClick={(e) => handleNavClick(e, '#/reservations')} className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-md hover:bg-white hover:text-brand-text transition-colors duration-300">
                {heroContent.ctaReserve[language]}
            </a>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
         <button onClick={handleScroll} aria-label="Scroll to about section">
            <ChevronDownIcon />
        </button>
      </div>
    </section>
  );
};

export default Hero;