import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';
import ProfileButton from './others/ProfileButton';

const Navbar = () => {
  const {auth} = useAuth();
 

  return (
    <div className='w-full flex justify-center h-12 shadow-lg shadow-slate-400 bg-gradient-to-b from-fuchsia-200 to-sky-100 fixed top-0 z-50 mb-2'>
      <div className='w-full max-width flex flex-row justify-end items-center'>
        <div className='w-[54%] 3xl:w-[30%] flex flex-row justify-between items-center'>
          {/* Logo and Text with Hover Effect */}
          <Link
            to='/'
            className='flex flex-row items-center drop-shadow-2xl group transition-transform duration-200 ease-in-out hover:scale-105'
          >
            <div className='flex flex-row items-center space-x-1'>
              <img src='/images/logo.png' height={30} width={40} alt='Logo' />
              <span className='font-barlow text-blue-900 font-normal '>
                Read<span className='font-semibold '>Insights</span>
              </span>
            </div>
          </Link>

          {/* Login and Register Links */}
          {
            auth?.jwt? 
            //   <div className='mr-16 flex flex-row space-x-2 text-slate-900 font-montserrat text-[12px]'>
            //   <Link to='/dashboard' className='hover:cursor-pointer hover:font-semibold'>
            //     Dashboard
            //   </Link>
            //   <span>|</span>
            //   <button onClick={()=>handleLogout()} className='hover:cursor-pointer hover:font-semibold'>
            //     Logout
            //   </button>
            // </div> 
            <div className='flex flex-row  items-center'>
              <span className='text-[12px] font-montserrat'> {auth.user.authorName}</span>
              <span className='ml-2 pb-1 text-gray-600'>|</span>
             
                       <ProfileButton/>
            </div>
           
             :

            <div className='mr-16 flex flex-row space-x-2 text-slate-900 font-montserrat text-[12px]'>
            <Link to='/login' className='hover:cursor-pointer hover:font-semibold'>
              Login
            </Link>
            <span>|</span>
            <Link to='/register' className='hover:cursor-pointer hover:font-semibold'>
              Register
            </Link>
            </div>
          }
         
        </div>
      </div>
    </div>
  );
};

export default Navbar;
