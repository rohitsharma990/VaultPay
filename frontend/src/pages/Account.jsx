import React, { useContext } from 'react';
import Navbar from '../components/Navbar';
import BottomBar from '../components/BottomBar';
import { UserDataContext } from '../Context/UserContext';
import { FaBell, FaShieldAlt, FaLanguage, FaQuestionCircle, FaInfoCircle, FaSignOutAlt, FaLock, FaRegUserCircle, FaQrcode } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const fallbackProfile = 'https://res.cloudinary.com/dmv6ezqo6/image/upload/v1747470831/profile_hjaeyg.png';

const AccountPage = () => {
  const { user, setUser } = useContext(UserDataContext);
  const navigate = useNavigate();
  const userInfo = user?.user || {};

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col mb-20">
      <Navbar />
      <div className="flex-1 p-2 sm:p-4 flex flex-col items-center w-full">
        <div className="w-full max-w-md mx-auto">
          {/* Profile Section */}
          <div className="flex flex-col items-center py-6">
            <img
              src={userInfo.ProfilePicture || fallbackProfile}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border-4 border-blue-600 shadow-lg transition-all duration-300 hover:scale-105"
            />
            <div className="mt-3 text-center">
              <div className="font-semibold text-lg sm:text-xl flex items-center justify-center gap-2">
                {userInfo.FullName?.firstName} {userInfo.FullName?.lastName}
              </div>
              <div className="text-sm mt-1 text-gray-600">
                {userInfo.Email}
              </div>
            </div>
          </div>

          {/* General Section */}
          <div className="mt-2">
            <div className="text-xs uppercase text-gray-400 font-semibold px-2 mb-1">General</div>
            <div className="rounded-lg shadow-lg divide-y divide-gray-200">
              <AccountItem icon={<FaRegUserCircle />} label="Personal Info" onClick={() => {}} />
              <AccountItem icon={<FaBell />} label="Notification" onClick={() => {}} />
              <AccountItem icon={<FaShieldAlt />} label="Security" onClick={() => {}} />
              <AccountItem icon={<FaLanguage />} label="Language" value="English (US)" onClick={() => {}} />
              <AccountItem icon={<FaQrcode />} label="QR Code" onClick={() => {}} />
            </div>
          </div>

          {/* About Section */}
          <div className="mt-6">
            <div className="text-xs uppercase text-gray-400 font-semibold px-2 mb-1">About</div>
            <div className="rounded-lg shadow-lg divide-y divide-gray-200">
              <AccountItem icon={<FaQuestionCircle />} label="Help Center" onClick={() => {}} />
              <AccountItem icon={<FaLock />} label="Privacy Policy" onClick={() => {}} />
              <AccountItem icon={<FaInfoCircle />} label="About SwiftPay" onClick={() => {}} />
            </div>
          </div>

          {/* Logout */}
          <button
            className="flex items-center gap-2 w-full justify-center mt-8 text-red-500 font-semibold py-2 rounded-lg transition-all duration-300 hover:bg-red-50"
            onClick={handleLogout}
          >
            <FaSignOutAlt className="w-5 h-5" /> Logout
          </button>
        </div>
      </div>
      <BottomBar />
    </div>
  );
};

function AccountItem({ icon, label, value, onClick }) {
  return (
    <button
      className="flex items-center w-full px-4 py-4 text-left transition-all duration-300 group focus:outline-none hover:bg-gray-50"
      onClick={onClick}
      type="button"
    >
      <span className="w-6 h-6 flex items-center justify-center mr-4 transition-colors duration-300 group-hover:text-gray-600">
        {icon}
      </span>
      <span className="flex-1 font-medium text-sm sm:text-base">
        {label}
      </span>
      {value && (
        <span className="text-xs sm:text-sm mr-2 text-gray-500">
          {value}
        </span>
      )}
      <span className="group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-300">
        &gt;
      </span>
    </button>
  );
}

export default AccountPage; 