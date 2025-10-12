import React from 'react';
import Hero from '../components/Hero.tsx';
import About from '../components/About.tsx';
import MediaGallery from '../components/MediaGallery.tsx';

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <About />
      <MediaGallery />
    </>
  );
};

export default HomePage;
