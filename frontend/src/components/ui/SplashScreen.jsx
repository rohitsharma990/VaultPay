import React from 'react';
import logo from '../../assets/logo.png'; // Update path if needed

const SplashScreen = () => {
  return (
    <div className={`flex flex-col items-center justify-center min-h-screen bg-white w-full h-full`}>
      <img
        src={logo}
        alt="VaultPay Logo"
        className="w-32 h-32 mb-4 object-contain"
      />
      <h1 className="text-xl font-semibold text-black">VaultPay</h1>
      <div className="mt-10">
        <span className="relative flex h-10 w-10">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-600 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-10 w-10 bg-blue-600"></span>
        </span>
      </div>
    </div>
  );
};

export default SplashScreen;