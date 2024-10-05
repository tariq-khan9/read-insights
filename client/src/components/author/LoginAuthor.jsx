import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import {useAuth} from './../../services/AuthContext'

const LoginAuthor = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loginMessage, setLoginMessage] = useState('');
  const { handleLogin } = useAuth(); // Get handleLogin from the context


  const onSubmit = async (data) => {

    try {
      const loginRes = await fetch(`${process.env.REACT_APP_STRAPI_URL}/api/auth/local`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identifier: data.authorEmail, // `identifier` can be email or username in Strapi
          password: data.authorPassword,
        }),
      });

      const loginData = await loginRes.json();

      if (loginRes.ok) {
        handleLogin(loginData);
        setLoginMessage('Author logged successfully!');
        console.log('Login Data:', loginData);
      } else {
        setLoginMessage('Author Email or Password incorrect!');
      }
    } catch (err) {
      console.error('Login Error:', err);
 
    }
  };

  useEffect(() => {
    if (loginMessage) {
      const timer = setTimeout(() => {
        setLoginMessage('');
      }, 5000);
      return () => clearTimeout(timer); // Clean up the timer on component unmount
    }
  }, [loginMessage]);



  return (
    <div className='min-h-screen flex items-center justify-center top-12'>
      <form className='shadow-2xl shadow-slate-900 flex flex-col bg-white rounded-lg p-2' onSubmit={handleSubmit(onSubmit)}>
        <div className='border flex flex-row border-blue-800 w-full  rounded-lg'>
          <div className='px-6 pr-8'>
          <h1 className='form-heading mt-4 mb-8'>Author login</h1>
          <div className='form  flex flex-row'>
            <div className='flex flex-col w-full'>
            

              {/* Author Email */}
              <div className='w-full'>
                <input
                  className='form-input'
                  type="email"
                  placeholder="Author Email"
                  {...register('authorEmail', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: 'Enter a valid email',
                    },
                  })}
                />
                <div className='form-error'>
                  {errors.authorEmail && <p>{errors.authorEmail.message}</p>}
                </div>
              </div>

              {/* Password */}
              <div className='w-full'>
                <input
                  className='form-input'
                  type="password"
                  placeholder="Password"
                  {...register('authorPassword', {
                    required: 'Password is required',
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
                      message: 'Password must have at least 8 characters, one uppercase letter, one lowercase letter, and a number',
                    },
                  })}
                />
                <div className='form-error'>
                  {errors.authorPassword && <p>{errors.authorPassword.message}</p>}
                </div>
              </div>


              <button className='form-btn mt-8' type="submit">Login</button>

                   {/* Message Display */}
                <div className='flex w-full justify-center min-h-8 mt-6'>
                  {loginMessage && (
                    <p className={`form-${loginMessage.includes('successfully') ? 'success' : 'error'}`}>
                      {loginMessage}
                    </p>
                  )}
                </div>
            </div>

           

          
          </div>
          </div>
          

          <div className='rounded-lg'>
              <img src='/images/author.jpg' alt='image' className='h-[350px] w-[350px] rounded-r-lg'/>
         </div>

      

   
        </div>

      
      </form>
    </div>
  );
};

export default LoginAuthor;
