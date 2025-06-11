import React, { useState } from 'react';
import ResultSection from '../components/ResultSection';
import UploadForm from '../components/UploadForm';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SkincareRoadmap from '../components/RecommendationsProduct';
import BubleChat from '../components/BubleChat';

function SkinTypePage() {
  const [result, setResult] = useState(null);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="bg-gray-50">
      <Header />
      <main className="pt-32 container mx-auto px-4">
        <section className="text-center mb-10">
          <h1 className="text-6xl font-bold text-secondary">
            Upload atau <span className="text-primary">Scan</span> wajah kamu
          </h1>
          <p className="text-desc text-lg mt-2 max-w-3xl mx-auto">
            Kami akan membantu kamu untuk mengetahui jenis kulit wajah kamu. Fitur Upload dan Scan wajah ini dibangun menggunakan Artificial Intelligence yang akan membantu kamu mengenali jenis kulitmu.
          </p>

          <button
            onClick={() => setShowModal(true)}
            className="mt-6 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition"
          >
            Mulai Deteksi Wajah
          </button>
        </section>
      </main>
      <Footer />
      <BubleChat />

      {/* Modal Fullscreen */}
      {showModal && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Deteksi Jenis Kulit</h2>
            <button
              onClick={() => setShowModal(false)}
              className="text-gray-600 hover:text-black text-2xl font-bold"
            >
              &times;
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UploadForm setResult={setResult} />
          </div>

          {result && (
            <div className="mt-6">
              <ResultSection result={result} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SkinTypePage;
