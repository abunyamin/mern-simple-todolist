import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { loginFailure, loginStart, loginSuccess, setError } from '../redux/userSlice';
import Head from 'next/head';
import Metadata from '@/components/Metadata';
import { FaInfo } from 'react-icons/fa';

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { currentUser, loading, error } = useSelector((state: RootState) => state.user);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorNotif, setErrorNotif] = useState('');

  // useEffect(() => {
  //   if (currentUser !== null) {
  //     router.push('/tasks');
  //   }
  // }, [currentUser, router]);

  // if (currentUser !== null) {
  //   router.push('/tasks');
  //   return;
  // }

  const handleLogin = async (e: any) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post('http://localhost:8800/api/auth/signin', { email: email, password: password }, { withCredentials: true });
      const { access_token, others } = await res.data;
      dispatch(loginSuccess(others));
      console.log('When Login data be like', others);
      localStorage.setItem('access_token', access_token);
      // setErrorNotif(res);
      console.log('respon login', res);
      router.push('/tasks');
    } catch (error) {
      dispatch(loginFailure());
    }
  };

  if (error) setTimeout(() => dispatch(setError(false)), 1000);

  return (
    <>
      <Head>
        <title>Login</title>
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
              <label htmlFor="email" className="block text-sm text-gray-800 dark:text-gray-200">
                Email
              </label>
              <input
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Email..."
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm text-gray-800 dark:text-gray-200">
                  Password
                </label>
                <a href="#" className="text-xs text-gray-600 dark:text-gray-400 hover:underline">
                  Forget Password?
                </a>
              </div>

              <input
                type="password"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Password..."
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
                onClick={handleLogin}
              >
                {loading ? 'Loading...' : 'Sign In'}
              </button>
            </div>
          </form>

          <p className="mt-8 text-xs font-light text-center text-gray-400">
            {' '}
            Dont have an account?{' '}
            <Link href="/register" className="font-medium text-gray-700 dark:text-gray-200 hover:underline">
              Create One
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
          <span className="font-semibold text-red-400 dark:text-red-300">Login Failed</span>
          <p className="text-sm text-gray-600 dark:text-gray-200">Unable to login. Please verify your email and password and try again.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
