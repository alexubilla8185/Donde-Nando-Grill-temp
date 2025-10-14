import React, { useState, useEffect, useCallback, useRef } from 'react';
import { CloseIcon, ChevronLeftIcon, ChevronRightIcon } from './icons.tsx';
import { useFocusTrap } from '../hooks/useFocusTrap.ts';

interface ImageViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  startIndex?: number;
}

const ImageViewerModal: React.FC<ImageViewerModalProps> = ({ isOpen, onClose, images, startIndex = 0 }) => {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const modalRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  useFocusTrap(modalRef, isOpen);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(startIndex);
    }
  }, [isOpen, startIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  }, [images.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    const swipeThreshold = 50;

    if (diff > swipeThreshold) {
      handleNext();
    } else if (diff < -swipeThreshold) {
      handlePrev();
    }
    
    setTouchStart(null);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      else if (e.key === 'ArrowLeft') handlePrev();
      else if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleNext, handlePrev, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-2 sm:p-4 transition-opacity duration-300 animate-fade-in"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="relative w-auto h-full max-w-[95vw] max-h-[95vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Image viewer"
      >
        <button
          onClick={onClose}
          className="absolute top-0 right-0 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75 z-20"
          aria-label="Close viewer"
        >
          <CloseIcon className="w-6 h-6" />
        </button>

        {/* Main Image Container */}
        <div 
          className="flex-grow relative w-full flex items-center justify-center min-h-0"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`Menu page ${currentIndex + 1}`}
            className="max-w-full max-h-full object-contain rounded-lg animate-fade-in-image"
          />
          
          <div 
              className="absolute bottom-2 text-white bg-black bg-opacity-60 px-3 py-1 rounded-full text-sm"
              aria-live="polite"
              aria-atomic="true"
          >
            {currentIndex + 1} / {images.length}
          </div>
        </div>
        
        {/* Thumbnail Strip & Controls */}
        {images.length > 1 && (
          <div className="flex-shrink-0 mt-2 sm:mt-4 flex items-center justify-center gap-2 sm:gap-4">
            <button
              onClick={handlePrev}
              className="bg-black bg-opacity-40 text-white rounded-full p-2 hover:bg-opacity-60 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>
            <div className="flex-grow overflow-x-auto">
              <div className="flex justify-center items-center space-x-3 p-2">
                {images.map((imgSrc, index) => (
                  <button
                    key={imgSrc}
                    onClick={() => setCurrentIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-md overflow-hidden transition-all duration-200 ring-2 ring-offset-2 ring-offset-black/50 ${currentIndex === index ? 'ring-brand-red' : 'ring-transparent hover:ring-white/70'}`}
                    aria-label={`View image ${index + 1}`}
                    aria-current={currentIndex === index ? 'true' : 'false'}
                  >
                    <img
                      src={imgSrc}
                      alt={`Thumbnail for menu page ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
             <button
              onClick={handleNext}
              className="bg-black bg-opacity-40 text-white rounded-full p-2 hover:bg-opacity-60 transition-colors"
              aria-label="Next image"
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>
      <style>
        {`
          @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .animate-fade-in {
            animation: fade-in 0.3s ease;
          }
          @keyframes fade-in-image {
            from { opacity: 0.3; }
            to { opacity: 1; }
          }
          .animate-fade-in-image {
            animation: fade-in-image 0.2s ease-in-out;
          }
          /* Custom scrollbar for thumbnails */
          .overflow-x-auto::-webkit-scrollbar {
            height: 8px;
          }
          .overflow-x-auto::-webkit-scrollbar-track {
            background: rgba(0,0,0,0.2);
            border-radius: 4px;
          }
          .overflow-x-auto::-webkit-scrollbar-thumb {
            background: rgba(255,255,255,0.4);
            border-radius: 4px;
          }
          .overflow-x-auto::-webkit-scrollbar-thumb:hover {
            background: rgba(255,255,255,0.6);
          }
        `}
      </style>
    </div>
  );
};

export default ImageViewerModal;