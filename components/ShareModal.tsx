
import React, { useState, useEffect, useRef } from 'react';
import { useLocalization } from '../hooks/useLocalization.ts';
// FIX: Added .ts extension to aid module resolution.
import { content } from '../constants/content.ts';
// FIX: Added .tsx extension to aid module resolution.
import { FacebookIcon, MailIcon, WhatsAppIcon, CloseIcon } from './icons.tsx';
import { useFocusTrap } from '../hooks/useFocusTrap.ts';


interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, url }) => {
  const { language } = useLocalization();
  const modalContent = content.shareModal;
  const [copied, setCopied] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useFocusTrap(modalRef, isOpen);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => setCopied(false), 300); // Reset copied state after closing animation
    }
  }, [isOpen]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

  const shareText = `${modalContent.shareMessage[language]} ${url}`;

  const shareOptions = [
    { name: 'WhatsApp', icon: <WhatsAppIcon className="w-8 h-8"/>, href: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}` },
    { name: 'Facebook', icon: <FacebookIcon className="w-8 h-8"/>, href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
    { name: 'Email', icon: <MailIcon className="w-8 h-8"/>, href: `mailto:?subject=Donde Nando Grill&body=${encodeURIComponent(shareText)}` },
  ];

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 transition-opacity duration-300"
      onClick={onClose}
    >
      <div 
        ref={modalRef}
        className="bg-white dark:bg-brand-surface-dark p-6 rounded-lg shadow-xl max-w-md w-full relative animate-pop-in"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="share-modal-title"
      >
        <button 
          onClick={onClose} 
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-800 dark:hover:text-white"
          aria-label="Close modal"
        >
          <CloseIcon className="w-6 h-6" />
        </button>
        
        <h2 id="share-modal-title" className="text-2xl font-serif font-bold text-brand-text dark:text-brand-text-dark text-center mb-2">
          {modalContent.title[language]}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">{modalContent.subTitle[language]}</p>
        
        <div className="flex justify-center items-start space-x-6 mb-6">
          {shareOptions.map(opt => (
            <a 
              key={opt.name}
              href={opt.href} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex flex-col items-center space-y-2 text-brand-text dark:text-brand-text-dark hover:text-brand-red transition-colors"
            >
              <div className="w-16 h-16 bg-brand-bg dark:bg-gray-700 rounded-full flex items-center justify-center text-brand-text dark:text-brand-text-dark">
                {opt.icon}
              </div>
              <span className="text-xs font-medium">{opt.name}</span>
            </a>
          ))}
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-2 text-center text-sm font-medium">{modalContent.copyLabel[language]}</p>
        <div className="flex">
          <input 
            type="text" 
            readOnly 
            value={url}
            className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-l-md focus:outline-none text-sm text-gray-800 dark:text-gray-200"
            aria-label="Shareable link"
          />
          <button 
            onClick={copyToClipboard}
            className={`w-32 text-white font-bold px-4 py-2 rounded-r-md transition-all duration-300 active:scale-95 ${copied ? 'bg-green-600' : 'bg-brand-red hover:bg-brand-red-dark'}`}
          >
            {copied ? modalContent.copiedButton[language] : modalContent.copyButton[language]}
          </button>
        </div>
        <div className="sr-only" aria-live="polite" aria-atomic="true">
            {copied ? `${modalContent.copiedButton[language]}!` : ''}
        </div>
      </div>
    </div>
  );
};

export default ShareModal;