import React, { useState, useEffect } from 'react';
import { LocalizationProvider } from './context/LocalizationContext.tsx';
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
                return <MenuPage />;
            case 'reservations':
                return <ReservationsPage />;
            case 'contact':
                return <ContactPage />;
            case 'home':
            default:
                return <HomePage />;
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-brand-bg">
            <Header currentRoute={route} />
            <main className="flex-grow">
                {renderPage()}
            </main>
            <Footer />
            <Chatbot />
        </div>
    );
};


const App: React.FC = () => (
    <LocalizationProvider>
        <AppContent />
    </LocalizationProvider>
);

export default App;