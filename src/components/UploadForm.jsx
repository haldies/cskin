import React, { useRef, useState } from 'react';

export default function UploadForm({ setResult }) {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
      alert('File harus berupa JPG atau PNG.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Ukuran maksimal 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fileInputRef.current.files[0]) {
      alert('Upload gambar terlebih dahulu');
      return;
    }

    setLoading(true);
    const result = await uploadImageForAnalysis(fileInputRef.current.files[0]);
    setResult(result);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 border-4 border-dashed border-primary hover:border-solid transition-all shadow-md">
      {!preview ? (
        <div className="flex flex-col items-center justify-center space-y-4 h-64">
          <p className="text-secondary">Upload gambar wajah Anda</p>
          <button type="button" onClick={() => fileInputRef.current.click()} className="bg-primary text-white px-4 py-2 rounded">
            Pilih File
          </button>
          <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} hidden />
        </div>
      ) : (
        <div>
          <img src={preview} alt="Preview" className="w-full h-60 object-cover rounded mb-4" />
          <div className="flex justify-between gap-4">
            <button type="button" onClick={() => { setPreview(null); fileInputRef.current.value = ''; }} className="bg-gray-200 text-secondary px-4 py-2 rounded">
              Ganti Foto
            </button>
            <button type="submit" className="bg-primary text-white px-4 py-2 rounded" disabled={loading}>
              {loading ? 'Menganalisis...' : 'Mulai Analisis'}
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
