
import React, { useState, useEffect } from 'react';
import { useLocalization } from '../hooks/useLocalization.ts';
import { content } from '../constants/content.ts';
import MobileMenu from './MobileMenu.tsx';
import ShareModal from './ShareModal.tsx';
import { MenuIcon, ShareNetworkIcon } from './icons.tsx';

interface HeaderProps {
    currentRoute: string;
    isMobileMenuOpen: boolean;
    setMobileMenuOpen: (isOpen: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ currentRoute, isMobileMenuOpen, setMobileMenuOpen }) => {
    const { language, setLanguage } = useLocalization();
    const navContent = content.nav;
    const [isShareModalOpen, setShareModalOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
    };

    const isHomePageTop = currentRoute === 'home' && !isScrolled;
    const headerClasses = `fixed top-0 left-0 w-full z-40 transition-all duration-300 ${isHomePageTop ? 'bg-transparent' : 'bg-white shadow-md'}`;
    const navLinkClasses = `transition-all duration-300 hover:text-brand-red ${isHomePageTop ? 'text-white' : 'text-brand-text'}`;
    const activeLinkClasses = `text-brand-red`;

    return (
        <>
            <header className={headerClasses}>
                <div className="container mx-auto px-6 h-20 flex justify-between items-center">
                    <a href="#/home" onClick={(e) => handleNavClick(e, '#/home')} className={`font-serif font-bold text-2xl ${navLinkClasses} transition-transform duration-300 hover:scale-105`}>
                        Donde Nando Grill
                    </a>
                    <nav className="hidden md:flex items-center space-x-8">
                        {navLinks.map(link => (
                            <a key={link.key} href={link.href} onClick={(e) => handleNavClick(e, link.href)} className={`group ${navLinkClasses} ${currentRoute === link.key ? activeLinkClasses : ''}`}>
                                {link.text}
                                <span className={`block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-brand-red mt-0.5 ${currentRoute === link.key ? 'max-w-full' : ''}`}></span>
                            </a>
                        ))}
                    </nav>
                    <div className="flex items-center space-x-4">
                        <button onClick={() => setLanguage(language === 'es' ? 'en' : 'es')} className={`text-sm font-bold ${navLinkClasses} transition-transform hover:scale-110`}>
                            {language === 'es' ? 'EN' : 'ES'}
                        </button>
                        <div className="hidden md:block">
                          <button onClick={() => setShareModalOpen(true)} className="text-brand-red transition-all duration-200 hover:scale-110 hover:-rotate-6" aria-label="Share">
                            <ShareNetworkIcon className="w-6 h-6" />
                          </button>
                        </div>
                        <div className="md:hidden">
                            <button onClick={() => setMobileMenuOpen(true)} className={`${navLinkClasses} transition-transform duration-200 hover:scale-110 hover:rotate-6`}>
                                <MenuIcon className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>
            <MobileMenu 
                isOpen={isMobileMenuOpen} 
                onClose={() => setMobileMenuOpen(false)}
                onShareClick={() => {
                    setMobileMenuOpen(false);
                    setShareModalOpen(true);
                }}
            />
            <ShareModal isOpen={isShareModalOpen} onClose={() => setShareModalOpen(false)} url={content.appUrl} />
        </>
    );
};

export default Header;