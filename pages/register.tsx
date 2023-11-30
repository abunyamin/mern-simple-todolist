import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/router';
import { loginFailure, loginStart, setError } from '../redux/userSlice';
import Metadata from '@/components/Metadata';
import { FaInfo } from 'react-icons/fa';

const Register = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { currentUser, loading, error } = useSelector((state: RootState) => state.user);

  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  useEffect(() => {
    if (currentUser !== null) {
      router.push('/tasks');
    }
  }, [currentUser, router]);

  if (currentUser !== null) {
    router.push('/tasks');
    return;
  }

  const handleRegister = async (e: any) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post('http://localhost:8800/api/auth/signup', { name: username, email: email, password: password }, { withCredentials: true });
      console.log(res.data);
      router.push('/login');
    } catch (err) {
      dispatch(loginFailure());
      console.log('ini error', error);
    }
  };

  if (error) setTimeout(() => dispatch(setError(false)), 3000);

  return (
    <>
      <Head>
        <title>Register</title>
        <Metadata />
      </Head>
      <div className="w-full h-screen flex-col p-6 bg-white flex justify-center items-center">
        {error && <ErrorNotif />}
        <div className="w-full max-w-sm p-6 m-auto mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
          <div className="flex justify-center mx-auto">
            <Image src="/logo.png" width={500} height={500} alt="logo" className="w-auto h-7 sm:h-8" />
          </div>

          <form className="mt-6">
            <div>
              <label htmlFor="name" className="block text-sm text-gray-800 dark:text-gray-200">
                Username
              </label>
              <input
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                autoComplete="true"
                placeholder="Username..."
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="username" className="block text-sm text-gray-800 dark:text-gray-200">
                Email
              </label>
              <input
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                autoComplete="true"
                placeholder="Email..."
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm text-gray-800 dark:text-gray-200">
                  Password
                </label>
              </div>

              <input
                type="password"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="********"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
                onClick={handleRegister}
              >
                {loading ? 'Loading...' : 'Sign Up'}
              </button>
            </div>
          </form>

          <p className="mt-8 text-xs font-light text-center text-gray-400">
            {' '}
            Have an account?{' '}
            <Link href="/login" className="font-medium text-gray-700 dark:text-gray-200 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

const ErrorNotif = () => {
  return (
    <div className="flex w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
      <div className="flex items-center justify-center w-12 bg-red-400">
        <FaInfo className="w-6 h-6 text-white fill-current" />
      </div>

      <div className="px-4 py-2 -mx-3">
        <div className="mx-3">
          <span className="font-semibold text-red-400 dark:text-red-300">Registration Failed</span>
          <p className="text-sm text-gray-600 dark:text-gray-200">Failed to register. Please make sure you have provided valid information and try again.</p>
        </div>
      </div>
    </div>
  );
};

export default Register;
