import React, { useState } from 'react';
import { useLocalization } from '../hooks/useLocalization.ts';
import { content } from '../constants/content.ts';
import { ChevronSimpleIcon } from '../components/icons.tsx';
import ImageViewerModal from '../components/ImageViewerModal.tsx';

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
            data: menuContent.dishes.churrasco_nica,
            imgSrc: "https://images.unsplash.com/photo-1592894869939-5ed53a5c6875?q=80&w=1974&auto=format&fit=crop"
        },
        {
            key: 'tomahawk',
            data: menuContent.dishes.tomahawk,
            imgSrc: "https://images.unsplash.com/photo-1626201349372-aca5905b1f2a?q=80&w=1974&auto=format&fit=crop"
        }
    ];

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
                            <div key={dish.key} className="flex flex-col md:flex-row items-center bg-brand-bg rounded-lg shadow-lg overflow-hidden">
                                <img src={dish.imgSrc} alt={dish.data.name[language]} className="w-full md:w-1/2 h-64 object-cover" />
                                <div className="p-8">
                                    <h3 className="text-2xl font-serif font-bold text-brand-text mb-2">{dish.data.name[language]}</h3>
                                    <p className="text-gray-700">{dish.data.description[language]}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            {/* Full Menu */}
            <section id="full-menu" className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        {menuContent.categories.map((category, index) => (
                            <div key={category.name[language]} className="border-b border-gray-300 last:border-b-0">
                                <button
                                    onClick={() => handleToggleCategory(index)}
                                    className="w-full flex justify-between items-center text-left py-6"
                                    aria-expanded={openCategoryIndex === index}
                                    aria-controls={`category-content-${index}`}
                                >
                                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-brand-text">{category.name[language]}</h3>
                                    <ChevronSimpleIcon className={`w-6 h-6 text-brand-red transition-transform duration-300 ${openCategoryIndex === index ? 'rotate-180' : ''}`} />
                                </button>
                                <div
                                    id={`category-content-${index}`}
                                    className={`transition-all duration-500 ease-in-out overflow-hidden ${openCategoryIndex === index ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 pt-2 pb-8">
                                        {category.items.map(item => (
                                            <div key={item.name[language]} className="flex justify-between items-baseline border-b border-gray-200 py-2">
                                                <p className="text-lg text-gray-800 pr-4">{item.name[language]}</p>
                                                <p className="text-lg font-bold text-brand-text whitespace-nowrap">{item.price}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
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