import React, { useEffect, useRef } from 'react';

export const useFocusTrap = (ref: React.RefObject<HTMLElement>, isOpen: boolean) => {
    const previouslyFocusedElement = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (!isOpen || !ref.current) return;

        // Store the element that was focused before the modal opened
        previouslyFocusedElement.current = document.activeElement as HTMLElement;

        const focusableElements = ref.current.querySelectorAll<HTMLElement>(
            'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        // Move focus to the first focusable element in the modal
        firstElement.focus();

        const handleKeyDown = (e: KeyboardEvent) => {
            // Only handle Tab key presses
            if (e.key !== 'Tab') return;

            if (e.shiftKey) { // Handle Shift + Tab
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else { // Handle Tab
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        };

        const currentRef = ref.current;
        currentRef.addEventListener('keydown', handleKeyDown);

        // Cleanup function
        return () => {
            currentRef.removeEventListener('keydown', handleKeyDown);
            // Restore focus to the element that opened the modal
            previouslyFocusedElement.current?.focus();
        };
    }, [isOpen, ref]);
};
