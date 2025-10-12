
import React, { useState } from 'react';
import { useLocalization } from '../hooks/useLocalization.ts';
import { content } from '../constants/content.ts';
import { ChevronSimpleIcon } from '../components/icons.tsx';
import ImageViewerModal from '../components/ImageViewerModal.tsx';
import { menuData } from '../constants/menu.ts';


const MenuPage: React.FC = () => {
    const { language } = useLocalization();
    const menuContent = content.menu;
    const [openCategoryIndex, setOpenCategoryIndex] = useState<number | null>(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);

    const handleToggleCategory = (index: number) => {
        setOpenCategoryIndex(openCategoryIndex === index ? null : index);
    };
    
    const handleOpenViewer = () => {
        setIsViewerOpen(true);
    };

    const featuredDishes = [
        {
            key: 'churrasco_nica',
            name_es: 'Churrasco Nica',
            name_en: 'Nica Churrasco',
            description_es: 'El clásico corte nicaragüense, jugoso y lleno de sabor, servido con gallo pinto, tajadas y ensalada.',
            description_en: 'The classic Nicaraguan cut, juicy and full of flavor, served with gallo pinto, fried plantains, and salad.',
        },
        {
            key: 'tomahawk',
            name_es: 'Tomahawk Steak',
            name_en: 'Tomahawk Steak',
            description_es: 'Un impresionante corte con hueso de 32oz, perfecto para compartir. Madurado a la perfección y asado a la parrilla.',
            description_en: 'An impressive 32oz bone-in cut, perfect for sharing. Aged to perfection and grilled.',
        }
    ];

    const renderMenuContent = () => {
        return (
            <div className="max-w-4xl mx-auto">
                {menuData.menu_sections.map((category, index) => (
                    <div key={category.title_en} className="border-b border-gray-300 last:border-b-0">
                        <button
                            onClick={() => handleToggleCategory(index)}
                            className="w-full flex justify-between items-center text-left py-6"
                            aria-expanded={openCategoryIndex === index}
                            aria-controls={`category-content-${index}`}
                        >
                            <h3 className="text-2xl md:text-3xl font-serif font-bold text-brand-text">{language === 'es' ? category.title_es : category.title_en}</h3>
                            <ChevronSimpleIcon className={`w-6 h-6 text-brand-red transition-transform duration-300 ${openCategoryIndex === index ? 'rotate-180' : ''}`} />
                        </button>
                        <div
                            id={`category-content-${index}`}
                            className={`transition-all duration-500 ease-in-out overflow-hidden ${openCategoryIndex === index ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 pt-2 pb-8">
                                {category.items.map(item => {
                                    const notes = language === 'es' ? item.notes_es : item.notes_en;
                                    return (
                                        <div key={item.name_en} className="p-2 -m-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                                            <div className="w-full flex justify-between items-baseline border-b border-dotted border-gray-300 pb-2">
                                                <p className="text-lg text-gray-800 pr-4">{language === 'es' ? item.name_es : item.name_en}</p>
                                                <p className="text-lg font-bold text-brand-text whitespace-nowrap">{`C$${item.price}`}</p>
                                            </div>
                                            {notes && (
                                                <p className="text-sm text-gray-600 pt-1 italic">{notes}</p>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <>
            {/* Page Header */}
            <div className="pt-20 bg-brand-text">
                <div className="container mx-auto px-6 py-16 text-center">
                    <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-4">{menuContent.title[language]}</h1>
                    <p className="text-xl text-gray-300 mb-6">{menuContent.subtitle[language]}</p>
                    <button
                        onClick={handleOpenViewer}
                        className="bg-transparent border-2 border-white text-white font-bold py-2 px-6 rounded-md hover:bg-white hover:text-brand-text transition-colors duration-300"
                    >
                        {menuContent.viewOriginalMenu[language]}
                    </button>
                </div>
            </div>

            {/* Featured Dishes */}
            <section id="featured" className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-serif font-bold text-brand-text text-center mb-12">{menuContent.featuredTitle[language]}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {featuredDishes.map(dish => (
                            <div key={dish.key} className="bg-brand-bg rounded-lg shadow-lg overflow-hidden p-8">
                                <h3 className="text-2xl font-serif font-bold text-brand-text mb-2">{dish[language === 'es' ? 'name_es' : 'name_en']}</h3>
                                <p className="text-gray-700">{dish[language === 'es' ? 'description_es' : 'description_en']}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            {/* Full Menu */}
            <section id="full-menu" className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    {renderMenuContent()}
                    <p className="text-center text-gray-600 italic mt-8 text-lg">
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