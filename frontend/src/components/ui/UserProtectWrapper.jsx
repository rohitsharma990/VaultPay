import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext } from '../../Context/UserContext.jsx';

const UserProtectWrapper = ({ children }) => {
  const { user, setUser } = useContext(UserDataContext);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const res = await axios.get(import.meta.env.VITE_SERVER_URL + '/users/getUserById', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setUser(res.data);
      } catch (err) {
        console.error(err);
        localStorage.removeItem('token');
        navigate('/login');
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [token, navigate, setUser]);

  if (isLoading) {
    return <div className='flex justify-center items-center h-screen'>Loading...</div>;
  }

  if (hasError) {
    return <div>Error occurred. Please try again later.</div>;
  }

  return <div>{children}</div>;
};

export default UserProtectWrapper; 