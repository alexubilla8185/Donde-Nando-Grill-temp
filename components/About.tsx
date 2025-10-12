import React from 'react';
import { useLocalization } from '../hooks/useLocalization.ts';
import { content } from '../constants/content.ts';

const About: React.FC = () => {
  const { language } = useLocalization();
  const aboutContent = content.about;

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-serif font-bold text-brand-text mb-6">
            {aboutContent.title[language]}
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            {aboutContent.text[language]}
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
