import React, { useEffect } from 'react';
import Hero from '../components/Hero.tsx';
import About from '../components/About.tsx';
import MediaGallery from '../components/MediaGallery.tsx';

interface HomePageProps {
  onVisibilityChange: (isHidden: boolean) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onVisibilityChange }) => {
  useEffect(() => {
    // When the component unmounts, ensure it no longer dictates the FAB's visibility.
    return () => {
      onVisibilityChange(false);
    };
  }, [onVisibilityChange]);

  return (
    <>
      <Hero onVisibilityChange={onVisibilityChange} />
      <About />
      <MediaGallery />
    </>
  );
};

export default HomePage;