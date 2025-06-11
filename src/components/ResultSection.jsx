import SkincareRoadmap from "./RecommendationsProduct";

export default function ResultSection({ result }) {
  if (!result) return null;

  const skinTypeMap = {
    'Normal': 'Normal',
    'Oily': 'Oily',
    'Dry': 'Dry'
  };

  const skincareDetails = {
    'Oily': {
      Cleanser: 'Gunakan pembersih yang mengandung Niacinamide (mengontrol minyak dan pori), Asam Salisilat (eksfoliasi pori), Glycolic Acid (eksfoliasi sel kulit mati), dan Hyaluronic Acid (melembapkan).',
      Moisturizer: 'Pilih pelembap yang mengandung Ceramide, Niacinamide, Asam Salisilat, atau Hyaluronic Acid agar tidak menyumbat pori dan tetap menghidrasi.',
      Protector: 'Gunakan sunscreen dengan Zinc Oxide atau Titanium Dioxide agar tidak memicu jerawat, idealnya yang berspektrum luas (SPF 30+).'
    },
    'Normal': {
      Cleanser: 'Gunakan air mawar untuk menenangkan dan menyeimbangkan pH. Bisa juga memilih cleanser dengan Glycolic Acid (eksfoliasi ringan) dan Hyaluronic Acid untuk menjaga hidrasi.',
      Moisturizer: 'Gunakan produk dengan Ceramide (menjaga skin barrier), Hyaluronic Acid, Glycerin (humektan), dan Peptides (regenerasi). Pilih formula non-comedogenic.',
      Protector: 'Gunakan sunscreen dengan antioksidan (Vitamin C, E, Niacinamide) dan mineral sunscreen (Zinc Oxide/Titanium Dioxide) dengan SPF minimal 30.'
    },
    'Dry': {
      Cleanser: 'Gunakan pembersih dengan Glycerin, Vitamin E, atau minyak jojoba. Urea juga baik untuk menjaga kelembapan dan mengurangi kehilangan air.',
      Moisturizer: 'Gunakan pelembap dengan tekstur kental yang mengandung ceramide, squalane, atau urea untuk hidrasi jangka panjang.',
      Protector: 'Gunakan sunscreen SPF 30+ setiap hari untuk melindungi dari kerusakan akibat sinar matahari dan menjaga kelembapan.'
    }
  };

  const mappedSkinType = skinTypeMap[result.predicted_class] || result.predicted_class;
  const skincare = skincareDetails[mappedSkinType];

  return (
    <div className="mt-12 bg-white rounded-xl p-8 shadow-md max-w-2xl mx-auto fade-in">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Hasil Analisis Kulit</h2>
      
      <div className="text-center mb-8 border border-gray-200 rounded-lg p-6">
        <p className="text-lg text-gray-600 mb-2">Jenis kulit Anda:</p>
        <p className="text-3xl font-bold text-indigo-600 mb-3">{mappedSkinType}</p>
        <div className="inline-block bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded-full">
          Tingkat kepercayaan: <strong>{result.confidence}%</strong>
        </div>
      </div>

      {skincare && (
        <div className="space-y-6 mb-8">
          <div className="mb-4">
            <h1 className="text-xl font-semibold text-gray-800">Rekomendasi Bahan Skincare {mappedSkinType}</h1>
          </div>
          
          <div className="border-l-4 border-indigo-400 pl-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
              <span className="mr-2">🧼</span> Cleanser
            </h3>
            <p className="text-gray-700 leading-relaxed">{skincare.Cleanser}</p>
          </div>
          
          <div className="border-l-4 border-indigo-400 pl-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
              <span className="mr-2">💧</span> Moisturizer
            </h3>
            <p className="text-gray-700 leading-relaxed">{skincare.Moisturizer}</p>
          </div>
          
          <div className="border-l-4 border-indigo-400 pl-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
              <span className="mr-2">🛡️</span> Protector
            </h3>
            <p className="text-gray-700 leading-relaxed">{skincare.Protector}</p>
          </div>
        </div>
      )}

      <SkincareRoadmap skinType={mappedSkinType} details={skincare} />
    </div>
  );
}