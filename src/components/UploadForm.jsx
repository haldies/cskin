import React, { useRef, useState, useEffect } from 'react';

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
  const [cameraError, setCameraError] = useState(null);

  // Cleanup stream on component unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
      stopCamera();
      setCapturedCount(prev => prev + 1);
    };
    reader.readAsDataURL(file);
  };

  const startCamera = async () => {
    setCameraError(null);
    console.log('Starting camera...');
    
    try {
      // Stop any existing stream first
      if (stream) {
        console.log('Stopping existing stream...');
        stream.getTracks().forEach(track => track.stop());
        setStream(null);
      }

      // Check if getUserMedia is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera not supported by this browser');
      }

      console.log('Requesting camera access...');

      // Try with different constraints - start simple
      let constraints = {
        video: true,
        audio: false,
      };

      // Try to get media stream
      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      console.log('Camera access granted, stream obtained:', mediaStream);

      // Set stream immediately
      setStream(mediaStream);
      setShowCamera(true);

      // Wait a bit for React to render the video element
      await new Promise(resolve => setTimeout(resolve, 100));

      // Now set the video source
      if (videoRef.current) {
        console.log('Setting video source...');
        videoRef.current.srcObject = mediaStream;
        
        // Force video to play
        try {
          await videoRef.current.play();
          console.log('Video started playing');
        } catch (playError) {
          console.log('Video play error (this is often normal):', playError.message);
          // This error is often harmless in modern browsers
        }
      } else {
        console.error('Video element not found');
        throw new Error('Video element not available');
      }

    } catch (error) {
      console.error('Camera error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
      
      // Clean up any partial streams
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        setStream(null);
      }
      
      let errorMessage = 'Tidak dapat mengakses kamera. ';
      
      if (error.name === 'NotAllowedError') {
        errorMessage += 'Mohon berikan izin akses kamera di browser Anda. Coba refresh halaman dan klik "Allow" saat diminta.';
      } else if (error.name === 'NotFoundError') {
        errorMessage += 'Kamera tidak ditemukan pada perangkat Anda.';
      } else if (error.name === 'NotSupportedError') {
        errorMessage += 'Browser Anda tidak mendukung akses kamera.';
      } else if (error.name === 'NotReadableError') {
        errorMessage += 'Kamera sedang digunakan aplikasi lain. Tutup aplikasi lain yang menggunakan kamera.';
      } else if (error.name === 'OverconstrainedError') {
        errorMessage += 'Pengaturan kamera tidak didukung perangkat Anda.';
      } else {
        errorMessage += `Error: ${error.message}. Coba refresh halaman atau gunakan browser lain.`;
      }
      
      setCameraError(errorMessage);
      setShowCamera(false);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => {
        track.stop();
      });
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setShowCamera(false);
    setCameraError(null);
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    if (!video || !canvas) {
      alert('Error: Video atau canvas tidak tersedia');
      return;
    }

    // Make sure video is playing and has dimensions
    if (video.videoWidth === 0 || video.videoHeight === 0) {
      alert('Video belum siap. Tunggu sebentar dan coba lagi.');
      return;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], 'selfie.png', { type: 'image/png' });
        setSelectedFile(file);
        
        const imageDataUrl = canvas.toDataURL('image/png');
        setPreview(imageDataUrl);
        setCapturedCount(prev => prev + 1);
        
        stopCamera();
      } else {
        alert('Gagal mengambil foto. Silakan coba lagi.');
      }
    }, 'image/png', 0.8);
  };

  const uploadImageForAnalysis = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('https://cskin-ai-50598077190.asia-southeast1.run.app/api/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      alert('Terjadi kesalahan saat mengunggah gambar: ' + error.message);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      return;
    }

    setLoading(true);
    try {
      const result = await uploadImageForAnalysis(selectedFile);
      if (result) {
        setResult(result);
      }
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setPreview(null);
    setSelectedFile(null);
    setCapturedCount(0);
    setCameraError(null);
    stopCamera();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-xl max-w-lg mx-auto mt-10 border border-gray-100">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-primary mb-4">AMBIL SELFIE</h1>

        <div className="bg-gray-50 p-5 rounded-lg mb-6 text-left border border-gray-200">
          <p className="font-semibold mb-3 text-gray-800 text-lg">Ikuti petunjuk untuk hasil terbaik:</p>
          <ul className="space-y-2 list-disc pl-5 text-sm text-gray-700">
            <li>Hapus makeup dan lepas kacamata</li>
            <li>Pastikan rambut tidak menutupi wajah</li>
            <li>Hadapkan wajah ke kamera dengan ekspresi netral</li>
            <li>Pastikan pencahayaan cukup</li>
            <li>Cuci muka dan diamkan 1 jam sebelum foto</li>
          </ul>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
          <h4 className="font-semibold text-gray-800 mb-2 text-start">⚠️ info:</h4>
          <p className="text-gray-600 text-sm md:text-base text-start">Aplikasi ini membutuhkan akses kamera Anda.</p>
          <p className="text-gray-600 text-sm md:text-base text-start">Selfie Anda tidak akan disimpan.</p>
        </div>
      </div>

      {/* Show camera error if any */}
      {cameraError && (
        <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400 mb-4">
          <p className="text-red-700 text-sm">{cameraError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 border-2 border-dashed border-gray-300 p-6 rounded-4xl shadow-lg">
        {!preview ? (
          showCamera ? (
            <div className="flex flex-col items-center gap-4">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-72 object-cover rounded-xl border-4 border-primary/20 shadow-inner"
              />
              <div className="flex gap-4 w-full justify-center">
                <button
                  type="button"
                  onClick={capturePhoto}
                  className="bg-primary text-white px-6 py-3 rounded-lg hover:scale-105 transition-all"
                >
                  Ambil Foto
                </button>
                <button
                  type="button"
                  onClick={stopCamera}
                  className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300"
                >
                  Batal
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-6 h-64">
              <p className="text-gray-600 font-medium text-center">Unggah atau ambil foto selfie Anda</p>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={startCamera}
                  className="bg-primary text-white px-6 py-3 rounded-lg hover:opacity-90 transition"
                >
                  Ambil Selfie
                </button>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-secondary text-white px-6 py-3 rounded-lg hover:opacity-90 transition"
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
              className="w-full h-72 object-cover rounded-xl border-4 border-primary/20 shadow-lg"
            />
            <div className="flex justify-between mt-4 gap-4">
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition font-medium"
              >
                Ganti Foto
              </button>
              <button
                type="submit"
                className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium"
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