import React, { useRef, useState } from 'react';

export default function UploadForm({ setResult }) {
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [stream, setStream] = useState(null);
  const [capturedCount, setCapturedCount] = useState(0);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log('File dipilih:', file);

    if (!file) {
      console.log('Tidak ada file yang dipilih.');
      return;
    }

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      console.log('File dibaca sebagai DataURL');
      setPreview(reader.result);
      stopCamera();
      setCapturedCount(prev => prev + 1);
    };
    reader.onerror = (err) => {
      console.error('Gagal membaca file:', err);
    };
    reader.readAsDataURL(file);
  };

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: false,
      });
      videoRef.current.srcObject = mediaStream;
      setStream(mediaStream);
      setShowCamera(true);
    } catch (err) {
      console.error('Error accessing camera:', err);
      alert('Tidak dapat mengakses kamera. Pastikan Anda memberikan izin.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setShowCamera(false);
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageDataUrl = canvas.toDataURL('image/png');
    setPreview(imageDataUrl);

    fetch(imageDataUrl)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([blob], 'selfie.png', { type: 'image/png' });
        setSelectedFile(file);
        setCapturedCount(prev => prev + 1);
      });

    stopCamera();
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
    setCapturedCount(0);
    stopCamera();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-md max-w-md mx-auto">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-primary mb-4">AMBIL SELFIE</h1>

        <div className="bg-gray-50 p-5 rounded-lg mb-6 text-left border border-gray-200">
          <p className="font-semibold mb-3 text-gray-800 text-lg">Untuk analisis yang sempurna, ikuti petunjuk berikut:</p>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="text-gray-700">Hapus makeup dan lepas kacamata</span>
            </li>
            <li className="flex items-start">

              <span className="text-gray-700">Pastikan rambut tidak menutupi wajah</span>
            </li>
            <li className="flex items-start">

              <span className="text-gray-700">Hadapkan wajah ke kamera dengan ekspresi netral</span>
            </li>
            <li className="flex items-start">

              <span className="text-gray-700">Pastikan pencahayaan Anda cukup</span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-700">Cuci muka dengan sabun cuci wajah dan diamkan 1 jam sebelum foto</span>
            </li>
          </ul>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg mb-6 text-left border border-blue-100">
          <p className="font-medium text-blue-800 mb-2">Aplikasi ini membutuhkan akses kamera Anda untuk memberikan pengalaman yang dipersonalisasi berdasarkan selfie Anda.</p>
          <p className="text-blue-700 text-sm">Selfie Anda tidak akan disimpan</p>
        </div>

        <h2 className="text-xl font-bold text-primary mb-4">AMBIL SELFIE</h2>
      </div>

      <form onSubmit={handleSubmit} className="border-gray-300 rounded-lg">
        {!preview ? (
          showCamera ? (
            <div className="flex flex-col items-center justify-center space-y-4">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-60 object-cover rounded-lg mb-4 border-2 border-gray-200"
              />
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={capturePhoto}
                  className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium"
                >
                  Ambil Foto
                </button>
                <button
                  type="button"
                  onClick={stopCamera}
                  className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  Batal
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-4 h-64">
              <p className="text-gray-600 mb-4 font-medium">UNGGAH FOTO SELFIE</p>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={startCamera}
                  className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
                >
                  Ambil Selfie
                </button>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-secondary text-white px-6 py-3 rounded-lg hover:bg-secondary/90 transition-colors font-medium"
                >
                  Unggah Foto
                </button>
              </div>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                hidden
              />
            </div>
          )
        ) : (
          <div>
            <img
              src={preview}
              alt="Preview"
              className="w-full h-60 object-cover rounded-lg mb-4 border-2 border-gray-200"
            />
            <div className="flex justify-between gap-4">
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Ganti Foto
              </button>
              <button
                type="submit"
                className="bg-primary text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                disabled={loading || capturedCount < 1}
              >
                {loading ? 'Menganalisis...' : 'Mulai Analisis'}
              </button>
            </div>
          </div>
        )}
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </form>
    </div>
  );
}