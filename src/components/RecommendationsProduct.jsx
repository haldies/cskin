import React from 'react';
import { FaSun, FaMoon, FaTint, FaStar, FaShieldAlt } from 'react-icons/fa';
import AzarinSunscreen from '../assets/azarine-sunscreen.png';
import HadalaboImage from '../assets/cuci-muka-hadalabo.png';
import NpureImage from '../assets/Npure-cuci-muka.png';

import DorskinImage from '../assets/Dorskin-cuci-muka.png';
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
                name: 'Brand A - Hydrating Cleanser',
                price: 'Rp80.000',
                link: '#',
                image: 'https://via.placeholder.com/80',
            },
            {
                name: 'Brand B - Gentle Clean Wash',
                price: 'Rp95.000',
                link: '#',
                image: 'https://via.placeholder.com/80',
            },
            {
                name: 'Brand C - Daily Clean Foam',
                price: 'Rp75.000',
                link: '#',
                image: 'https://via.placeholder.com/80',
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
                name: 'Brand A - Hydrating Cleanser',
                price: 'Rp80.000',
                link: '#',
                image: 'https://via.placeholder.com/80',
            },
            {
                name: 'Brand B - Gentle Clean Wash',
                price: 'Rp95.000',
                link: '#',
                image: 'https://via.placeholder.com/80',
            },
            {
                name: 'Brand C - Daily Clean Foam',
                price: 'Rp75.000',
                link: '#',
                image: 'https://via.placeholder.com/80',
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
                name: 'Brand A - Hydrating Cleanser',
                price: 'Rp80.000',
                link: '#',
                image: 'https://via.placeholder.com/80',
            },
            {
                name: 'Brand B - Gentle Clean Wash',
                price: 'Rp95.000',
                link: '#',
                image: 'https://via.placeholder.com/80',
            },
            {
                name: 'Brand C - Daily Clean Foam',
                price: 'Rp75.000',
                link: '#',
                image: 'https://via.placeholder.com/80',
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
                name: 'Brand A - Hydrating Cleanser',
                price: 'Rp80.000',
                link: '#',
                image: 'https://via.placeholder.com/80',
            },
            {
                name: 'Brand B - Gentle Clean Wash',
                price: 'Rp95.000',
                link: '#',
                image: 'https://via.placeholder.com/80',
            },
            {
                name: 'Brand C - Daily Clean Foam',
                price: 'Rp75.000',
                link: '#',
                image: 'https://via.placeholder.com/80',
            },
        ],
    },
];

const SkincareRoadmap = () => {
    return (
        <section className="mt-16 px-4 md:px-0 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary text-center mb-12">
                Panduan Skincare Dasar untuk Pemula ✨
            </h2>
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

                            {/* Product Recommendations */}
                            <div className="mt-6">
                                <h4 className="font-semibold text-secondary mb-3">Rekomendasi Produk:</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                    {products?.map((product, i) => (
                                        <a
                                            key={i}
                                            href={product.link}
                                            className="border rounded-lg p-3 flex flex-col items-center hover:shadow-lg transition"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-20 h-20 object-cover mb-2 rounded-md"
                                            />
                                            <p className="text-sm font-medium text-center">{product.name}</p>
                                            <p className="text-sm text-primary mt-1">{product.price}</p>
                                        </a>
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
