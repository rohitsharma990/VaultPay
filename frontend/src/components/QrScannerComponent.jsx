import React, { useEffect, useRef, useState } from 'react';
import QrScanner from 'qr-scanner';

const QrScannerComponent = ({ onScan }) => {
  const videoRef = useRef(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const scannerRef = useRef(null);

  useEffect(() => {
    if (!videoRef.current) return;

    // Check if camera is available
    QrScanner.hasCamera()
      .then((hasCamera) => {
        if (!hasCamera) {
          setError("❌ Camera not found. Please connect a camera or use a different device.");
          setLoading(false);
          return;
        }

        // Start scanning
        scannerRef.current = new QrScanner(
          videoRef.current,
          (result) => {
            onScan(result.data);
            scannerRef.current?.stop();
          },
          {
            highlightScanRegion: true,
            returnDetailedScanResult: true,
          }
        );

        scannerRef.current
          .start()
          .then(() => setLoading(false))
          .catch((err) => {
            console.error(err);
            setError("❌ Camera access denied or not available.");
            setLoading(false);
          });
      })
      .catch((err) => {
        console.error("hasCamera check failed:", err);
        setError("❌ Failed to check camera availability.");
        setLoading(false);
      });

    return () => {
      scannerRef.current?.stop();
    };
  }, [onScan]);

  if (error) {
    return <p className="text-red-600 text-center mt-4">{error}</p>;
  }

  if (loading) {
    return <p className="text-gray-600 text-center mt-4">📷 Initializing camera...</p>;
  }

  return (
    <div className="w-full max-w-sm mx-auto relative aspect-square bg-gray-100 rounded overflow-hidden">
      <video ref={videoRef} className="w-full h-full object-cover" />
      <div className="absolute inset-0 border-2 border-dashed border-indigo-500 rounded pointer-events-none"></div>
    </div>
  );
};

export default QrScannerComponent;
