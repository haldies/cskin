import React, { useState } from 'react';
import { FaSun, FaMoon, FaTint, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import AzarinSunscreen from '../assets/azarine-sunscreen.png';
import HadalaboImage from '../assets/cuci-muka-hadalabo.png';
import NpureImage from '../assets/Npure-cuci-muka.png';
import SkintificImageS from '../assets/sunscreen-skintific.png';
import wardahImageS from '../assets/sunscreen-wardah.png';
import SkintificImageM from '../assets/skintific-moisturizer.jpg';
import DorskinImage from '../assets/Dorskin-cuci-muka.png';
import GlowtoGlowM from '../assets/glow2glow-moisturizer.jpg';
import HadalaboImageM from '../assets/hadalabo-moisturizer.png';
import NpureImageT from '../assets/toner-npure.jpg';
import ElformulaImageSE from '../assets/eformula-serum.jpg';
import SkintificImageSE from '../assets/skintific-serum.jpg';
import BhumiImageSE from '../assets/serum-bhumi.jpg';
import SkintificImageT from '../assets/toner-skintific.png';
import GlowToGlowT from '../assets/GlowToGlow-toner.png';
import NearbyStores from './NearbyStores';

const steps = [
    {
        step: 1,
        title: 'Cuci Muka (Cleanser)',
        description: 'Bersihkan wajah dari debu, minyak, dan sisa makeup. Langkah awal ini penting agar kulit siap menyerap produk lainnya.',
        icon: <FaTint className="text-2xl" />,
        time: 'Pagi & Malam',
        skinTypes: 'Semua jenis kulit',
        products: [
            {
                name: 'Hada Labo Gokujyun Cleansing Foam',
                price: 'Rp80.000',
                link: '#',
                image: HadalaboImage,
            },
            {
                name: 'Npure Tea Tree Oil Cleanser',
                price: 'Rp95.000',
                link: '#',
                image: NpureImage,
            },
            {
                name: 'dorskin Gentle Cleanser',
                price: 'Rp75.000',
                link: '#',
                image: DorskinImage,
            },
        ],
    },
    {
        step: 2,
        title: 'Toner',
        description: 'Menyeimbangkan pH kulit dan membantu menyerap skincare berikutnya dengan lebih baik.',
        icon: <FaStar className="text-2xl" />,
        time: 'Pagi & Malam',
        skinTypes: 'Berminyak, Kombinasi, Sensitif',
        products: [
            {
                name: 'Npure Tea Tree Toner',
                price: 'Rp80.000',
                link: '#',
                image: NpureImageT,
            },
            {
                name: 'Skintific Toner',
                price: 'Rp95.000',
                link: '#',
                image: SkintificImageT,
            },
            {
                name: 'Glow To Glow Toner',
                price: 'Rp75.000',
                link: '#',
                image: GlowToGlowT,
            },
        ],
    },
    {
        step: 3,
        title: 'Serum',
        description: 'Serum mengandung bahan aktif untuk mengatasi masalah kulit spesifik seperti jerawat, flek, atau dehidrasi.',
        icon: <FaMoon className="text-2xl" />,
        time: 'Pagi atau Malam (sesuai kandungan)',
        skinTypes: 'Disesuaikan kebutuhan',
        products: [
            {
                name: 'Skintific Serum Vitamin C',
                price: 'Rp80.000',
                link: '#',
                image: SkintificImageSE,
            },
            {
                name: 'Elformula Serum Anti-Aging',
                price: 'Rp95.000',
                link: '#',
                image: ElformulaImageSE,
            },
            {
                name: 'Bhumi Serum Hydrating',
                price: 'Rp75.000',
                link: '#',
                image: BhumiImageSE,
            },
        ],
    },
    {
        step: 4,
        title: 'Moisturizer (Pelembap)',
        description: 'Mengunci kelembapan dan menjaga skin barrier agar kulit tetap sehat dan kenyal.',
        icon: <FaTint className="text-2xl" />,
        time: 'Pagi & Malam',
        skinTypes: 'Semua jenis kulit',
        products: [
            {
                name: 'Skintific Moisturizer Gel',
                price: 'Rp80.000',
                link: '#',
                image: SkintificImageM,
            },
            {
                name: 'Hada Labo Moisturizer Cream',
                price: 'Rp95.000',
                link: '#',
                image: HadalaboImageM,
            },
            {
                name: 'Glow to Glow Moisturizer',
                price: 'Rp75.000',
                link: '#',
                image: GlowtoGlowM,
            },
        ],
    },
    {
        step: 5,
        title: 'Sunscreen (Pagi Hari)',
        description: 'Melindungi kulit dari sinar UVA/UVB yang dapat menyebabkan penuaan dini dan hiperpigmentasi.',
        icon: <FaSun className="text-2xl" />,
        time: 'Pagi saja',
        skinTypes: 'Semua jenis kulit',
        products: [
            {
                name: 'Azarine Sunscreen Gel SPF 50',
                price: 'Rp80.000',
                link: '#',
                image: AzarinSunscreen,
            },
            {
                name: 'Skintific Sunscreen Gel SPF 50',
                price: 'Rp95.000',
                link: '#',
                image: SkintificImageS,
            },
            {
                name: 'Wardah Sunscreen Gel SPF 30',
                price: 'Rp75.000',
                link: '#',
                image: wardahImageS,
            },
        ],
    },
];

const ProductCarousel = ({ products, onSelect }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === products.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? products.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="relative">
            <div className="overflow-hidden">
                <div 
                    className="flex transition-transform duration-300 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {products.map((product, index) => (
                        <div 
                            key={index} 
                            className="w-full flex-shrink-0 px-2"
                        >
                            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300">
                                <div className="h-48 bg-gray-100 overflow-hidden">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-contain p-4"
                                    />
                                </div>
                                <div className="p-4">
                                    <h5 className="font-semibold text-secondary line-clamp-2">{product.name}</h5>
                                    <p className="text-primary font-medium mt-2">{product.price}</p>
                                    <button
                                        onClick={() => onSelect(product)}
                                        className="mt-4 w-full bg-primary/10 text-primary font-semibold py-2 px-4 rounded-lg hover:bg-primary hover:text-white transition"
                                    >
                                        Detail Produk
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation arrows */}
            {products.length > 1 && (
                <>
                    <button 
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10 -ml-4"
                    >
                        <FaChevronLeft className="text-primary" />
                    </button>
                    <button 
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10 -mr-4"
                    >
                        <FaChevronRight className="text-primary" />
                    </button>
                </>
            )}

            {/* Indicators */}
            <div className="flex justify-center mt-4 space-x-2">
                {products.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2 h-2 rounded-full ${currentIndex === index ? 'bg-primary' : 'bg-gray-300'}`}
                    />
                ))}
            </div>
        </div>
    );
};

const SkincareRoadmap = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);

    return (
        <section className="py-12 px-4 md:px-8 bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-3">
                        Panduan Skincare Dasar untuk Pemula
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Langkah demi langkah merawat kulit dengan benar ✨
                    </p>
                </div>

                {/* MODAL */}
                {selectedProduct && (
                    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-2xl w-full max-w-md p-6 relative shadow-2xl h-3/4 overflow-y-auto">
                            <button
                                className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-2xl p-1"
                                onClick={() => setSelectedProduct(null)}
                            >
                                ✕
                            </button>

                            <div className="flex flex-col gap-6">
                                <div className="h-48 bg-gray-100 rounded-lg overflow-hidden">
                                    <img 
                                        src={selectedProduct.image} 
                                        alt={selectedProduct.name} 
                                        className="w-full h-full object-contain p-4" 
                                    />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-secondary mb-2">{selectedProduct.name}</h2>
                                    <p className="text-primary font-semibold text-lg mb-3">{selectedProduct.price}</p>
                                    <p className="text-gray-700 mb-4">
                                        {selectedProduct.description || 'Deskripsi lengkap belum tersedia untuk produk ini.'}
                                    </p>
                                    
                                    <div className="mb-4">
                                        <h3 className="font-semibold text-gray-800 mb-2">Tersedia di:</h3>
                                        <ul className="list-disc  text-gray-700 space-y-1">
                                            {selectedProduct.stores?.length > 0 ? (
                                                selectedProduct.stores.map((store, idx) => <li key={idx}>{store}</li>)
                                            ) : (
                                                <NearbyStores/>
                                            )}
                                        </ul>
                                    </div>

                                    <a
                                        href={selectedProduct.link || '#'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block text-center bg-primary text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition shadow-md hover:shadow-lg"
                                    >
                                        Beli Sekarang
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* SKINCARE STEPS */}
                <div className="relative">
                    <div className="absolute left-8 top-0 bottom-0 w-1 bg-primary/20 hidden md:block"></div>
                    
                    <div className="space-y-8">
                        {steps.map(({ step, title, description, icon, time, skinTypes, products }) => (
                            <div key={step} className="relative group">
                                {/* Timeline dot */}
                                <div className="hidden md:flex absolute left-0 w-16 h-16 items-center justify-center">
                                    <div className="w-6 h-6 bg-primary rounded-full border-4 border-white shadow-lg z-10 group-hover:scale-125 transition-transform"></div>
                                </div>

                                {/* Step card */}
                                <div className="ml-0 md:ml-16 bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
                                    {/* Step header */}
                                    <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-5 border-b border-gray-100">
                                        <div className="flex items-center gap-4">
                                            <div className="bg-white p-3 rounded-full shadow-md text-primary">
                                                {icon}
                                            </div>
                                            <div>
                                                <span className="text-sm font-medium text-primary">Langkah {step}</span>
                                                <h3 className="text-xl font-bold text-gray-800">{title}</h3>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Step content */}
                                    <div className="p-5">
                                        <p className="text-gray-700 mb-5">{description}</p>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
                                            <div className="bg-gray-50 p-3 rounded-lg">
                                                <h4 className="font-semibold text-gray-800 mb-1">Waktu Pemakaian</h4>
                                                <p className="text-gray-600">{time}</p>
                                            </div>
                                            <div className="bg-gray-50 p-3 rounded-lg">
                                                <h4 className="font-semibold text-gray-800 mb-1">Jenis Kulit</h4>
                                                <p className="text-gray-600">{skinTypes}</p>
                                            </div>
                                        </div>

                                        {/* Products */}
                                        <div>
                                            <h4 className="font-semibold text-secondary text-lg mb-3">Rekomendasi Produk</h4>
                                            
                                            {/* Desktop grid view */}
                                            <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                                {products?.map((product, i) => (
                                                    <div
                                                        key={i}
                                                        className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                                                    >
                                                        <div className="h-48 bg-gray-100 overflow-hidden">
                                                            <img
                                                                src={product.image}
                                                                alt={product.name}
                                                                className="w-full h-full object-contain p-4 transition-transform duration-500 hover:scale-110"
                                                            />
                                                        </div>
                                                        <div className="p-4">
                                                            <h5 className="font-semibold text-secondary line-clamp-2">{product.name}</h5>
                                                            <p className="text-primary font-medium mt-2">{product.price}</p>
                                                            <button
                                                                onClick={() => setSelectedProduct(product)}
                                                                className="mt-4 w-full bg-primary/10 text-primary font-semibold py-2 px-4 rounded-lg hover:bg-primary hover:text-white transition"
                                                            >
                                                                Detail Produk
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            
                                            {/* Mobile carousel */}
                                            <div className="md:hidden">
                                                <ProductCarousel 
                                                    products={products} 
                                                    onSelect={setSelectedProduct} 
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SkincareRoadmap;