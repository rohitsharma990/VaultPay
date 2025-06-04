import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaEye, FaEyeSlash, FaGoogle, FaApple, FaFacebookF, FaTwitter } from 'react-icons/fa';
import { login } from '../api/auth';
import { UserDataContext } from '../Context/UserContext';
import SignInSuccessModal from '../components/ui/SignInSuccessModal.jsx';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(UserDataContext);
  const [rememberMe, setRememberMe] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await login(email, password);
    if (response.message === "Login successful") {
      setUser(response.user);
      setShowSuccessModal(true);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } else {
      alert(response.message);
    }
  };
  const theme = localStorage.getItem('theme');

  return (
    <>
      {showSuccessModal && <SignInSuccessModal onRedirect={() => navigate('/')} />}
        <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'dark-mode' : 'light-mode'} px-4`}>
        <div className={`w-full max-w-md ${theme === 'dark' ? 'dark-mode' : 'light-mode'} rounded-lg shadow-lg p-6 sm:p-8`}>
          <h2 className="text-2xl sm:text-3xl font-bold mb-1 flex items-center gap-2 text-gray-900">
            Welcome back <span role="img" aria-label="wave">👋</span>
          </h2>
          <p className="text-gray-500 mb-6">Please enter your email & password to sign in.</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="relative">
                <input
                  type="email"
                  className="w-full border-b border-gray-300 focus:border-blue-600 outline-none py-2 pr-10 text-base bg-transparent text-gray-900 placeholder-gray-500"
                  placeholder="Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
                <FaEnvelope className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="w-full border-b border-gray-300 focus:border-blue-600 outline-none py-2 pr-10 text-base bg-transparent text-gray-900 placeholder-gray-500"
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <div className="flex items-center mb-2">
              <input
                id="rememberMe"
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
            <div className="flex justify-between items-center mb-4">
              <Link to="/forgot-password" className="text-blue-600 text-sm font-medium hover:underline">
                Forgot password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors text-base mt-2"
            >
              Sign in
            </button>
          </form>
          <div className="flex justify-center items-center my-4">
            <span className="text-gray-400 text-sm">Don&apos;t have an account?</span>
            <Link to="/register" className="text-blue-600 text-sm font-medium ml-1 hover:underline">
              Sign up
            </Link>
          </div>
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="mx-2 text-gray-400 text-sm">or continue with</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>
          <div className="flex justify-center gap-4 mb-2">
            <button type="button" className="p-2 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors">
              <FaGoogle className="text-xl text-gray-600" />
            </button>
            <button type="button" className="p-2 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors">
              <FaApple className="text-xl text-gray-600" />
            </button>
            <button type="button" className="p-2 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors">
              <FaFacebookF className="text-xl text-blue-600" />
            </button>
            <button type="button" className="p-2 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors">
              <FaTwitter className="text-xl text-blue-400" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;