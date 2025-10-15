
import React, { useState, useEffect } from 'react';
import { useLocalization } from '../hooks/useLocalization.ts';
import { useTheme } from '../hooks/useTheme.ts';
import { content } from '../constants/content.ts';
import MobileMenu from './MobileMenu.tsx';
import ShareModal from './ShareModal.tsx';
import { MenuIcon, ShareNetworkIcon, SunIcon, MoonIcon } from './icons.tsx';

interface HeaderProps {
    currentRoute: string;
    isMobileMenuOpen: boolean;
    setMobileMenuOpen: (isOpen: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ currentRoute, isMobileMenuOpen, setMobileMenuOpen }) => {
    const { language, setLanguage } = useLocalization();
    const { theme, toggleTheme } = useTheme();
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
    const headerClasses = `fixed top-0 left-0 w-full z-40 transition-all duration-300 ${isHomePageTop ? 'bg-transparent' : 'bg-white/80 dark:bg-brand-surface-dark/80 shadow-md backdrop-blur-lg'}`;
    const navLinkClasses = `transition-all duration-300 hover:text-brand-red ${isHomePageTop ? 'text-brand-text' : 'text-brand-text dark:text-brand-text-dark'}`;
    const activeLinkClasses = `text-brand-red`;

    return (
        <>
            <header className={headerClasses}>
                <div className="container mx-auto px-6 h-20 flex justify-between items-center">
                    <a href="#/home" onClick={(e) => handleNavClick(e, '#/home')} className={`font-serif font-bold text-2xl ${navLinkClasses} transition-transform duration-300 hover:scale-105 rounded-sm`}>
                        Donde Nando Grill
                    </a>
                    <nav className="hidden md:flex items-center space-x-8" aria-label="Main navigation">
                        {navLinks.map(link => (
                            <a 
                                key={link.key} 
                                href={link.href} 
                                onClick={(e) => handleNavClick(e, link.href)} 
                                className={`group ${navLinkClasses} ${currentRoute === link.key ? activeLinkClasses : ''} rounded-sm`}
                                aria-current={currentRoute === link.key ? 'page' : undefined}
                            >
                                {link.text}
                                <span className={`block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-brand-red mt-0.5 ${currentRoute === link.key ? 'max-w-full' : ''}`}></span>
                            </a>
                        ))}
                    </nav>
                    <div className="flex items-center space-x-4">
                        <button 
                            onClick={() => setLanguage(language === 'es' ? 'en' : 'es')} 
                            className={`text-sm font-bold ${navLinkClasses} transition-transform hover:scale-110 rounded-sm hidden md:block`}
                            aria-label={`Switch to ${language === 'es' ? 'English' : 'Español'}`}
                        >
                            {language === 'es' ? 'EN' : 'ES'}
                        </button>
                         <button
                            onClick={toggleTheme}
                            className={`${navLinkClasses} transition-transform hover:scale-110 rounded-sm`}
                            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                        >
                            {theme === 'light' ? <MoonIcon className="w-6 h-6" /> : <SunIcon className="w-6 h-6" />}
                        </button>
                        <button onClick={() => setShareModalOpen(true)} className={`hidden md:inline-block text-brand-red transition-all duration-200 hover:scale-110 hover:-rotate-6 rounded-sm`} aria-label="Share this page">
                            <ShareNetworkIcon className="w-6 h-6" />
                        </button>
                        <div className="md:hidden">
                            <button 
                                onClick={() => setMobileMenuOpen(true)} 
                                className={`${navLinkClasses} transition-transform duration-200 hover:scale-110 hover:rotate-6 rounded-sm`}
                                aria-label="Open navigation menu"
                                aria-controls="mobile-menu"
                                aria-expanded={isMobileMenuOpen}
                            >
                                <MenuIcon className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>
            <MobileMenu 
                isOpen={isMobileMenuOpen} 
                onClose={() => setMobileMenuOpen(false)}
                onShare={() => setShareModalOpen(true)}
            />
            <ShareModal isOpen={isShareModalOpen} onClose={() => setShareModalOpen(false)} url={content.appUrl} />
        </>
    );
};

export default Header;