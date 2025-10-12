import React, { useState, useRef, useEffect } from 'react';
import { useLocalization } from '../hooks/useLocalization.ts';
import { content } from '../constants/content.ts';
import { CloseIcon } from './icons.tsx';

interface Message {
    sender: 'user' | 'model';
    text: string;
}

const Chatbot: React.FC = () => {
    const { language } = useLocalization();
    const chatbotContent = content.chatbot;

    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Effect to reset the chat when the language changes
    useEffect(() => {
        setMessages([]);
        setShowSuggestions(false);
        setInput('');
    }, [language]);

    // Effect to show the initial greeting when the chat is opened and empty
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setIsLoading(true);
            setTimeout(() => {
                setMessages([{ sender: 'model', text: chatbotContent.greeting[language] }]);
                setShowSuggestions(true);
                setIsLoading(false);
            }, 500);
        }
    }, [isOpen, messages.length, language, chatbotContent.greeting]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages, isLoading]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
        if (e.target.value.trim() !== '' && showSuggestions) {
            setShowSuggestions(false);
        }
    };
    
    const handleSuggestionClick = (suggestionType: 'menu' | 'reservations' | 'contact') => {
        setShowSuggestions(false);
        
        switch (suggestionType) {
            case 'menu':
                setIsOpen(false);
                window.location.hash = '#/menu';
                break;
            case 'reservations':
                setIsOpen(false);
                window.location.hash = '#/reservations';
                break;
            case 'contact':
                const userMessage: Message = { sender: 'user', text: chatbotContent.suggestions.contact[language] };
                const botResponse: Message = { sender: 'model', text: chatbotContent.contactInfoResponse[language] };
                setMessages(prev => [...prev, userMessage, botResponse]);
                break;
        }
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        setShowSuggestions(false);
        const userMessage: Message = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        const currentInput = input;
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('/.netlify/functions/gemini-proxy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: currentInput, language }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ error: 'Failed to parse error response' }));
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.error || 'Unknown error'}`);
            }

            const data = await response.json();

            if (data.error) {
                throw new Error(data.error);
            }

            const modelMessage: Message = { sender: 'model', text: data.text };
            setMessages(prev => [...prev, modelMessage]);
        } catch (error) {
            console.error("Error communicating with Gemini API proxy:", error);
            const errorMessage: Message = { sender: 'model', text: chatbotContent.errorMessage[language] };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 bg-brand-red text-white p-3 rounded-full shadow-lg hover:bg-red-800 transition-colors duration-300 z-50 animate-fade-in-scale"
                aria-label="Open chatbot"
            >
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z"/>
                </svg>
            </button>

            <div
                className={`fixed bottom-24 right-6 w-[90vw] max-w-sm h-[60vh] max-h-[500px] bg-white rounded-lg shadow-2xl flex flex-col transition-all duration-300 z-50 ${
                    isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
                }`}
            >
                <div className="bg-brand-text text-white p-4 flex justify-between items-center rounded-t-lg">
                    <h3 className="font-bold text-lg">{chatbotContent.headerTitle[language]}</h3>
                    <button onClick={() => setIsOpen(false)} aria-label="Close chatbot">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex-grow p-4 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            {msg.sender === 'model' && (
                                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-bold text-brand-red shrink-0">N</div>
                            )}
                            <div
                                className={`rounded-2xl px-4 py-2 max-w-[80%] ${
                                    msg.sender === 'user'
                                        ? 'bg-brand-red text-white rounded-br-none'
                                        : 'bg-gray-200 text-brand-text rounded-bl-none'
                                }`}
                            >
                                <p className="text-sm">{msg.text}</p>
                            </div>
                             {msg.sender === 'user' && (
                                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center font-bold text-white shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
                                </div>
                            )}
                        </div>
                    ))}
                    {isLoading && (
                         <div className="flex items-end gap-2 justify-start">
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-bold text-brand-red shrink-0">N</div>
                            <div className="bg-gray-200 text-brand-text rounded-2xl rounded-bl-none px-4 py-2">
                                <div className="flex space-x-1">
                                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse [animation-delay:-0.3s]"></span>
                                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse [animation-delay:-0.15s]"></span>
                                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></span>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
                
                {showSuggestions && (
                    <div className="px-4 pt-2 pb-1 border-t">
                        <div className="flex flex-wrap justify-center gap-2">
                            <button onClick={() => handleSuggestionClick('menu')} className="bg-gray-100 text-sm text-brand-text px-3 py-1 rounded-full hover:bg-gray-200 transition-colors">{chatbotContent.suggestions.menu[language]}</button>
                            <button onClick={() => handleSuggestionClick('reservations')} className="bg-gray-100 text-sm text-brand-text px-3 py-1 rounded-full hover:bg-gray-200 transition-colors">{chatbotContent.suggestions.reservations[language]}</button>
                            <button onClick={() => handleSuggestionClick('contact')} className="bg-gray-100 text-sm text-brand-text px-3 py-1 rounded-full hover:bg-gray-200 transition-colors">{chatbotContent.suggestions.contact[language]}</button>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSendMessage} className="p-3 border-t flex items-center gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={handleInputChange}
                        placeholder={chatbotContent.inputPlaceholder[language]}
                        className="flex-grow w-full px-4 py-2 bg-gray-100 border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-brand-red text-sm"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        className="bg-brand-red text-white w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center hover:bg-red-800 disabled:bg-red-300 transition-colors"
                        disabled={isLoading || !input.trim()}
                        aria-label="Send message"
                    >
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                    </button>
                </form>
            </div>
             <style>{`
                .scrollbar-thin {
                    scrollbar-width: thin;
                    scrollbar-color: #D1D5DB #F3F4F6;
                }
                .scrollbar-thin::-webkit-scrollbar {
                    width: 6px;
                }
                .scrollbar-thin::-webkit-scrollbar-track {
                    background: #F3F4F6;
                }
                .scrollbar-thin::-webkit-scrollbar-thumb {
                    background-color: #D1D5DB;
                    border-radius: 10px;
                    border: 3px solid #F3F4F6;
                }
                 @keyframes fade-in-scale {
                    0% { transform: scale(0.95); opacity: 0; }
                    100% { transform: scale(1); opacity: 1; }
                }
                .animate-fade-in-scale {
                    animation: fade-in-scale 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
                }
            `}</style>
        </>
    );
};

export default Chatbot;