import React from 'react';
import { useLocalization } from '../hooks/useLocalization.ts';
import { content } from '../constants/content.ts';
import { MailIcon, PhoneIcon, ClockIcon } from '../components/icons.tsx';
import OpeningHours from '../components/OpeningHours.tsx';

const ContactPage: React.FC = () => {
  const { language } = useLocalization();
  const contactContent = content.contact;
  const footerContent = content.footer;

  return (
    <>
      <div className="bg-brand-red pt-20">
        <div className="container mx-auto px-6 py-16 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4 animate-fade-in">
            {contactContent.title[language]}
          </h1>
          <p className="text-xl text-gray-200 animate-fade-in" style={{ animationDelay: '200ms' }}>
            {contactContent.subtitle[language]}
          </p>
        </div>
      </div>
      <section id="contact" className="py-20 bg-brand-bg dark:bg-brand-bg-dark">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
            {/* Contact Info */}
            <div className="bg-white dark:bg-brand-surface-dark p-8 rounded-lg shadow-lg flex flex-col">
              <h3 className="text-2xl font-bold text-brand-text dark:text-brand-text-dark mb-6">Información de Contacto</h3>
              <div className="space-y-4 text-gray-700 dark:text-gray-300 flex-grow">
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
                  <a href={`tel:${contactContent.phoneTel}`} className="flex items-center hover:text-brand-red transition-colors">
                    <PhoneIcon className="w-4 h-4 mr-2 shrink-0" />
                    {contactContent.phoneDisplay}
                  </a>
                </div>
                <div className="flex items-center">
                  <p className="font-semibold w-24 shrink-0">Email:</p>
                  <a href={`mailto:${contactContent.email}`} className="flex items-center hover:text-brand-red transition-colors break-all">
                    <MailIcon className="w-4 h-4 mr-2 shrink-0" />
                    {contactContent.email}
                  </a>
                </div>
                 <div className="flex items-start">
                  <p className="font-semibold w-24 shrink-0">{footerContent.hours[language]}:</p>
                  <div className="flex items-start gap-x-2">
                    <ClockIcon className="w-4 h-4 shrink-0 mt-1" />
                    <div className="w-full">
                       <OpeningHours />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-lg shadow-lg overflow-hidden">
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3523.3026736578854!2d-87.1203872!3d12.6233081!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f70f182fbef2a9d%3A0xbe61a3df3a7ad7bf!2sRotonda%20Los%20Encuentros!5e1!3m2!1sen!2sus!4v1760311562929!5m2!1sen!2sus" 
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

export default ContactPage;