
import React, { useState, useEffect } from 'react';
import { useLocalization } from '../hooks/useLocalization';
// FIX: Added .ts extension to aid module resolution.
import { content } from '../constants/content.ts';
// FIX: Added .tsx extension to aid module resolution.
import { FacebookIcon, MailIcon, WhatsAppIcon, CloseIcon } from './icons.tsx';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, url }) => {
  const { language } = useLocalization();
  const modalContent = content.shareModal;
  const [copied, setCopied] = useState(false);

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
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-modal-title"
    >
      <div 
        className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full relative transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale"
        onClick={(e) => e.stopPropagation()}
        style={{ animationFillMode: 'forwards' }}
      >
        <button 
          onClick={onClose} 
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-800"
          aria-label="Close modal"
        >
          <CloseIcon className="w-6 h-6" />
        </button>
        
        <h2 id="share-modal-title" className="text-2xl font-serif font-bold text-brand-text text-center mb-2">
          {modalContent.title[language]}
        </h2>
        <p className="text-gray-600 mb-6 text-center">{modalContent.subTitle[language]}</p>
        
        <div className="flex justify-center items-start space-x-6 mb-6">
          {shareOptions.map(opt => (
            <a 
              key={opt.name}
              href={opt.href} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex flex-col items-center space-y-2 text-brand-text hover:text-brand-red transition-colors"
            >
              <div className="w-16 h-16 bg-brand-bg rounded-full flex items-center justify-center text-brand-text">
                {opt.icon}
              </div>
              <span className="text-xs font-medium">{opt.name}</span>
            </a>
          ))}
        </div>

        <p className="text-gray-600 mb-2 text-center text-sm font-medium">{modalContent.copyLabel[language]}</p>
        <div className="flex">
          <input 
            type="text" 
            readOnly 
            value={url}
            className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-l-md focus:outline-none text-sm text-gray-800"
            aria-label="Shareable link"
          />
          <button 
            onClick={copyToClipboard}
            className={`w-32 text-white font-bold px-4 py-2 rounded-r-md transition-colors duration-300 ${copied ? 'bg-green-600' : 'bg-brand-red hover:bg-red-800'}`}
          >
            {copied ? modalContent.copiedButton[language] : modalContent.copyButton[language]}
          </button>
        </div>
      </div>
      <style>
        {`
          @keyframes fade-in-scale {
            0% { transform: scale(0.95); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }
          .animate-fade-in-scale {
            animation: fade-in-scale 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
          }
        `}
      </style>
    </div>
  );
};

export default ShareModal;