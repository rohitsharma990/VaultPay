import React from 'react';
import { FaBell } from "react-icons/fa";
import logo from '../assets/logo.png';

export default function Navbar() {
  return (
    <div className="flex items-center justify-between px-6 py-4 w-full bg-white shadow-lg">
      <img src={logo} alt="logo" className="w-10 h-10 transition-transform duration-300 hover:scale-110" />
      <div className="font-bold text-2xl text-gray-900">
        SwiftPay
      </div>
      <FaBell className="w-6 h-6 text-gray-900 hover:text-gray-600 transition-all duration-300 hover:scale-110" />
    </div>
  );
}