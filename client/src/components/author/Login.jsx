import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loginError, setLoginError] = useState('');
  
  // State to store JWT token (optional, can be managed in context/state management)
  const [jwt, setJwt] = useState('');

  const onSubmit = async (data) => {
    setLoginError(''); // Reset error before attempting login
    try {
      const loginRes = await fetch(`${process.env.REACT_APP_STRAPI_URL}/api/auth/local`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identifier: data.email, // `identifier` can be email or username in Strapi
          password: data.password,
        }),
      });

      const loginData = await loginRes.json();

      if (loginRes.ok) {
        // Successful login, store JWT token or redirect user
        setJwt(loginData.jwt);
        alert('Login successful!');
        console.log('Login Data:', loginData);
      } else {
        // Display login error from Strapi
        setLoginError(loginData.message[0].messages[0].message || 'Login failed');
      }
    } catch (err) {
      console.error('Login Error:', err);
      setLoginError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className='p-20'>
      <h2>Login</h2>
      <form className='flex flex-col max-space-y-4' onSubmit={handleSubmit(onSubmit)}>
        {/* Email Input */}
        <input
          type="email"
          placeholder="Email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Enter a valid email address',
            },
          })}
        />
        {errors.email && <p className='text-red-500'>{errors.email.message}</p>}

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters long',
            },
          })}
        />
        {errors.password && <p className='text-red-500'>{errors.password.message}</p>}

        {/* Error Message Display */}
        {loginError && <p className='text-red-500'>{loginError}</p>}

        {/* Submit Button */}
        <button type="submit">Login</button>
      </form>

      {/* Display JWT token after login (optional) */}
      {jwt && (
        <div className='mt-4'>
          <h3>JWT Token:</h3>
          <textarea className='w-full p-2 border' readOnly value={jwt}></textarea>
        </div>
      )}
    </div>
  );
};

export default Login;
