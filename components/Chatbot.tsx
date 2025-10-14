// FIX: Replaced placeholder content with a functional Chatbot component to resolve module errors.
import React, { useState, useEffect, useRef } from 'react';
import { useLocalization } from '../hooks/useLocalization.ts';
import { content } from '../constants/content.ts';
import { ChatIcon, CloseIcon, SendIcon, AssistantAvatarIcon } from './icons.tsx';

interface Message {
    role: 'user' | 'model';
    text: string;
}

interface ChatbotProps {
    isHidden: boolean;
}

// Type for function calls from the backend
interface FunctionCall {
    name: string;
    args: any;
}


const Chatbot: React.FC<ChatbotProps> = ({ isHidden }) => {
    const { language } = useLocalization();
    const chatbotContent = content.chatbot;
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen && messages.length === 0) {
             // Add initial greeting from the bot when chat opens for the first time
            setMessages([{ role: 'model', text: chatbotContent.greeting[language] }]);
        }
    }, [isOpen, messages.length, chatbotContent.greeting, language]);

    useEffect(() => {
        // Scroll to the bottom of messages list
        messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
    }, [messages, isLoading]);

    const handleSendMessage = async (messageText: string) => {
        if (!messageText.trim() || isLoading) return;

        const userMessage: Message = { role: 'user', text: messageText };
        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);
        
        // The conversation history sent to the API must not include the initial UI greeting from the model.
        // It must always start with a user message.
        const historyForApi = (messages.length > 0 && messages[0].role === 'model' ? messages.slice(1) : messages)
            .map(m => ({
                role: m.role,
                parts: [{ text: m.text }]
            }));

        try {
            const response = await fetch('/.netlify/functions/gemini-proxy', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: messageText, history: historyForApi, language }),
            });

            if (!response.ok) {
                throw new Error('API request failed');
            }

            const data = await response.json();
            const responseText = data.response || "I'm sorry, I didn't get that. Could you rephrase?";
            const botMessage: Message = { role: 'model', text: responseText };
            setMessages(prev => [...prev, botMessage]);

            // Handle function calls for navigation
            if (data.functionCalls && Array.isArray(data.functionCalls)) {
                for (const call of data.functionCalls as FunctionCall[]) {
                    if (call.name === 'navigateToPage' && call.args.page) {
                        // Use a short timeout to let the user read the bot's message before navigating
                        setTimeout(() => {
                           window.location.hash = `#/${call.args.page}`;
                           setIsOpen(false); // Close chat after navigation
                        }, 1000);
                    }
                }
            }


        } catch (error) {
            console.error("Chatbot error:", error);
            const errorMessage: Message = { role: 'model', text: "Sorry, I'm having trouble connecting right now. Please try again later." };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSendMessage(input);
        setInput('');
    };

    const suggestions = [
        { chip: chatbotContent.suggestions.menu.chip[language], prompt: chatbotContent.suggestions.menu.prompt[language] },
        { chip: chatbotContent.suggestions.hours.chip[language], prompt: chatbotContent.suggestions.hours.prompt[language] },
        { chip: chatbotContent.suggestions.reservation.chip[language], prompt: chatbotContent.suggestions.reservation.prompt[language] },
    ];

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/30 dark:bg-black/50 backdrop-blur-sm z-30 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsOpen(false)}
                aria-hidden="true"
            ></div>

            {/* Chat Window */}
            <div className={`fixed bottom-24 right-4 left-4 h-[70vh] max-h-[550px] bg-white dark:bg-brand-surface-dark rounded-lg shadow-2xl flex flex-col transition-all duration-300 z-40 sm:left-auto sm:right-6 sm:w-96 sm:h-[600px] ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
                {/* Header */}
                <div className="flex justify-between items-center p-3 bg-brand-text dark:bg-black text-white rounded-t-lg">
                    <h3 className="font-bold text-lg">{chatbotContent.title[language]}</h3>
                    <button onClick={() => setIsOpen(false)} aria-label="Close chat">
                        <CloseIcon className="w-5 h-5" />
                    </button>
                </div>
                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto">
                    <div className="space-y-4">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex items-end gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                {msg.role === 'model' && (
                                    <div className="w-8 h-8 rounded-full bg-brand-red flex items-center justify-center shrink-0" aria-hidden="true">
                                      <AssistantAvatarIcon className="w-5 h-5 text-white" />
                                    </div>
                                )}
                                <div className={`max-w-[80%] px-3 py-2 rounded-xl text-sm ${msg.role === 'user' ? 'bg-brand-red text-white rounded-br-none' : 'bg-gray-200 dark:bg-gray-700 text-brand-text dark:text-brand-text-dark rounded-bl-none'}`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                             <div className="flex items-end gap-2.5 justify-start animate-fade-in">
                                <div className="w-8 h-8 rounded-full bg-brand-red flex items-center justify-center shrink-0" aria-hidden="true">
                                    <AssistantAvatarIcon className="w-5 h-5 text-white" />
                                </div>
                                <div className="max-w-[80%] px-4 py-3 rounded-xl bg-gray-200 dark:bg-gray-700 text-brand-text dark:text-brand-text-dark rounded-bl-none">
                                    <div className="flex items-center justify-center space-x-1.5">
                                      <span className="typing-dot w-2 h-2 bg-gray-500 rounded-full"></span>
                                      <span className="typing-dot w-2 h-2 bg-gray-500 rounded-full"></span>
                                      <span className="typing-dot w-2 h-2 bg-gray-500 rounded-full"></span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div ref={messagesEndRef} />
                </div>
                {/* Input */}
                <form onSubmit={handleFormSubmit} className="p-3 border-t dark:border-gray-700">
                    {/* Suggestion Chips */}
                    {!isLoading && messages.length > 0 && (
                        <div className="pb-3 animate-fade-in">
                            <div className="flex flex-wrap justify-start gap-2">
                                {suggestions.map((suggestion, i) => (
                                    <button
                                        key={i}
                                        type="button"
                                        onClick={() => handleSendMessage(suggestion.prompt)}
                                        className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-brand-text dark:text-brand-text-dark text-sm rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red"
                                    >
                                        {suggestion.chip}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                    <div className="flex items-center">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={chatbotContent.placeholder[language]}
                            className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-l-md focus:outline-none focus:ring-1 focus:ring-brand-red text-gray-900 dark:text-gray-200"
                            disabled={isLoading}
                        />
                        <button type="submit" className="bg-brand-red text-white p-2.5 rounded-r-md disabled:bg-red-400 transition-colors" disabled={isLoading || !input.trim()}>
                           <SendIcon className="w-5 h-5" />
                        </button>
                    </div>
                </form>
            </div>
            {/* FAB */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-6 right-6 w-14 h-14 bg-brand-red text-white rounded-full shadow-lg flex items-center justify-center z-50 transition-all duration-300 hover:scale-110 active:scale-95 ${isHidden ? 'opacity-0 scale-0 pointer-events-none' : ''}`}
                aria-label={chatbotContent.tooltip[language]}
            >
                {isOpen ? <CloseIcon className="w-7 h-7" /> : <ChatIcon className="w-7 h-7" />}
            </button>
        </>
    );
};

export default Chatbot;