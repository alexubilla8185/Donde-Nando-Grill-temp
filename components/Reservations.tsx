
import React, { useState } from 'react';
import { useLocalization } from '../hooks/useLocalization';
// FIX: Added .ts extension to aid module resolution.
import { content } from '../constants/content.ts';

const Reservations: React.FC = () => {
  const { language } = useLocalization();
  const resContent = content.reservations;
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Here you would typically handle form submission, e.g., send to an API
  };

  return (
    <section id="reservations" className="py-20 bg-brand-bg">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-serif font-bold text-brand-text text-center mb-10">
            {resContent.title[language]}
          </h2>
          {submitted ? (
             <div className="text-center bg-green-100 text-green-800 p-4 rounded-lg">
                <p className="font-bold text-lg">{resContent.form.success[language]}</p>
            </div>
          ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">{resContent.form.name[language]}</label>
              <input type="text" id="name" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-red focus:border-brand-red text-gray-900" />
            </div>
            <div>
              <label htmlFor="contact" className="block text-sm font-medium text-gray-700">{resContent.form.contact[language]}</label>
              <input type="text" id="contact" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-red focus:border-brand-red text-gray-900" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="partySize" className="block text-sm font-medium text-gray-700">{resContent.form.partySize[language]}</label>
                <input type="number" id="partySize" required min="1" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-red focus:border-brand-red text-gray-900" />
              </div>
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">{resContent.form.date[language]}</label>
                <input type="date" id="date" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-red focus:border-brand-red text-gray-900" />
              </div>
              <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-700">{resContent.form.time[language]}</label>
                <input type="time" id="time" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-red focus:border-brand-red text-gray-900" />
              </div>
            </div>
            <div>
              <button type="submit" className="w-full bg-brand-red text-white font-bold py-3 px-6 rounded-md hover:bg-red-800 transition-colors duration-300">
                {resContent.form.submit[language]}
              </button>
            </div>
          </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Reservations;