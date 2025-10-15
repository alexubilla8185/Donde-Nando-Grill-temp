import React, { useState, useEffect } from 'react';
import { LocalizationProvider } from './context/LocalizationContext.tsx';
import { ThemeProvider } from './context/ThemeContext.tsx';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import HomePage from './pages/HomePage.tsx';
import MenuPage from './pages/MenuPage.tsx';
import ReservationsPage from './pages/ReservationsPage.tsx';
import ContactPage from './pages/ContactPage.tsx';
import Chatbot from './components/Chatbot.tsx';

// A simple hash-based router
const getCurrentRoute = () => window.location.hash.replace('#/', '') || 'home';

const AppContent: React.FC = () => {
    // FIX: Forcibly set 'home' as initial route to address user's complaint.
    // This overrides any initial URL hash.
    const [route, setRoute] = useState('home');
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isFabHidden, setFabHidden] = useState(false);

    useEffect(() => {
        // Sync the URL hash with the initial state and set up the listener.
        if (getCurrentRoute() !== 'home') {
            window.location.hash = '#/home';
        }

        const handleHashChange = () => {
            setRoute(getCurrentRoute());
        };
        window.addEventListener('hashchange', handleHashChange);
        
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    useEffect(() => {
        if (route !== 'home') {
            window.scrollTo(0, 0);
        }
    }, [route]);

    const renderPage = () => {
        switch (route) {
            case 'menu':
                return <MenuPage onVisibilityChange={setFabHidden} />;
            case 'reservations':
                return <ReservationsPage />;
            case 'contact':
                return <ContactPage />;
            case 'home':
            default:
                return <HomePage onVisibilityChange={setFabHidden} />;
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-brand-bg dark:bg-brand-bg-dark">
            <Header
              currentRoute={route}
              isMobileMenuOpen={isMobileMenuOpen}
              setMobileMenuOpen={setMobileMenuOpen}
            />
            <main id="main-content" className="flex-grow">
                {renderPage()}
            </main>
            <Footer />
            <Chatbot isHidden={isMobileMenuOpen || isFabHidden} />
        </div>
    );
};


const App: React.FC = () => (
    <ThemeProvider>
        <LocalizationProvider>
            <AppContent />
        </LocalizationProvider>
    </ThemeProvider>
);

export default App;