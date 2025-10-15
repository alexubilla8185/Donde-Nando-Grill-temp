
import React, { useRef } from 'react';
import { useLocalization } from '../hooks/useLocalization.ts';
import { content } from '../constants/content.ts';
import { CloseIcon, ShareNetworkIcon } from './icons.tsx';
import { useFocusTrap } from '../hooks/useFocusTrap.ts';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onShare: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, onShare }) => {
    const { language, setLanguage } = useLocalization();
    const navContent = content.nav;
    const menuRef = useRef<HTMLDivElement>(null);

    useFocusTrap(menuRef, isOpen);

    const navLinks = [
        { key: 'home', href: '#/home', text: navContent.home[language] },
        { key: 'menu', href: '#/menu', text: navContent.menu[language] },
        { key: 'reservations', href: '#/reservations', text: navContent.reservations[language] },
        { key: 'contact', href: '#/contact', text: navContent.contact[language] },
    ];
    
    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, newHash: string) => {
        e.preventDefault();
        if (window.location.hash !== newHash) {
            window.location.hash = newHash;
        }
        onClose(); // Close menu after navigation
    };

    const handleShareClick = () => {
        onClose();
        onShare();
    };

    return (
        <div 
            className={`fixed inset-0 bg-black/30 backdrop-blur-lg z-50 transition-opacity duration-300 md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onClick={onClose} // Close on overlay click
        >
            <div 
                ref={menuRef}
                id="mobile-menu"
                role="dialog"
                aria-modal="true"
                aria-labelledby="mobile-menu-title"
                className={`fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white/80 dark:bg-brand-surface-dark/80 border-l border-white/20 shadow-lg transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-6 flex flex-col h-full">
                    <div className="flex justify-between items-center mb-8">
                        <a id="mobile-menu-title" href="#/home" onClick={(e) => handleNavClick(e, '#/home')} className="font-serif font-bold text-xl text-brand-text dark:text-brand-text-dark">
                           Donde Nando Grill
                        </a>
                        <button onClick={onClose} className="text-brand-text dark:text-brand-text-dark" aria-label="Close navigation menu">
                            <CloseIcon className="w-6 h-6"/>
                        </button>
                    </div>
                    <nav className="flex flex-col space-y-4 text-2xl text-brand-text dark:text-brand-text-dark flex-grow">
                        {navLinks.map((link, index) => (
                            <a 
                                key={link.key} 
                                href={link.href} 
                                onClick={(e) => handleNavClick(e, link.href)} 
                                className={`block py-2 hover:text-brand-red transition-all duration-300 transform ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                                style={{ transitionDelay: isOpen ? `${150 + index * 50}ms` : '0ms' }}
                            >
                                {link.text}
                            </a>
                        ))}
                    </nav>
                     <div className="border-t dark:border-gray-700 pt-6 flex items-center justify-between">
                         <button
                            onClick={handleShareClick}
                            className="flex items-center text-lg text-brand-text dark:text-brand-text-dark hover:text-brand-red dark:hover:text-brand-red transition-colors"
                            aria-label={content.shareModal.title[language]}
                         >
                            <ShareNetworkIcon className="w-5 h-5 mr-2"/>
                            {content.shareModal.title[language]}
                        </button>
                         <button 
                            onClick={() => setLanguage(language === 'es' ? 'en' : 'es')} 
                            className="flex items-center space-x-2 text-lg text-brand-text dark:text-brand-text-dark"
                            aria-label={`Switch to ${language === 'es' ? 'English' : 'Español'}`}
                         >
                            <span className={`font-bold transition-colors ${language === 'es' ? 'text-brand-red' : 'text-gray-400'}`}>ES</span>
                            <div className="w-10 h-5 bg-gray-200 dark:bg-gray-600 rounded-full p-0.5 flex items-center" aria-hidden="true">
                                <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${language === 'es' ? 'translate-x-0' : 'translate-x-5'}`}></div>
                            </div>
                            <span className={`font-bold transition-colors ${language === 'en' ? 'text-brand-red' : 'text-gray-400'}`}>EN</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileMenu;