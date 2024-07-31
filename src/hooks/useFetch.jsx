import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

const useFetch = () => {
  const { token, logout } = useContext(UserContext);

  const fetchWrapper = async (url, options = {}) => {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response);

      if (token != null && response.status === 440) {
        alert('Session expired, please log in again.');
        logout();
        return;
      }

      return response;
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  };

  return fetchWrapper;
};

export default useFetch;
