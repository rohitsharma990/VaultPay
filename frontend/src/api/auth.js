import axios from 'axios';

//delete token
const deleteToken = () => {
    setTimeout(() => {
      localStorage.removeItem('token');
    }, 24 * 60 * 60 * 1000); // 24 hours
};

deleteToken();

export const login = async (email, password) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/users/login_with_email_and_password`,
      { 
      email: email,
        password: password
      }
    );
    if (response.status === 200) {
      const { user, token, message } = response.data;
      localStorage.setItem('token', token);
      return { user, message };
    }
    
    throw new Error('Login failed');
  } catch (error) {
    console.error('Login error:', error);
    throw new Error('Login failed. Please try again.');
  }
};



export const getUserById = async (userId) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/users/getUserById?userId=${userId}`,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw new Error('Failed to fetch user. Please try again.');
  }
};

export const getallTransactions = async (userId) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/users/getallTransactions`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    );

    // Get user details for each transaction
    const transactionsWithUsers = await Promise.all(
      response.data.transactionsby.map(async (transaction) => {
        const userData = await getUserById(transaction.userId);
        return {
          ...transaction,
          user: userData.user
        };
      })
    );

    return {
      transactionsby: transactionsWithUsers
    };
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw new Error('Failed to fetch transactions. Please try again.');
  }
};


export const findUserByPhoneNumber = async (phoneNumber) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/users/getAllUsers`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    const searchString = String(phoneNumber); // e.g., "1"

    // Filter users whose phone number contains the search string
    const filteredUsers = response.data.user.filter(user =>
      String(user.PhoneNumber).includes(searchString)
    );

    return {
      user: filteredUsers
    };
  } catch (error) {
    console.error('Error finding user:', error);
    throw new Error('Failed to find user. Please try again.');
  }
};
