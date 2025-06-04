import React from 'react';
import Navbar from '../components/Navbar';
import BottomBar from '../components/BottomBar';
import BalanceCard from '../components/ui/homepage/BalanceCard';
import TransactionList from '../components/ui/homepage/TransactionList';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <BalanceCard />
      <TransactionList />
      <BottomBar />
    </div>
  );
};

export default HomePage;