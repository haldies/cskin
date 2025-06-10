import React, { useState } from 'react';
import { FaSun, FaMoon, FaTint, FaStar, FaShieldAlt } from 'react-icons/fa';
import AzarinSunscreen from '../assets/azarine-sunscreen.png';
import HadalaboImage from '../assets/cuci-muka-hadalabo.png';
import NpureImage from '../assets/Npure-cuci-muka.png';
import SkintificImageS from '../assets/sunscreen-skintific.png'
import wardahImageS from '../assets/sunscreen-wardah.png';
import SkintificImageM from '../assets/skintific-moisturizer.jpg';
import DorskinImage from '../assets/Dorskin-cuci-muka.png';
import GlowtoGlowM from '../assets/glow2glow-moisturizer.jpg'
import HadalaboImageM from '../assets/hadalabo-moisturizer.png';
import NpureImageT from '../assets/toner-npure.jpg';
import ElformulaImageSE from '../assets/eformula-serum.jpg';
import SkintificImageSE from '../assets/skintific-serum.jpg';
import BhumiImageSE from '../assets/serum-bhumi.jpg'
import SkintificImageT from '../assets/toner-skintific.png'
import GlowToGlowT from '../assets/GlowToGlow-toner.png'
import NearbyStores from './NearbyStores';

const steps = [
    {
        step: 1,
        title: 'Cuci Muka (Cleanser)',
        description: 'Bersihkan wajah dari debu, minyak, dan sisa makeup. Langkah awal ini penting agar kulit siap menyerap produk lainnya.',
        icon: <FaTint />,
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
        icon: <FaStar />,
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
        icon: <FaMoon />,
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
        icon: <FaTint />,
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
        icon: <FaSun />,
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

const SkincareRoadmap = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);

    return (
        <section className="mt-16 px-4 md:px-0 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary text-center mb-12">
                Panduan Skincare Dasar untuk Pemula ✨
            </h2>

            {/* MODAL */}
            {selectedProduct && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-xl w-full max-w-md p-6 relative shadow-lg">
                        <button
                            className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
                            onClick={() => setSelectedProduct(null)}
                        >
                            ✕
                        </button>

                        <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full rounded mb-4" />
                        <h2 className="text-xl font-bold text-secondary mb-2">{selectedProduct.name}</h2>
                        <p className="text-primary font-semibold mb-2">{selectedProduct.price}</p>
                        <p className="text-sm text-gray-700 mb-4">
                            {selectedProduct.description || 'Deskripsi lengkap belum tersedia untuk produk ini.'}
                        </p>
                        <ul className="list-disc  text-sm text-gray-800 mb-4">
                            {selectedProduct.stores?.length > 0 ? (
                                selectedProduct.stores.map((store, idx) => <li key={idx}>{store}</li>)
                            ) : (
                                <NearbyStores/>
                            )}
                        </ul>

                        <a
                            href={selectedProduct.link || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-center bg-primary text-white py-2 rounded-md font-semibold hover:bg-opacity-90 transition"
                        >
                            Lanjut ke Pembelian
                        </a>
                    </div>
                </div>
            )}

            {/* SKINCARE STEPS */}
            <div className="relative border-l-4 border-primary pl-6 space-y-12">
                {steps.map(({ step, title, description, icon, time, skinTypes, products }, index) => (
                    <div
                        key={step}
                        className={`relative ml-4 p-6 bg-white shadow-xl rounded-xl border-l-8 border-secondary transform transition-all duration-300 hover:scale-[1.015] flex flex-col md:flex-row items-start gap-6 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                            }`}
                    >
                        <span className="absolute -left-9 top-6 w-6 h-6 bg-primary rounded-full border-4 border-white shadow-md"></span>

                        <div className="text-left flex-1">
                            <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                                <span className="text-lg text-secondary">{icon}</span>
                                Langkah {step}: {title}
                            </h3>
                            <p className="text-gray-700 mt-2">{description}</p>
                            <div className="mt-3 text-sm text-gray-600 space-y-1">
                                <p><strong>Waktu Pemakaian:</strong> {time}</p>
                                <p><strong>Cocok untuk:</strong> {skinTypes}</p>
                            </div>

                            {/* PRODUCT CARDS */}
                            <div className="mt-6">
                                <h4 className="font-semibold text-secondary mb-4 text-lg">Rekomendasi Produk:</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                    {products?.map((product, i) => (
                                        <div
                                            key={i}
                                            className="bg-gray-100 border border-gray-200 rounded-xl p-4 flex flex-col items-center hover:shadow-xl transition-all duration-300"
                                        >
                                            <div className="w-full aspect-square overflow-hidden rounded-md mb-3">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                                />
                                            </div>
                                            <p className="text-sm font-semibold text-secondary text-center line-clamp-2">{product.name}</p>
                                            <p className="text-sm text-primary mt-2 font-medium">{product.price}</p>

                                            <button
                                                onClick={() => setSelectedProduct(product)}
                                                className="mt-4 w-full text-center bg-primary text-white font-semibold py-2 px-4 rounded-md hover:bg-opacity-90 transition"
                                            >
                                                Beli Sekarang
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default SkincareRoadmap;
