import React, { useState } from 'react';
import ResultSection from '../components/ResultSection';
import UploadForm from '../components/UploadForm';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SkincareRoadmap from '../components/RecommendationsProduct';
import NearbyStores from '../components/NearbyStores';

function SkinTypePage() {
  const [result, setResult] = useState(null);


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
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UploadForm setResult={setResult} />
          <div className="bg-primary text-white rounded-xl flex items-center justify-center flex-col p-6">
            <p className="text-xl font-medium">Fitur Scan Kamera</p>
            <p className="text-white text-sm mt-2 opacity-80">Segera hadir!</p>
          </div>
        </div>

        <ResultSection result={result} />
        <SkincareRoadmap />
      </main>
      <Footer />
    </div>
  );
}

export default SkinTypePage;
