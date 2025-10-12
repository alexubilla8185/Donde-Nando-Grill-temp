import React, { useState, useEffect } from 'react';
import { useLocalization } from '../hooks/useLocalization.ts';
import { content } from '../constants/content.ts';
import MobileMenu from './MobileMenu.tsx';
import ShareModal from './ShareModal.tsx';
import { MenuIcon } from './icons.tsx';
import Logo from './Logo.tsx';

interface HeaderProps {
    currentRoute: string;
}

const Header: React.FC<HeaderProps> = ({ currentRoute }) => {
    const { language, setLanguage } = useLocalization();
    const navContent = content.nav;
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    const navLinkClasses = `transition-colors duration-300 hover:text-brand-red ${isHomePageTop ? 'text-white' : 'text-brand-text'}`;
    const activeLinkClasses = `text-brand-red`;

    return (
        <>
            <header className={headerClasses}>
                <div className="container mx-auto px-6 h-20 flex justify-between items-center">
                    <a href="#/home" onClick={(e) => handleNavClick(e, '#/home')} className={`flex items-center transition-colors duration-300 ${isHomePageTop ? 'text-white' : 'text-brand-text'}`}>
                        <Logo className="h-16 w-auto" />
                    </a>
                    <nav className="hidden md:flex items-center space-x-8">
                        {navLinks.map(link => (
                            <a key={link.key} href={link.href} onClick={(e) => handleNavClick(e, link.href)} className={`${navLinkClasses} ${currentRoute === link.key ? activeLinkClasses : ''}`}>
                                {link.text}
                            </a>
                        ))}
                    </nav>
                    <div className="flex items-center space-x-4">
                        <button onClick={() => setLanguage(language === 'es' ? 'en' : 'es')} className={`text-sm font-bold ${navLinkClasses}`}>
                            {language === 'es' ? 'EN' : 'ES'}
                        </button>
                        <div className="hidden md:block">
                          <button onClick={() => setShareModalOpen(true)} className="text-brand-red hover:opacity-75 transition-opacity" aria-label="Share">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-8.316l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"/></svg>
                          </button>
                        </div>
                        <div className="md:hidden">
                            <button onClick={() => setMobileMenuOpen(true)} className={navLinkClasses}>
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