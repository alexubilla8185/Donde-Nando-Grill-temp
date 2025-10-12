import React from 'react';
import { useLocalization } from '../hooks/useLocalization.ts';
import { content } from '../constants/content.ts';
import { CloseIcon, ShareIcon } from './icons.tsx';
import Logo from './Logo.tsx';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onShareClick: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, onShareClick }) => {
    const { language, setLanguage } = useLocalization();
    const navContent = content.nav;

    const navLinks = [
        { key: 'home', href: '#/home', text: navContent.home[language] },
        { key: 'menu', href: '#/menu', text: navContent.menu[language] },
        { key: 'reservations', href: '#/reservations', text: navContent.reservations[language] },
        { key: 'contact', href: '#/contact', text: navContent.contact[language] },
    ];
    
    const handleShare = () => {
        onClose();
        // A slight delay to allow the menu close animation to start
        setTimeout(onShareClick, 150);
    }

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, newHash: string) => {
        e.preventDefault();
        if (window.location.hash !== newHash) {
            window.location.hash = newHash;
        }
        onClose(); // Close menu after navigation
    };

    return (
        <div 
            className={`fixed inset-0 bg-black bg-opacity-70 z-50 transition-opacity duration-300 md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onClick={onClose} // Close on overlay click
        >
            <div 
                className={`fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white shadow-lg transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-6 flex flex-col h-full">
                    <div className="flex justify-between items-center mb-8">
                        <a href="#/home" onClick={(e) => handleNavClick(e, '#/home')} className="block">
                           <Logo className="h-12 w-auto text-brand-text" />
                        </a>
                        <button onClick={onClose} className="text-brand-text">
                            <CloseIcon className="w-6 h-6"/>
                        </button>
                    </div>
                    <nav className="flex flex-col space-y-6 text-xl text-brand-text flex-grow">
                        {navLinks.map(link => (
                            <a key={link.key} href={link.href} onClick={(e) => handleNavClick(e, link.href)} className="hover:text-brand-red transition-colors">
                                {link.text}
                            </a>
                        ))}
                    </nav>
                    <div className="border-t pt-6 space-y-4">
                        <button onClick={handleShare} className="w-full flex items-center justify-center text-lg text-brand-text hover:text-brand-red transition-colors">
                           <ShareIcon className="w-5 h-5 mr-2"/> {language === 'es' ? 'Compartir' : 'Share'}
                        </button>
                         <button onClick={() => setLanguage(language === 'es' ? 'en' : 'es')} className="w-full text-lg font-bold text-brand-text hover:text-brand-red transition-colors">
                            {language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileMenu;