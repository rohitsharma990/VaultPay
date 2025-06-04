import React, { useContext, useEffect, useState } from 'react';
import { UserDataContext } from '../../../Context/UserContext';
import { getallTransactions } from '../../../api/auth';

const TransactionList = () => {
  const { user } = useContext(UserDataContext);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const response = await getallTransactions(user._id);
        setTransactions(response.transactionsby);
        setError(null);
      } catch (err) {
        setError('Failed to fetch transactions');
        console.error('Error fetching transactions:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, [user]);

  if (loading) {
    return (
      <div className="h-60 flex flex-col items-center justify-center w-full">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-60 flex flex-col items-center justify-center w-full">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!transactions || transactions.length === 0) {
    return (
      <div className="h-60 flex flex-col items-center justify-center w-full">
        <p className="text-gray-500">No transactions found</p>
      </div>
    );
  }


  return (
    <div className="h-[calc(100vh-300px)] flex flex-col items-center w-full overflow-y-auto px-4 mt-4 mb-20">
      <div className="w-full max-w-xl space-y-2">
        {transactions.map((transaction) => (
          <div key={transaction._id} className={`flex items-center justify-between w-full rounded-lg shadow p-4 bg-white`}>
            <img
              src={transaction.user?.ProfilePicture || 'https://res.cloudinary.com/dmv6ezqo6/image/upload/v1747470831/profile_hjaeyg.png'}
              alt="User"
              className="w-12 h-12 rounded-full object-cover mr-4"
            /> 
            <div className="flex flex-col flex-1 min-w-0">
              <span className="font-semibold text-lg text-gray-900 truncate">{transaction.title}</span>
              <span className="text-xs text-gray-500 mt-1">
                {new Date(transaction.date).toLocaleDateString()} {new Date(transaction.date).toLocaleTimeString()}
              </span>
            </div>
            <div className="flex flex-col items-end ml-4">
              <span className={`font-semibold text-lg ${transaction.type === "Sent" ? "text-red-500" : "text-green-500"}`}>
                {transaction.amount} ₹
              </span>
              <span className="text-xs text-gray-500 mt-1">{transaction.type}</span>
              {transaction.bonus > 0 && (
                <span className="text-xs text-green-500 mt-1">Bonus: +{transaction.bonus} ₹</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;