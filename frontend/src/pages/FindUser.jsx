import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import BottomBar from '../components/BottomBar';
import { findUserByPhoneNumber } from '../api/auth';
import { GoArrowRight } from "react-icons/go";

const FindUser = () => {
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('all');
  const [response, setResponse] = useState([]); // Initialize as empty array instead of null

  const handleSearch = async (phoneNumber) => {
    try {
      const response = await findUserByPhoneNumber(phoneNumber);
      setResponse(response.user || []); // Ensure we always set an array
    } catch (error) {
      console.error('Error searching users:', error);
      setResponse([]); // Set empty array on error
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <div className="flex-1 p-4 flex flex-col items-center">
        {/* Search Bar */}
        <div className="w-full max-w-md mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by phone number"
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                handleSearch(e.target.value);
              }}
            />
            <span className="absolute left-3 top-2.5 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" /></svg>
            </span>
          </div>
        </div>
        {/* Tabs */}
        <div className="w-full max-w-md flex border-b border-gray-200 mb-2">
          <button
            className={`flex-1 text-center py-2 font-semibold  border-none`}
            onClick={() => setTab('all')}
          >
            All Users
          </button>
        </div>
        {/* Contact List with Alphabet Scrollbar */}
        <div className="relative w-full max-w-md flex">
          <div className="flex-1 overflow-y-auto h-[570px] pr-4">
  
            {response.length === 0 ? (
              <div className="text-center text-gray-400 mt-10">No contacts found.</div>
            ) : (
              response.map((contact, idx) => (
                <div key={idx} className="flex items-center py-3 border-b border-gray-100">
                  <img src={contact.ProfilePicture} alt={contact.FullName.firstName} className="w-12 h-12 rounded-full object-cover mr-4" />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">{contact.FullName.firstName} {contact.FullName.lastName}</div>
                    <div className="text-gray-500 text-sm">{contact.PhoneNumber}</div>
                  </div>
                  <div className="flex items-center">
                    <button className="text-blue-500">
                    <GoArrowRight />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <BottomBar />
    </div>
  );
};

export default FindUser;