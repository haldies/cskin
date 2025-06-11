import React, { useState } from 'react';
import { X } from 'lucide-react';
import HeroImage from '../assets/hero.png';
import AboutImage from '../assets/about-img.png';
import BerminyakImage from '../assets/berminyak.png';
import KeringImage from '../assets/kering.png';
import KombinasiImage from '../assets/kombinasi.png';
import NormalImage from '../assets/normal.png';
import BubleChat from './BubleChat';

const CSkinLandingPage = () => {
  const [activeModal, setActiveModal] = useState(null);

  const openModal = (modalType) => {
    setActiveModal(modalType);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const skinTypes = [
    {
      id: 'berminyak',
      name: 'Berminyak',
      image: BerminyakImage,
      characteristics: [
        'Produksi sebum berlebihan',
        'Pori-pori terlihat besar dan jelas',
        'Wajah terlihat mengkilap, terutama di T-zone',
        'Rentan berjerawat dan komedo',
        'Makeup mudah luntur'
      ],
      recommendations: {
        pembersih: ['Salicylic Acid (BHA)', 'Tea Tree Oil', 'Charcoal', 'Clay/Bentonite'],
        toner: ['Witch Hazel', 'Niacinamide', 'AHA/BHA', 'Rose Water'],
        serum: ['Niacinamide 10%', 'Hyaluronic Acid', 'Vitamin C', 'Zinc'],
        pelembab: ['Water-based moisturizer', 'Gel moisturizer', 'Oil-free formula', 'Non-comedogenic']
      },
      avoid: 'Alcohol denat, Heavy oils (coconut oil, olive oil), Over-exfoliating products, Harsh sulfates'
    },
    {
      id: 'kering',
      name: 'Kering',
      image: KeringImage,
      characteristics: [
        'Produksi sebum sangat sedikit',
        'Terasa kencang dan kasar',
        'Mudah mengelupas dan bersisik',
        'Pori-pori hampir tidak terlihat',
        'Rentan teriritasi dan kemerahan'
      ],
      recommendations: {
        pembersih: ['Cream cleanser', 'Oil cleanser', 'Milk cleanser', 'Gentle surfactants'],
        toner: ['Hyaluronic Acid', 'Glycerin', 'Rose Water', 'Ceramides'],
        serum: ['Hyaluronic Acid', 'Vitamin E', 'Squalane', 'Peptides'],
        pelembab: ['Rich cream moisturizer', 'Shea butter', 'Ceramides', 'Natural oils']
      },
      avoid: 'Alcohol-based toners, Harsh exfoliants, Sulfates, Fragrances yang kuat'
    },
    {
      id: 'normal',
      name: 'Normal',
      image: NormalImage,
      characteristics: [
        'Produksi sebum seimbang',
        'Tidak terlalu berminyak atau kering',
        'Pori-pori hampir tidak terlihat',
        'Tekstur halus dan elastis',
        'Jarang bermasalah dengan jerawat'
      ],
      recommendations: {
        pembersih: ['Gentle gel cleanser', 'Foam cleanser', 'Micellar water', 'pH balanced cleanser'],
        toner: ['Hyaluronic Acid', 'Rose Water', 'Vitamin C', 'Gentle AHA'],
        serum: ['Vitamin C (morning)', 'Hyaluronic Acid', 'Niacinamide', 'Retinol (malam)'],
        pelembab: ['Lightweight lotion', 'Gel-cream hybrid', 'Ceramides', 'SPF 30+ (pagi)']
      },
      advantage: 'Anda beruntung memiliki kulit normal! Fokus pada maintenance dan perlindungan dari faktor eksternal seperti UV dan polusi.'
    }
  ];

  const Modal = ({ skinType }) => {
    if (!skinType) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-[20px] max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="relative">
            <img
              src={skinType.image}
              alt={`Kulit ${skinType.name}`}
              className="w-full h-64 object-cover rounded-t-[20px]"
            />
            <div className="absolute inset-0 bg-black opacity-50 rounded-t-[20px]"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <h2 className="text-white font-bold text-2xl md:text-[36px] text-center">Kulit {skinType.name}</h2>
            </div>
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <X size={24} />
            </button>
          </div>

          <div className="p-4 md:p-8">
            <div className="mb-6">
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Karakteristik Kulit {skinType.name}:</h3>
              <ul className="list-disc pl-5 text-gray-600 text-base md:text-lg space-y-2">
                {skinType.characteristics.map((char, index) => (
                  <li key={index}>{char}</li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-xl md:text-2xl font-bold text-teal-600 mb-4">Bahan Skincare yang Direkomendasikan:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(skinType.recommendations).map(([category, items]) => (
                  <div key={category} className="bg-teal-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2 capitalize">{category}:</h4>
                    <ul className="text-gray-600 text-sm md:text-base space-y-1">
                      {items.map((item, index) => (
                        <li key={index}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {skinType.avoid && (
              <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                <h4 className="font-semibold text-gray-800 mb-2">⚠️ Hindari Bahan Ini:</h4>
                <p className="text-gray-600 text-sm md:text-base">{skinType.avoid}</p>
              </div>
            )}

            {skinType.tip && (
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                <h4 className="font-semibold text-gray-800 mb-2">💡 Tips Multi-Zone Care:</h4>
                <p className="text-gray-600 text-sm md:text-base">{skinType.tip}</p>
              </div>
            )}

            {skinType.advantage && (
              <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
                <h4 className="font-semibold text-gray-800 mb-2">✅ Keuntungan Kulit Normal:</h4>
                <p className="text-gray-600 text-sm md:text-base">{skinType.advantage}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative flex flex-col md:flex-row justify-between items-center mt-16 md:mt-24 container mx-auto px-4 md:px-6">
        <div className="max-w-full md:max-w-[661px] z-10 order-2 md:order-1 mt-8 md:mt-0">
          <h1 className="text-4xl md:text-[58px] font-bold text-gray-800 leading-[1.2]">
            Kesehatan <span className="text-teal-600">kulitmu</span> adalah prioritas kami
          </h1>
          <p className="text-gray-600 text-base md:text-xl font-normal leading-relaxed mt-4 my-6 md:my-12">
            Kami hadir untuk membantumu mengenali jenis kulit berminyak, kering,
            normal atau kombinasi dengan mudah melalui pemindaian gambar wajah.
            Dapatkan rekomendasi kandungan skincare yang sesuai, agar perawatan
            kulitmu lebih efektif dan tepat sasaran.
          </p>
          <a
            href="http://35.223.29.62:8000"
            className="inline-block bg-teal-600 rounded-xl text-white font-bold text-base md:text-lg px-6 py-3 hover:bg-teal-700 transition-colors"
          >
            Konsultasi sekarang
          </a>
        </div>
        <div className="order-1 md:order-2 w-full md:w-auto">
          <img
            src={HeroImage}
            alt="Hero"
            className="w-full max-w-md mx-auto md:mx-0"
          />
        </div>
      </section>

      {/* About Section */}
      <section className="flex flex-col md:flex-row justify-between items-center mt-16 md:mt-20 gap-8 md:gap-[58px] container mx-auto pt-12 md:pt-20 px-4 md:px-6">
        <div className="w-full md:w-1/2">
          <img src={AboutImage} alt="About" className="w-full rounded-lg" />
        </div>
        <div className="w-full md:w-1/2 mt-8 md:mt-0">
          <h2 className="text-3xl md:text-[48px] text-gray-800 font-bold">Tentang <span className="text-teal-600">CS</span>KIN</h2>
          <p className="text-gray-600 text-base md:text-xl font-normal leading-relaxed mt-4 md:mt-7">
            CSKIN adalah platform kecantikan yang berfokus pada kesehatan kulit
            wajah. Fitur utama kami adalah Scan Skin untuk memindai jenis kulit
            wajah dan Chatbot AI untuk membantu anda berkonsultasi mengenai
            penyakit kulit.
            <br /><br />
            Kami percaya bahwa setiap orang berhak mendapatkan perawatan kulit
            yang sesuai dengan kebutuhan dan tipe kulitnya.
          </p>
        </div>
      </section>

      {/* Skin Types Section */}
      <section className="mt-16 md:mt-20 container mx-auto px-4 md:px-6 ">
        <h2 className="text-3xl md:text-[48px] text-gray-800 font-bold">
          <span className="text-teal-600">kenali</span> tipe kulit wajah
        </h2>
        <p className="text-gray-600 text-base md:text-xl font-normal leading-relaxed mt-4 md:mt-7">
          Kulit Wajah merupakan bagian tubuh terluar yang memiliki peran penting untuk melindungi wajah.
          Ayo kenali tipe kulitmu untuk menentukan kandungan yang baik dan sesuai dengan basic skincaremu.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 md:mt-10 max-w-6xl mx-auto">
          {skinTypes.map((skinType) => (
            <div
              key={skinType.id}
              className="relative rounded-2xl md:rounded-[38px] overflow-hidden cursor-pointer hover:transform hover:scale-105 transition-transform duration-300"
              onClick={() => openModal(skinType.id)}
            >
              <img
                src={skinType.image}
                alt={skinType.name}
                className="w-full h-48 md:h-64 object-cover"
              />
              <div className="absolute inset-0 bg-black opacity-50"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full">
                <span className="text-white font-bold text-xl md:text-2xl text-center">
                  {skinType.name}
                </span>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* Reminder Section */}
      <section className="mt-16 md:mt-20 container mx-auto px-4 md:px-6 pb-16 md:pb-20">
        <div className="relative bg-gray-50 rounded-xl p-8 md:p-12">
          <div className="relative z-10">
            <h2 className="text-teal-600 text-2xl md:text-4xl font-bold text-center">Reminder</h2>
            <p className="text-gray-600 text-xl md:text-3xl font-medium text-center my-6 md:my-8 leading-relaxed">
              Be good to your skin, you'll wear it<br />
              everyday for the rest of your life
            </p>
            <hr className="border-gray-200 my-6 md:my-8" />
            <p className="text-2xl md:text-3xl text-teal-600 text-center font-bold">Okay!</p>
          </div>
        </div>
      </section>

      {/* Modal */}
      {activeModal && (
        <Modal skinType={skinTypes.find(type => type.id === activeModal)} />
      )}
      <BubleChat />
    </div>
  );
};

export default CSkinLandingPage;