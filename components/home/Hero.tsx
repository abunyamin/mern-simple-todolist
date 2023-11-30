import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const Hero = () => {
  const router = useRouter();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  return (
    <header className="bg-gray-900 pattern">
      <div className="container px-6 mx-auto">
        <nav className="flex flex-col py-6 sm:flex-row sm:justify-between sm:items-center">
          <Link href="#">
            <Image className="w-auto h-6 sm:h-7" src="/logo.png" alt="Logo" width={500} height={500} />
          </Link>

          <div className="flex items-center mt-2 -mx-2 sm:mt-0">
            {currentUser === null ? (
              <>
                <Link href="/login" className="px-3 py-1 text-sm font-semibold text-white transition-colors duration-300 transform border-2 rounded-md hover:bg-gray-700">
                  Sign In
                </Link>
                <Link href="/register" className="px-3 py-2 mx-2 text-sm font-semibold text-white transition-colors duration-300 transform bg-black rounded-md hover:bg-gray-800">
                  Sign Up
                </Link>
              </>
            ) : (
              <Link href="/tasks" className="px-3 py-1 text-sm font-semibold text-white transition-colors duration-300 transform border-2 rounded-md hover:bg-gray-700">
                Dashboard
              </Link>
            )}
          </div>
        </nav>

        <div className="flex flex-col items-center py-6 lg:h-[36rem] lg:flex-row">
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-semibold text-gray-100 lg:text-4xl">YaminTask</h2>

            <h3 className="mt-2 text-2xl font-semibold text-gray-100">
              Hello <span className="text-blue-400">Guest</span>
            </h3>

            <p className="mt-4 text-gray-100">
              Never miss a deadline or important appointment again with Todolist. Our powerful yet simple app makes it easy to manage your tasks and stay on top of your schedule. Whether you&apos;re a busy professional, a student, or just
              looking for a way to keep track of your daily tasks, Todolist has everything you need to stay organized.
            </p>
            <div className="mt-4">
              {currentUser !== null ? (
                <button className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80" onClick={()=> router.push('/tasks')}>
                  View Task List
                </button>
              ) : (
                <button className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80" onClick={()=> router.push('/login')}>
                  Login
                </button>
              )}
            </div>
          </div>

          <div className="flex mt-8 lg:w-1/2 lg:justify-end lg:mt-0">
            {/* <div className="w-full max-w-md bg-white rounded-lg dark:bg-gray-800">
              <div className="px-6 py-8 text-center">
                <h2 className="text-2xl font-semibold text-gray-700 dark:text-white fo">Sign In</h2>

                <form action="#">
                  <div className="mt-4">
                    <input
                      className="block w-full px-4 py-2 text-gray-700 placeholder-gray-400 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-500 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:ring-blue-300 focus:outline-none focus:ring"
                      type="email"
                      placeholder="Email address"
                      aria-label="Email address"
                    />
                    <input
                      className="block w-full px-4 py-2 mt-4 text-gray-700 placeholder-gray-400 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-500 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:ring-blue-300 focus:outline-none focus:ring"
                      type="password"
                      placeholder="Password"
                      aria-label="Password"
                    />
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <Link href="#" className="text-sm text-gray-600 dark:text-gray-200 hover:underline">
                      Forget Password?
                    </Link>

                    <button className="px-6 py-2 font-medium text-white transition-colors duration-300 transform bg-gray-900 rounded-md hover:bg-gray-800 dark:hover:bg-gray-700 focus:outline-none focus:bg-gray-800 dark:focus:bg-gray-700">
                      Sign In
                    </button>
                  </div>
                </form>
              </div>
            </div> */}
            <Image src="/hero.png" width={400} height={400} alt="hero" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;
