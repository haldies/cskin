import React, { useState } from 'react';
import { FaSun, FaMoon, FaTint, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import EminaM from '../assets/Emina_Bright_Stuff_Moisturizing_Cream.png';
import WardahNatureM from '../assets/Wardah_Nature_Daily_Aloe_Hydramild Moisturizer_Cream.png';
import  WardahUv50 from '../assets/Wardah_UV_SPF_50_PA.jpg';
import WardahFashwash from '../assets/Wardah_Lightening_Whip_Facial_Foam.jpeg'
import WardahFashwash2 from '../assets/Wardah_Lightening_Whip_Facial_Foam.jpeg'

const steps = [
    {
        step: 1,
        title: 'Cuci Muka (Cleanser)',
        description: 'Bersihkan wajah dari debu, minyak, dan sisa makeup. Langkah awal ini penting agar kulit siap menyerap produk lainnya.',
        icon: <FaTint className="text-2xl" />,
        time: 'Pagi & Malam',
        products: [
            {
                name: 'Wardah Lightening Whip Facial Foam',
                price: 'Rp41.300',
                link: 'https://shopee.co.id/universal-link/Hada-Labo-Gokujyun-Face-Wash-50gr-100gr-Hada-Labo-Pembersih-Wajah-i.119727251.4057564909',
                image: WardahFashwash,
                compatibleSkinTypes: ['Normal', 'Dry','Oily'],
                description: 'Cleanser lembut dengan hyaluronic acid untuk kulit normal hingga kering.'
            },
            {
                name: 'Wardah Nature Daily Aloe Hydramild Facial Wash',
                price: 'Rp65.000',
                link: 'https://s.shopee.co.id/3qBJHWfS3s',
                image: WardahFashwash2,
                compatibleSkinTypes: ['Normal', 'Dry','Oily'],
                description: 'Mengontrol minyak berlebih dengan tea tree oil untuk kulit berminyak.'
            },
        ],
    },
    {
        step: 2,
        title: 'Moisturizer (Pelembap)',
        description: 'Mengunci kelembapan dan menjaga skin barrier agar kulit tetap sehat dan kenyal.',
        icon: <FaTint className="text-2xl" />,
        time: 'Pagi & Malam',
        products: [
            {
                name: 'Emina Bright Stuff Moisturizing Cream',
                price: 'Rp109.650',
                link: 'https://shopee.co.id/skintific_id',
                image: EminaM,
                compatibleSkinTypes: ['Normal', 'Dry','Oily'],
                description: 'Tekstur gel ringan yang cepat menyerap, ideal untuk kulit berminyak.'
            },
            {
                name: 'Wardah Nature Daily Aloe Hydramild Moisturizer Cream',
                price: 'Rp48.500',
                link: 'https://shopee.co.id/list/Moisturizer/Hada%20Labo',
                image: WardahNatureM,
                compatibleSkinTypes: ['Normal', 'Dry','Oily'],
                description: 'Krim pelembab intensif dengan 3 jenis hyaluronic acid.'
            },
        ],
    },
    {
        step: 3,
        title: 'Sunscreen (Pagi Hari)',
        description: 'Melindungi kulit dari sinar UVA/UVB yang dapat menyebabkan penuaan dini dan hiperpigmentasi.',
        icon: <FaSun className="text-2xl" />,
        time: 'Pagi saja',
        products: [
            {
                name: 'Wardah UV Shield Active Protection Serum SPF 50 PA++++',
                price: 'Rp25.000',
                link: 'https://shopee.co.id/universal-link/-SALE-NEW-FORMULA-AZARINE-HYDRASOOTHE-SUNSCREEN-GEL-SPF-50-PA-50ML-i.4698074.8374427345',
                image: WardahUv50,
                compatibleSkinTypes: ['Normal', 'Dry','Oily'],
                description: 'Sunscreen gel tidak berminyak dengan tekstur ringan.'
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

const SkincareRoadmap = ({ skinType }) => {
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Filter products based on skin type
    const getFilteredProducts = (defaultProducts) => {
        if (!skinType) return defaultProducts;
        
        return defaultProducts.filter(product => 
            product.compatibleSkinTypes?.includes(skinType) || 
            !product.compatibleSkinTypes
        );
    };

    const filteredSteps = steps.map(step => ({
        ...step,
        products: getFilteredProducts(step.products)
    }));

    // Map skin type to Indonesian for display
    const skinTypeMap = {
        'Normal': 'Normal',
        'Oily': 'Berminyak',
        'Dry': 'Kering'
    };

    const displaySkinType = skinTypeMap[skinType] || 'Anda';

    return (
        <section className="py-12 px-4 md:px-8 bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-3">
                        Panduan Skincare Dasar {skinType && `untuk Kulit ${displaySkinType}`}
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Rekomendasi produk yang cocok untuk jenis kulit {displaySkinType.toLowerCase()}
                    </p>
                </div>

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
                                        <h3 className="font-semibold text-gray-800 mb-2">Cocok untuk kulit:</h3>
                                        <div className="flex gap-2 flex-wrap">
                                            {selectedProduct.compatibleSkinTypes?.map(type => (
                                                <span key={type} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                                                    {skinTypeMap[type] || type}
                                                </span>
                                            ))}
                                            {!selectedProduct.compatibleSkinTypes && (
                                                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                                                    Semua jenis kulit
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <h3 className="font-semibold text-gray-800 mb-2">Tersedia di:</h3>
                                        <NearbyStores/>
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

                <div className="relative">
                    <div className="absolute left-8 top-0 bottom-0 w-1 bg-primary/20 hidden md:block"></div>
                    
                    <div className="space-y-8">
                        {filteredSteps.map(({ step, title, description, icon, time, products }) => (
                            <div key={step} className="relative group">
                                <div className="hidden md:flex absolute left-0 w-16 h-16 items-center justify-center">
                                    <div className="w-6 h-6 bg-primary rounded-full border-4 border-white shadow-lg z-10 group-hover:scale-125 transition-transform"></div>
                                </div>

                                <div className="ml-0 md:ml-16 bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
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

                                    <div className="p-5">
                                        <p className="text-gray-700 mb-5">{description}</p>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
                                            <div className="bg-gray-50 p-3 rounded-lg">
                                                <h4 className="font-semibold text-gray-800 mb-1">Waktu Pemakaian</h4>
                                                <p className="text-gray-600">{time}</p>
                                            </div>
                                            <div className="bg-gray-50 p-3 rounded-lg">
                                                <h4 className="font-semibold text-gray-800 mb-1">Jenis Kulit</h4>
                                                <p className="text-gray-600">{skinType}</p>
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="font-semibold text-secondary text-lg mb-3">Rekomendasi Produk</h4>
                                            
                                            {products.length > 0 ? (
                                                <>
                                                    <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                                        {products.map((product, i) => (
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
                                                    
                                                    <div className="md:hidden">
                                                        <ProductCarousel 
                                                            products={products} 
                                                            onSelect={setSelectedProduct} 
                                                        />
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                                                    <p className="text-yellow-800">Maaf, belum ada rekomendasi produk khusus untuk kulit {displaySkinType.toLowerCase()} pada langkah ini.</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <BubleChat/>
        </section>
    );
};

export default SkincareRoadmap;