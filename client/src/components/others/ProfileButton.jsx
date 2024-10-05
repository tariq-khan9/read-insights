import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RiArrowDropDownLine } from "react-icons/ri";
import { BsFilePostFill } from "react-icons/bs";
import { MdOutlinePostAdd } from "react-icons/md";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useAuth } from '../../services/AuthContext';

const ProfileButton = () => {
  const {auth, handleLogout}= useAuth();
  const authorId = auth?.user.documentId || null;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown and perform logout
  // const handleLogout = () => {
  //   setIsDropdownOpen(false);
  //   console.log('Logout clicked!');
  //   // Add your actual logout logic here
  // };

  return (
    <div className='relative flex flex-col items-center' ref={dropdownRef}>
      {/* Profile Button */}
      <button
        onClick={toggleDropdown}
        className='text-gray-700 pr-8 py-2 rounded-md'>
        <RiArrowDropDownLine className='text-[30px] text-gray-600' />
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className='absolute right-8 top-8 mt-2 w-48 rounded-md shadow-lg bg-slate-50 ring-1 ring-black ring-opacity-5 font-montserrat text-[14px]'>
          <div className='py-2'>
            {/* My Posts Link */}
            <Link
              to={`/my-posts/${authorId}`}
              className='flex flex-row items-center px-4 py-2 text-sky-900 hover:bg-fuchsia-200 hover:text-black'
              onClick={() => setIsDropdownOpen(false)} // Close dropdown on click
            >
              <BsFilePostFill className='mr-3 text-[16px] text-sky-800' /> My Posts
            </Link>

            {/* Create Post Link */}
            <Link
              to='/post/create'
              className='flex flex-row items-center px-4 py-2 text-sky-900 hover:bg-fuchsia-200 hover:text-black'
              onClick={() => setIsDropdownOpen(false)} // Close dropdown on click
            >
              <MdOutlinePostAdd className='mr-2 text-[20px] text-sky-800' /> Create Post
            </Link>

            {/* Logout Button */}
            <div className='hover:bg-fuchsia-200'>
              <button
                onClick={handleLogout}
                className='flex flex-row items-center px-4 py-2 text-sky-900 hover:text-black'>
                <RiLogoutBoxRLine className='mr-2 text-[18px] text-sky-800' /> Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileButton;
