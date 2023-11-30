import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import { HiOutlineMenuAlt4, HiX } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import { logout } from '@/redux/userSlice';
import { resetTasks } from '@/redux/taskSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter()

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const logoutHandle = async () => {
    axios.get(`http://localhost:8800/api/auth/signout`, { withCredentials: true })
    .then(()=> {
      router.push('/login');
      dispatch(logout());
      localStorage.removeItem('access_token');
      dispatch(resetTasks());
    })
    .catch(error => console.log(error));
  };

  return (
    <nav className="relative bg-white shadow dark:bg-gray-800">
      <div className="container px-6 py-4 mx-auto md:flex md:justify-between md:items-center">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Image className="w-auto h-6 sm:h-7" src="/logo.png" width={430} height={124} alt="Logo" />
          </Link>

          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
              aria-label="toggle menu"
            >
              {!isOpen ? <HiOutlineMenuAlt4 className="w-6 h-6" /> : <HiX className="w-6 h-6" />}
            </button>
          </div>
        </div>

        <div
          className={
            isOpen
              ? 'translate-x-0 opacity-100 '
              : 'opacity-0 -translate-x-full' +
                ` absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 md:mt-0 md:p-0 md:top-0 md:relative md:bg-transparent md:w-auto md:opacity-100 md:translate-x-0 md:flex md:items-center`
          }
        >
          <div className="flex flex-col md:flex-row md:mx-6">
            <Link className="my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0" href="/">
              Home
            </Link>
            <Link className="my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0" href="/tasks">
              List
            </Link>
            <Link className="my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0" href="#">
              Contact
            </Link>
            <Link className="my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0" href="#">
              About
            </Link>
            <button
              className="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-red-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-red-600 dark:hover:bg-red-500 dark:bg-red-600"
              onClick={logoutHandle}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
