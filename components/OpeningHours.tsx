import React, { useState, useEffect } from 'react';
import { useLocalization } from '../hooks/useLocalization.ts';
import { content, HoursEntry } from '../constants/content.ts';

// Helper to get the current open/closed status based on system time
const getOpeningStatus = () => {
    const now = new Date();
    // In Nicaragua, GMT-6, which doesn't observe DST.
    // The getDay() and getHours() methods are based on the user's local time, which is what we want.
    const currentDay = now.getDay(); // Sunday - 0 ... Saturday - 6
    const currentHour = now.getHours();
    
    const todaysHours: HoursEntry | undefined = content.openingHours.find(h => h.dayIndices.includes(currentDay));
    
    if (!todaysHours) {
        return { isOpen: false, statusText: { es: 'Cerrado Ahora', en: 'Closed Now' } };
    }
    
    // The logic is inclusive of the open hour and exclusive of the close hour.
    // e.g., if close is 21 (9 PM), it's open until 8:59 PM.
    const isOpen = currentHour >= todaysHours.open && currentHour < todaysHours.close;
    
    return {
        isOpen,
        statusText: isOpen 
            ? { es: 'Abierto Ahora', en: 'Open Now' } 
            : { es: 'Cerrado Ahora', en: 'Closed Now' }
    };
};

interface OpeningHoursProps {
  baseTextColor?: string;
  highlightTextColor?: string;
}

const OpeningHours: React.FC<OpeningHoursProps> = ({ 
    baseTextColor = 'text-gray-700 dark:text-gray-300', 
    highlightTextColor = 'text-brand-text dark:text-white' 
}) => {
    const { language } = useLocalization();
    // Set initial state without waiting for useEffect to prevent layout shift
    const [status, setStatus] = useState(() => getOpeningStatus());
    
    useEffect(() => {
        // Update status every minute to keep it current
        const interval = setInterval(() => {
            setStatus(getOpeningStatus());
        }, 60000); // 60 seconds
        return () => clearInterval(interval);
    }, []);

    const currentDayIndex = new Date().getDay();

    return (
        <div>
            <p className={`mb-2 font-semibold ${status.isOpen ? 'text-green-500' : 'text-brand-red'}`}>
                {status.statusText[language]}
            </p>
            <div className={`space-y-1 ${baseTextColor}`}>
                {content.openingHours.map((entry, index) => {
                    const isCurrent = entry.dayIndices.includes(currentDayIndex);
                    return (
                        <div key={index} className={`flex justify-between items-baseline gap-x-4 transition-colors duration-300 ${isCurrent ? `font-bold ${highlightTextColor}` : ''}`}>
                            <span>{entry.days[language]}:</span>
                            <span className="text-right whitespace-nowrap">{entry.hours}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default OpeningHours;
