
// Creating the Contact component.
import React from 'react';
import { useLocalization } from '../hooks/useLocalization';
// FIX: Added .ts extension to aid module resolution.
import { content } from '../constants/content.ts';
// FIX: Added .tsx extension to aid module resolution.
import { MailIcon, PhoneIcon } from './icons.tsx';

const Contact: React.FC = () => {
  const { language } = useLocalization();
  const contactContent = content.contact;

  return (
    <>
      <section id="contact" className="py-20 bg-brand-bg">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-serif font-bold text-brand-text mb-4">
              {contactContent.title[language]}
            </h2>
            <p className="text-lg text-gray-700">
              {contactContent.subtitle[language]}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
            {/* Contact Info */}
            <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col">
              <h3 className="text-2xl font-bold text-brand-text mb-6">Información de Contacto</h3>
              <div className="space-y-4 text-gray-700 flex-grow">
                <div className="flex items-start">
                  <p className="font-semibold w-24 shrink-0">Dirección:</p>
                  <a 
                    href={contactContent.googleMapsUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-brand-red transition-colors"
                  >
                    {contactContent.address}
                  </a>
                </div>
                <div className="flex items-center">
                  <p className="font-semibold w-24 shrink-0">Teléfono:</p>
                  <a href={`tel:${contactContent.phone.replace(/\s/g, '')}`} className="flex items-center hover:text-brand-red transition-colors">
                    <PhoneIcon className="w-4 h-4 mr-2 shrink-0" />
                    {contactContent.phone}
                  </a>
                </div>
                <div className="flex items-center">
                  <p className="font-semibold w-24 shrink-0">Email:</p>
                  <a href={`mailto:${contactContent.email}`} className="flex items-center hover:text-brand-red transition-colors break-all">
                    <MailIcon className="w-4 h-4 mr-2 shrink-0" />
                    {contactContent.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-lg shadow-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3523.2088405207564!2d-87.1190228!3d12.630119800000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f70f13666fdfb2d%3A0x1fb73700e6e01f28!2sDonde%20Nando%20Grill!5e1!3m2!1sen!2sus!4v1760238581693!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '400px' }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Restaurant Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;