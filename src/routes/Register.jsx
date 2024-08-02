import React, { useState } from 'react';
import useFetch from '../hooks/useFetch';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const fetch = useFetch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/auth/register`,
        {
          method: 'POST',
          body: JSON.stringify(formData)
        }
      );

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const result = await response.json();
      setSuccess('Registration successful! Please log in.');
      setFormData({ username: '', password: '' });
      setError('');
    } catch (err) {
      setError(err.message);
      setSuccess('');
    }
  };

  return (
    <div className='register-page'>
      <h1>Register</h1>
      {error && <p className='error'>{error}</p>}
      {success && <p className='success'>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            id='username'
            name='username'
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button
          style={{ marginTop: '10px', marginBottom: '10px' }}
          type='submit'
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
