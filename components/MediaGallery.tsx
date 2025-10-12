import React from 'react';
import { useLocalization } from '../hooks/useLocalization.ts';
import { content } from '../constants/content.ts';

const images = [
  "https://images.unsplash.com/photo-1551028150-64b9f398f678?q=80&w=1974&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1621852004132-61395535b607?q=80&w=1974&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1594041682983-703e7813a342?q=80&w=1974&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=2070&auto=format&fit=crop"
];

const MediaGallery: React.FC = () => {
  const { language } = useLocalization();
  const galleryContent = content.mediaGallery;

  return (
    <section id="gallery" className="py-20 bg-brand-bg">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-brand-text mb-4">
            {galleryContent.title[language]}
          </h2>
          <p className="text-lg text-gray-700">
            {galleryContent.subtitle[language]}
          </p>
        </div>
      </div>
      <div className="w-full overflow-x-auto pb-4">
        <div className="flex space-x-6 px-6">
          {images.map((src, index) => (
            <div key={index} className="flex-shrink-0 w-80 h-96">
              <img 
                src={src} 
                alt={`Donde Nando Grill gallery image ${index + 1}`} 
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MediaGallery;
