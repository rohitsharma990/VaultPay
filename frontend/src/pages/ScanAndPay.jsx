import React, { useState } from 'react';
import BottomBar from '../components/BottomBar';
import Navbar from '../components/Navbar';
import QrScannerComponent from '../components/QrScannerComponent.jsx';

const ScanAndPay = () => {
  const [scannedData, setScannedData] = useState('');
  const [showScanner, setShowScanner] = useState(true);

  const handleScan = (data) => {
    setScannedData(data);
    setShowScanner(false);
  };

  return (
    <>
      <Navbar />
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="px-6 py-8">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
                Scan & Pay
              </h2>

              {showScanner ? (
                <div>
                  <QrScannerComponent onScan={handleScan} />
                  <p className="text-sm text-gray-600 text-center mt-4">
                    Position the QR code within the frame
                  </p>
                </div>
              ) : (
                <div className="bg-green-100 border border-green-300 rounded-lg p-4 mt-4 text-center">
                  <p className="text-green-800 font-medium">QR Code Scanned Successfully!</p>
                  <p className="text-sm text-gray-700 break-all mt-2">{scannedData}</p>
                  <button
                    className="mt-4 py-2 px-4 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                    onClick={() => {
                      setShowScanner(true);
                      setScannedData('');
                    }}
                  >
                    Scan Another QR Code
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <BottomBar />
    </>
  );
};

export default ScanAndPay;
