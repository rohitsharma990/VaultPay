import React, { useContext } from 'react';
import Navbar from '../components/Navbar';
import BottomBar from '../components/BottomBar';
import { UserDataContext } from '../Context/UserContext';

const QrCodePage = () => {
  const { user } = useContext(UserDataContext);
  const theme = localStorage.getItem('theme');
  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark-mode' : 'light-mode'} flex flex-col`}>
      <Navbar />
      <div className="flex-1 p-4 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-900">My QR Code</h1>
            <div className={`${theme === 'dark' ? 'dark-mode' : 'light-mode'} rounded-lg shadow p-4`}>
          <div className="flex flex-col items-center justify-center">
            <div className={`w-full h-full ${theme === 'dark' ? 'dark-mode' : 'light-mode'} rounded-lg shadow p-4 flex flex-col items-center justify-center`}>
              <img src={user.user.QRCode} alt="QR Code" className="w-full h-full" />
            </div>
            <p className="text-gray-600">Name: {user.user.FullName.firstName} {user.user.FullName.lastName}</p>
            <p className="text-gray-600">Scan to pay</p>
          </div>
        </div>
      </div>
      <BottomBar />
    </div>
  );
};

export default QrCodePage; 