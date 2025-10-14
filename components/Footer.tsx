import React from 'react';
import { useLocalization } from '../hooks/useLocalization.ts';
import { content } from '../constants/content.ts';
import { FacebookIcon, InstagramIcon, MailIcon, PhoneIcon } from './icons.tsx';
import OpeningHours from './OpeningHours.tsx';

const Footer: React.FC = () => {
    const { language } = useLocalization();
    const footerContent = content.footer;
    const contactInfo = content.contact;
    const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-text text-white dark:bg-black">
      <div className="h-2 bg-brand-red"></div>
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-y-10 md:gap-y-0 md:gap-x-8">
          
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="font-bold text-lg mb-4">{footerContent.address[language]}</h3>
            <a
              href={contactInfo.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              {contactInfo.address}
            </a>
          </div>
          
          <div className="md:col-span-2 flex flex-col items-center text-center">
            <h3 className="font-bold text-lg mb-4">{footerContent.hours[language]}</h3>
            <div className="w-full max-w-xs">
                <OpeningHours baseTextColor="text-gray-400" highlightTextColor="text-white" />
            </div>
          </div>
          
          <div className="flex flex-col items-center md:items-end text-center md:text-right">
             <h3 className="font-bold text-lg mb-4">Contacto</h3>
             <div className="flex justify-center md:justify-end space-x-6">
                <a href={contactInfo.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-400 hover:text-white transition-all hover:scale-110"><FacebookIcon /></a>
                <a href={contactInfo.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-400 hover:text-white transition-all hover:scale-110"><InstagramIcon /></a>
                <a href={`mailto:${contactInfo.email}`} aria-label="Email" className="text-gray-400 hover:text-white transition-all hover:scale-110"><MailIcon /></a>
                <a href={`tel:${contactInfo.phoneTel}`} aria-label="Phone" className="text-gray-400 hover:text-white transition-all hover:scale-110"><PhoneIcon /></a>
             </div>
          </div>
        </div>
        <div className="mt-12 pt-8 text-center text-gray-500">
            <p>&copy; {currentYear} Donde Nando Grill. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;