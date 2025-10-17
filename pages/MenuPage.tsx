import React, { useState, useEffect, useMemo } from 'react';
import { useLocalization } from '../hooks/useLocalization.ts';
import { content } from '../constants/content.ts';
import { ChevronSimpleIcon, SearchIcon } from '../components/icons.tsx';
import ImageViewerModal from '../components/ImageViewerModal.tsx';
import { menuData } from '../constants/menu.ts';

interface MenuPageProps {
    onVisibilityChange: (isHidden: boolean) => void;
}

const MenuPage: React.FC<MenuPageProps> = ({ onVisibilityChange }) => {
    const { language } = useLocalization();
    const menuContent = content.menu;
    const [openCategoryIndex, setOpenCategoryIndex] = useState<number | null>(null);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    
    useEffect(() => {
        onVisibilityChange(isViewerOpen);
        
        // On component unmount, ensure FAB is visible again.
        return () => {
            onVisibilityChange(false);
        };
    }, [isViewerOpen, onVisibilityChange]);


    const handleToggleCategory = (index: number) => {
        // Disable toggle when search is active
        if(searchTerm) return;
        setOpenCategoryIndex(openCategoryIndex === index ? null : index);
    };
    
    const handleOpenViewer = () => {
        setIsViewerOpen(true);
    };

    const filteredMenu = useMemo(() => {
        if (!searchTerm.trim()) {
            return menuData.menu_sections;
        }

        const lowercasedFilter = searchTerm.toLowerCase();

        return menuData.menu_sections
            .map(section => {
                const filteredItems = section.items.filter(item =>
                    item.name_es.toLowerCase().includes(lowercasedFilter) ||
                    item.name_en.toLowerCase().includes(lowercasedFilter)
                );
                return { ...section, items: filteredItems };
            })
            .filter(section => section.items.length > 0);
    }, [searchTerm]);

    const renderMenuContent = () => {
        return (
            <div className="max-w-4xl mx-auto">
                {filteredMenu.map((category, index) => {
                    const isSearchActive = !!searchTerm.trim();
                    const isCategoryOpen = isSearchActive || openCategoryIndex === index;
                    
                    return(
                    <div key={category.title_en} className="border-b border-gray-300 dark:border-gray-700 last:border-b-0">
                        <button
                            onClick={() => handleToggleCategory(index)}
                            className="w-full flex justify-between items-center text-left py-6 disabled:cursor-default"
                            aria-expanded={isCategoryOpen}
                            aria-controls={`category-content-${index}`}
                            disabled={isSearchActive}
                        >
                            <h3 className="text-2xl md:text-3xl font-serif font-bold text-brand-text dark:text-brand-text-dark">{language === 'es' ? category.title_es : category.title_en}</h3>
                            <ChevronSimpleIcon className={`w-6 h-6 text-brand-red transition-transform duration-300 ${isCategoryOpen ? 'rotate-180' : ''}`} />
                        </button>
                        <div
                            id={`category-content-${index}`}
                            className={`transition-all duration-500 ease-in-out overflow-hidden ${isCategoryOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 pt-2 pb-8">
                                {category.items.map(item => {
                                    const notes = language === 'es' ? item.notes_es : item.notes_en;
                                    return (
                                        <div key={item.name_en} className="p-2 -m-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200">
                                            <div className="w-full flex justify-between items-baseline border-b border-dotted border-gray-300 dark:border-gray-600 pb-2">
                                                <p className="text-lg text-gray-800 dark:text-gray-300 pr-4">{language === 'es' ? item.name_es : item.name_en}</p>
                                                <p className="text-lg font-bold text-brand-text dark:text-brand-text-dark whitespace-nowrap">{`C$${item.price}`}</p>
                                            </div>
                                            {notes && (
                                                <p className="text-sm text-gray-600 dark:text-gray-400 pt-1 italic">{notes}</p>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )})}
                 {filteredMenu.length === 0 && searchTerm && (
                    <div className="text-center py-12">
                        <p className="text-lg text-gray-600 dark:text-gray-400">
                            {language === 'es' ? `No se encontraron platos para "${searchTerm}"` : `No dishes found for "${searchTerm}"`}
                        </p>
                    </div>
                )}
            </div>
        );
    };

    return (
        <>
            {/* Page Header */}
            <div className="bg-brand-red pt-20">
                <div className="container mx-auto px-6 py-16 text-center">
                    <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-4 animate-fade-in">{menuContent.title[language]}</h1>
                    <p className="text-xl text-gray-200 mb-6 animate-fade-in" style={{ animationDelay: '200ms' }}>{menuContent.subtitle[language]}</p>
                    <div className="animate-fade-in" style={{ animationDelay: '400ms' }}>
                        <button
                            onClick={handleOpenViewer}
                            className="bg-transparent border-2 border-white text-white font-bold py-2 px-6 rounded-md hover:bg-white hover:text-brand-text transition-colors duration-300"
                        >
                            {menuContent.viewOriginalMenu[language]}
                        </button>
                    </div>
                </div>
            </div>
            
            {/* Full Menu */}
            <section id="full-menu" className="py-20 bg-white dark:bg-brand-surface-dark">
                <div className="container mx-auto px-6">
                    {/* Search Bar */}
                    <div className="max-w-4xl mx-auto mb-12">
                        <div className="relative">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder={menuContent.searchPlaceholder[language]}
                                className="w-full pl-12 pr-4 py-3 bg-gray-100 dark:bg-gray-800 border-2 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent text-lg text-gray-900 dark:text-gray-200 transition-colors"
                                aria-label="Search menu"
                            />
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                <SearchIcon className="w-6 h-6" />
                            </div>
                        </div>
                    </div>
                    
                    {renderMenuContent()}
                    <p className="text-center text-gray-600 dark:text-gray-400 italic mt-8 text-lg">
                        * {menuContent.sidesNote[language]}
                    </p>
                </div>
            </section>
            <ImageViewerModal
                isOpen={isViewerOpen}
                onClose={() => setIsViewerOpen(false)}
                images={menuContent.menuImages}
            />
        </>
    );
};

export default MenuPage;