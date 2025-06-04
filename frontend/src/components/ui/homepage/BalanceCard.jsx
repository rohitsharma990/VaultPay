import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { UserDataContext } from '../../../Context/UserContext';
import { getUserById } from '../../../api/auth';

const BalanceCard = () => {
  const { user } = useContext(UserDataContext);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getUserById(user._id);
      setUserData(userData);
    };
    fetchUserData();
  }, [user]);

  if (!userData) {
    return (
      <div className="h-60 flex flex-col items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="h-60 flex flex-col items-center justify-center bg-blue-700 text-white">
      <h1 className="text-5xl font-bold mb-2 text-white">
        {userData.user.Coins} <span className="text-2xl text-white">₹</span>
      </h1>
      <p className="text-sm text-gray-300">available balance</p>
    </div>
  );
};

export default BalanceCard;