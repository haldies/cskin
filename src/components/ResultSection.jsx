
export default function ResultSection({ result }) {
  if (!result) return null;

  return (
    <div className="mt-12 bg-white rounded-xl p-6 shadow-md max-w-2xl mx-auto fade-in">
      <h2 className="text-2xl font-bold text-center text-secondary mb-4">🎉 Hasil Analisis</h2>
      <div className="text-center mb-6">
        <p className="text-lg">Jenis kulit Anda:</p>
        <p className="text-2xl font-bold text-primary mb-2">{result.predicted_class}</p>
        <p className="text-base">Tingkat kepercayaan: <strong>{result.confidence}%</strong></p>
      </div>
    </div>
  );
}
