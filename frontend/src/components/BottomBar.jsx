import React from 'react';
import { HomeIcon, UserIcon } from '@heroicons/react/24/solid';
import { FaQrcode, FaUsers } from 'react-icons/fa';
import { RiQrScan2Line } from 'react-icons/ri';
import { useNavigate, useLocation } from 'react-router-dom';

export default function BottomBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/', icon: <HomeIcon className="w-6 h-6" />, label: 'Home' },
    { path: '/find-user', icon: <FaUsers className="w-6 h-6" />, label: 'Find User' },
    { 
      path: '/scan-and-pay', 
      icon: (
        <RiQrScan2Line 
          className="w-10 h-10 p-1.5 rounded-full bg-blue-600 text-white shadow-lg"
        />
      ), 
      label: 'Scan' 
    },
    { path: '/qr-code', icon: <FaQrcode className="w-6 h-6" />, label: 'QR Code' },
    { path: '/account', icon: <UserIcon className="w-6 h-6" />, label: 'Account' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 flex justify-around items-center py-3 px-2 z-50 bg-white shadow-lg">
      {navItems.map((item) => (
        <NavItem
          key={item.path}
          icon={item.icon}
          label={item.label}
          active={location.pathname === item.path}
          onClick={() => navigate(item.path)}
        />
      ))}
    </nav>
  );
}

function NavItem({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center flex-1 transition-all duration-300 text-xs font-medium
        ${active 
          ? 'text-blue-600 scale-110' 
          : 'text-gray-500 hover:text-gray-700'
        }`}
    >
      {icon}
      <span className="mt-1">{label}</span>
    </button>
  );
}
