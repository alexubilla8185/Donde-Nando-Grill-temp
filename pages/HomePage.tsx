import React, { useEffect } from 'react';
import Hero from '../components/Hero.tsx';
import About from '../components/About.tsx';
import MediaGallery from '../components/MediaGallery.tsx';

interface HomePageProps {
  onVisibilityChange: (isHidden: boolean) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onVisibilityChange }) => {
  useEffect(() => {
    // On mount, hide the FAB since the hero section's CTAs are in view.
    // The IntersectionObserver in the Hero component will then manage visibility on scroll.
    onVisibilityChange(true);

    // When the component unmounts, ensure the FAB is visible again for other pages.
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