import React, { useState, useEffect } from 'react';

function BubleChat() {
    const [isPulsing, setIsPulsing] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsPulsing(true);
            setTimeout(() => setIsPulsing(false), 2000);
        }, 8000);

        return () => clearInterval(interval);
    }, []);

    const handleChatbotClick = () => {
        window.open('https://c-skin-934512542726.asia-southeast1.run.app', '_blank');
    };

    return (
        <div>
            <div
                className={`fixed bottom-8 right-8 w-16 h-16 bg-primary rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:bg-primary-dark transition-all duration-300 z-50 ${isPulsing ? 'animate-pulse-ring' : ''}`}
                onClick={handleChatbotClick}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>

                {/* Tooltip yang muncul saat hover */}
                {showTooltip && (
                    <div className="absolute right-20 bottom-0 bg-white text-gray-800 px-4 py-2 rounded-lg shadow-md w-64">
                        <p className="font-medium">Butuh bantuan lebih lanjut?</p>
                        <p className="text-sm">Klik untuk chat dengan ahli skincare kami!</p>
                    </div>
                )}

                {/* Bubble chat kecil */}
                <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center animate-bounce">
                    ?
                </div>
            </div>
            {/* Tambahkan CSS untuk animasi custom */}
            <style jsx>{`
        @keyframes pulse-ring {
          0% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
          }
          70% {
            transform: scale(1);
            box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
          }
          100% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
          }
        }
        .animate-pulse-ring {
          animation: pulse-ring 1.5s infinite;
        }
      `}</style>
        </div>

    )
}

export default BubleChat