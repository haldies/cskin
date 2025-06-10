import React, { useRef, useState } from 'react';

export default function UploadForm({ setResult }) {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log('File dipilih:', file);

    if (!file) {
      console.log('Tidak ada file yang dipilih.');
      return;
    }

    setSelectedFile(file); // Simpan file ke state
    const reader = new FileReader();
    reader.onload = () => {
      console.log('File dibaca sebagai DataURL');
      setPreview(reader.result);
    };
    reader.onerror = (err) => {
      console.error('Gagal membaca file:', err);
    };
    reader.readAsDataURL(file);
  };

  const uploadImageForAnalysis = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    console.log('Mengirim FormData ke API...');

    try {
      const response = await fetch('https://bakcend-cskin-50598077190.asia-southeast1.run.app/api/predict', {
        method: 'POST',
        body: formData,
      });

      console.log('Response diterima:', response);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server response error:', errorText);
        throw new Error(`Server error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('Data hasil analisis:', data);
      return data;
    } catch (error) {
      console.error('Upload error:', error);
      alert('Terjadi kesalahan saat mengunggah gambar: ' + error.message);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      console.log('Upload gambar terlebih dahulu');
      return;
    }

    console.log('Mulai proses analisis...');
    setLoading(true);
    try {
      const result = await uploadImageForAnalysis(selectedFile);
      console.log('Hasil dari API:', result);
      if (result) {
        setResult(result);
      }
    } catch (error) {
      console.error('Submit error:', error);
    } finally {
      setLoading(false);
      console.log('Proses selesai');
    }
  };

  const resetForm = () => {
    console.log('Form di-reset');
    setPreview(null);
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 border-4 border-dashed border-primary hover:border-solid transition-all shadow-md">
      {!preview ? (
        <div className="flex flex-col items-center justify-center space-y-4 h-64">
          <p className="text-secondary">Upload gambar wajah Anda</p>
          <button 
            type="button" 
            onClick={() => {
              console.log('Membuka file picker...');
              fileInputRef.current?.click();
            }} 
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
          >
            Pilih File
          </button>
          <input 
            type="file" 
            accept="image/*" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            hidden 
          />
        </div>
      ) : (
        <div>
          <img src={preview} alt="Preview" className="w-full h-60 object-cover rounded mb-4" />
          <div className="flex justify-between gap-4">
            <button 
              type="button" 
              onClick={resetForm} 
              className="bg-gray-200 text-secondary px-4 py-2 rounded hover:bg-gray-300"
            >
              Ganti Foto
            </button>
            <button 
              type="submit" 
              className="bg-primary text-white px-4 py-2 rounded cursor-pointer hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed" 
              disabled={loading}
            >
              {loading ? 'Menganalisis...' : 'Mulai Analisis'}
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
