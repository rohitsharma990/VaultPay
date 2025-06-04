import React, { useEffect } from "react";

export default function SignInSuccessModal({ onRedirect, delay = 2000 }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onRedirect) onRedirect();
    }, delay);
    return () => clearTimeout(timer);
  }, [onRedirect, delay]);

  const theme = localStorage.getItem('theme');
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className={`rounded-2xl shadow-xl px-6 py-8 w-80 flex flex-col items-center relative ${theme === 'dark' ? 'dark-mode' : 'light-mode'}`}>
        {/* Green Icon with Dots */}
        <div className="relative mb-4 flex flex-col items-center">
          <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center">
            <svg width="40" height="40" viewBox="0 0 40 40">
              <circle cx="20" cy="16" r="6" fill="#222" />
              <ellipse cx="20" cy="30" rx="8" ry="5" fill="#222" />
            </svg>
          </div>
          {/* Animated Dots */}
          <div className="absolute left-1/2 top-[88px] flex -translate-x-1/2 space-x-1">
            {[...Array(6)].map((_, i) => (
              <span
                key={i}
                className="w-2 h-2 bg-blue-500 rounded-full opacity-70 animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        </div>
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Sign in Successful!</h2>
        <p className="text-gray-500 text-center mb-6 text-sm">
          Please wait...<br />
          You will be directed to the homepage.
        </p>
        {/* Spinner */}
        <div className="w-9 h-9 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
      </div>
    </div>
  );
}