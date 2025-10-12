import React, { useState, useEffect, useRef } from 'react';
import { useLocalization } from '../hooks/useLocalization.ts';
import { content } from '../constants/content.ts';

type ReservationType = 'dine-in' | 'takeout';

interface FormData {
    name: string;
    contact: string;
    partySize: string;
    date: string;
    time: string;
    'reservation-type': ReservationType;
}

const ReservationsPage: React.FC = () => {
  const { language } = useLocalization();
  const resContent = content.reservations;
  const [submitted, setSubmitted] = useState(false);
  const [reservationType, setReservationType] = useState<ReservationType>('dine-in');
  const successRef = useRef<HTMLDivElement>(null);


  const [formData, setFormData] = useState<FormData>({
      name: '',
      contact: '',
      partySize: '1',
      date: '',
      time: '',
      'reservation-type': 'dine-in'
  });

  useEffect(() => {
    if (submitted && successRef.current) {
      successRef.current.focus();
    }
  }, [submitted]);

  const encode = (data: { [key: string]: any }) => {
    return Object.keys(data)
        .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
        .join("&");
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newType = e.target.value as ReservationType;
      setReservationType(newType);
      setFormData({ ...formData, 'reservation-type': newType });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalData = { ...formData };
    if (finalData['reservation-type'] === 'takeout') {
        delete (finalData as any).partySize;
    }
    
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "reservations", ...finalData })
    })
      .then(() => setSubmitted(true))
      .catch(error => alert(error));
  };
  
  const getSuccessMessage = () => {
      const typeString = reservationType === 'dine-in' 
          ? resContent.form.successTypeDineIn[language] 
          : resContent.form.successTypeTakeout[language];
      return resContent.form.success[language].replace('{{type}}', typeString);
  };

  return (
    <section id="reservations" className="py-20 bg-brand-bg pt-24">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-serif font-bold text-brand-text text-center mb-10">
            {resContent.title[language]}
          </h2>
          {submitted ? (
             <div ref={successRef} tabIndex={-1} role="alert" className="text-center bg-green-100 text-green-800 p-4 rounded-lg">
                <p className="font-bold text-lg">{getSuccessMessage()}</p>
            </div>
          ) : (
          <form onSubmit={handleSubmit} data-netlify="true" name="reservations-form-react">
            <input type="hidden" name="form-name" value="reservations" />
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">{resContent.form.name[language]}</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-red focus:border-brand-red text-gray-900 transition-all duration-200" />
              </div>
              <div>
                <label htmlFor="contact" className="block text-sm font-medium text-gray-700">{resContent.form.contact[language]}</label>
                <input type="text" id="contact" name="contact" value={formData.contact} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-red focus:border-brand-red text-gray-900 transition-all duration-200" />
              </div>
              
              <div>
                <fieldset>
                  <legend className="block text-sm font-medium text-gray-700">{resContent.form.reservationType[language]}</legend>
                  <div className="mt-2 flex space-x-6">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="reservation-type"
                        value="dine-in"
                        checked={reservationType === 'dine-in'}
                        onChange={handleRadioChange}
                        className="h-4 w-4 text-brand-red border-gray-300 focus:ring-brand-red"
                      />
                      <span className="ml-2 text-gray-700">{resContent.form.dineIn[language]}</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="reservation-type"
                        value="takeout"
                        checked={reservationType === 'takeout'}
                        onChange={handleRadioChange}
                        className="h-4 w-4 text-brand-red border-gray-300 focus:ring-brand-red"
                      />
                      <span className="ml-2 text-gray-700">{resContent.form.takeout[language]}</span>
                    </label>
                  </div>
                </fieldset>
              </div>

              <div className={`grid grid-cols-1 ${reservationType === 'dine-in' ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-6`}>
                {reservationType === 'dine-in' && (
                    <div>
                      <label htmlFor="partySize" className="block text-sm font-medium text-gray-700">{resContent.form.partySize[language]}</label>
                      <input type="number" id="partySize" name="partySize" value={formData.partySize} onChange={handleChange} required={reservationType === 'dine-in'} min="1" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-red focus:border-brand-red text-gray-900 transition-all duration-200" />
                    </div>
                )}
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700">{resContent.form.date[language]}</label>
                  <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-red focus:border-brand-red text-gray-900 transition-all duration-200" />
                </div>
                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-gray-700">{resContent.form.time[language]}</label>
                  <input type="time" id="time" name="time" value={formData.time} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-red focus:border-brand-red text-gray-900 transition-all duration-200" />
                </div>
              </div>
              <div>
                <button type="submit" className="w-full bg-brand-red text-white font-bold py-3 px-6 rounded-md hover:bg-red-800 transition-all duration-300 hover:scale-105 active:scale-95">
                  {resContent.form.submit[language]}
                </button>
              </div>
            </div>
          </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ReservationsPage;