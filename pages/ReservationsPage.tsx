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
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

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
  
  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Name validation
    if (!formData.name.trim() || formData.name.trim().length < 2) {
        newErrors.name = language === 'es' ? 'El nombre debe tener al menos 2 caracteres.' : 'Name must be at least 2 characters long.';
    }

    // Contact validation
    if (!formData.contact.trim()) {
        newErrors.contact = language === 'es' ? 'El campo de contacto es obligatorio.' : 'Contact is required.';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.contact) && !/^\+?[0-9\s-()]{7,}$/.test(formData.contact)) {
        newErrors.contact = language === 'es' ? 'Por favor ingrese un email o teléfono válido.' : 'Please enter a valid email or phone number.';
    }
    
    // Date validation
    const selectedDate = formData.date ? new Date(`${formData.date}T00:00:00`) : null;
    if (!formData.date) {
        newErrors.date = language === 'es' ? 'La fecha es obligatoria.' : 'Date is required.';
    } else if (selectedDate && selectedDate < today) {
        newErrors.date = language === 'es' ? 'No puede reservar en una fecha pasada.' : 'Cannot book a date in the past.';
    }

    // Time validation
    if (!formData.time) {
        newErrors.time = language === 'es' ? 'La hora es obligatoria.' : 'Time is required.';
    }

    // Date/Time validation against opening hours
    if (formData.date && formData.time) {
        const selectedDateTime = new Date(`${formData.date}T${formData.time}`);
        const dayOfWeek = selectedDateTime.getDay(); // Sunday - 0, Monday - 1
        const hour = selectedDateTime.getHours();

        if (dayOfWeek === 1) { // Monday
             if (!newErrors.date) {
                newErrors.date = language === 'es' ? 'El restaurante está cerrado los Lunes.' : 'The restaurant is closed on Mondays.';
             }
        } else if (hour < 12 || hour >= 22) {
             if (!newErrors.time) {
                newErrors.time = language === 'es' ? 'El horario de atención es de 12:00 PM a 10:00 PM.' : 'Booking hours are from 12:00 PM to 10:00 PM.';
             }
        }
    }

    // Reservation type specific validation
    if (formData['reservation-type'] === 'dine-in') {
        if (!formData.partySize || parseInt(formData.partySize, 10) < 1) {
            newErrors.partySize = language === 'es' ? 'El número de personas debe ser al menos 1.' : 'Party size must be at least 1.';
        }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
      if (errors[name as keyof FormData]) {
          setErrors(prevErrors => ({ ...prevErrors, [name]: undefined }));
      }
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newType = e.target.value as ReservationType;
      setReservationType(newType);
      setFormData({ ...formData, 'reservation-type': newType });
      if (errors['reservation-type']) {
          setErrors(prevErrors => ({ ...prevErrors, 'reservation-type': undefined }));
      }
      if (newType === 'takeout' && errors.partySize) {
           setErrors(prevErrors => ({ ...prevErrors, partySize: undefined }));
      }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
        return;
    }
    
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "reservations", ...formData })
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
    <>
      <div className="bg-brand-red pt-20">
          <div className="container mx-auto px-6 py-12 text-center text-white">
              <h1 className="text-5xl md:text-6xl font-serif font-bold animate-fade-in">
                  {resContent.title[language]}
              </h1>
          </div>
      </div>
      <section id="reservations" className="py-20 bg-brand-bg">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            {submitted ? (
               <div ref={successRef} tabIndex={-1} role="alert" className="text-center bg-green-100 text-green-800 p-4 rounded-lg">
                  <p className="font-bold text-lg">{getSuccessMessage()}</p>
              </div>
            ) : (
            <form onSubmit={handleSubmit} noValidate data-netlify="true" name="reservations-form-react">
              <input type="hidden" name="form-name" value="reservations" />
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">{resContent.form.name[language]}</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className={`mt-1 block w-full px-3 py-2 bg-white border rounded-md shadow-sm focus:outline-none focus:ring-brand-red focus:border-brand-red text-gray-900 transition-all duration-200 ${errors.name ? 'border-red-500' : 'border-gray-300'}`} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined} />
                  {errors.name && <p id="name-error" className="mt-1 text-sm text-red-600 animate-fade-in">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="contact" className="block text-sm font-medium text-gray-700">{resContent.form.contact[language]}</label>
                  <input type="text" id="contact" name="contact" value={formData.contact} onChange={handleChange} required className={`mt-1 block w-full px-3 py-2 bg-white border rounded-md shadow-sm focus:outline-none focus:ring-brand-red focus:border-brand-red text-gray-900 transition-all duration-200 ${errors.contact ? 'border-red-500' : 'border-gray-300'}`} aria-invalid={!!errors.contact} aria-describedby={errors.contact ? 'contact-error' : undefined}/>
                  {errors.contact && <p id="contact-error" className="mt-1 text-sm text-red-600 animate-fade-in">{errors.contact}</p>}
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
                        <input type="number" id="partySize" name="partySize" value={formData.partySize} onChange={handleChange} required={reservationType === 'dine-in'} min="1" className={`mt-1 block w-full px-3 py-2 bg-white border rounded-md shadow-sm focus:outline-none focus:ring-brand-red focus:border-brand-red text-gray-900 transition-all duration-200 ${errors.partySize ? 'border-red-500' : 'border-gray-300'}`} aria-invalid={!!errors.partySize} aria-describedby={errors.partySize ? 'partySize-error' : undefined} />
                        {errors.partySize && <p id="partySize-error" className="mt-1 text-sm text-red-600 animate-fade-in">{errors.partySize}</p>}
                      </div>
                  )}
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">{resContent.form.date[language]}</label>
                    <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required className={`mt-1 block w-full px-3 py-2 bg-white border rounded-md shadow-sm focus:outline-none focus:ring-brand-red focus:border-brand-red text-gray-900 transition-all duration-200 ${errors.date ? 'border-red-500' : 'border-gray-300'}`} aria-invalid={!!errors.date} aria-describedby={errors.date ? 'date-error' : undefined} />
                    {errors.date && <p id="date-error" className="mt-1 text-sm text-red-600 animate-fade-in">{errors.date}</p>}
                  </div>
                  <div>
                    <label htmlFor="time" className="block text-sm font-medium text-gray-700">{resContent.form.time[language]}</label>
                    <input type="time" id="time" name="time" value={formData.time} onChange={handleChange} required className={`mt-1 block w-full px-3 py-2 bg-white border rounded-md shadow-sm focus:outline-none focus:ring-brand-red focus:border-brand-red text-gray-900 transition-all duration-200 ${errors.time ? 'border-red-500' : 'border-gray-300'}`} aria-invalid={!!errors.time} aria-describedby={errors.time ? 'time-error' : undefined} />
                    {errors.time && <p id="time-error" className="mt-1 text-sm text-red-600 animate-fade-in">{errors.time}</p>}
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
    </>
  );
};

export default ReservationsPage;