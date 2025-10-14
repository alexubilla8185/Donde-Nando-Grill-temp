
import React from 'react';
import { useLocalization } from '../hooks/useLocalization.ts';
// FIX: Added .ts extension to aid module resolution.
import { content } from '../constants/content.ts';
// FIX: Added .tsx extension to aid module resolution.
import { FacebookIcon, InstagramIcon, MailIcon, PhoneIcon } from './icons.tsx';

const Footer: React.FC = () => {
    const { language } = useLocalization();
    const footerContent = content.footer;
    const contactInfo = content.contact;
    const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-text text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="md:col-span-1">
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
          <div className="md:col-span-1">
            <h3 className="font-bold text-lg mb-4">{footerContent.hours[language]}</h3>
            <p className="text-gray-400">{footerContent.openingHours[language]}</p>
          </div>
          <div className="md:col-span-1">
             <h3 className="font-bold text-lg mb-4">Contacto</h3>
             <div className="flex justify-center md:justify-start space-x-6">
                <a href={contactInfo.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-400 hover:text-white transition-all hover:scale-110"><FacebookIcon /></a>
                <a href={contactInfo.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-400 hover:text-white transition-all hover:scale-110"><InstagramIcon /></a>
                <a href={`mailto:${contactInfo.email}`} aria-label="Email" className="text-gray-400 hover:text-white transition-all hover:scale-110"><MailIcon /></a>
                <a href={`tel:${contactInfo.phoneTel}`} aria-label="Phone" className="text-gray-400 hover:text-white transition-all hover:scale-110"><PhoneIcon /></a>
             </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8 text-center text-gray-500">
            <p>&copy; {currentYear} Donde Nando Grill. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;