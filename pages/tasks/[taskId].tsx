import React, { useEffect } from 'react';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import { FaStar, FaEdit } from 'react-icons/fa';
import { HiOutlineX, HiOutlineCheck } from 'react-icons/hi';
import Head from 'next/head';
import Loading from '@/components/Loading';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';
import { fetchTaskDataById } from '@/redux/taskSlice';

const TaskById = () => {

  const router = useRouter();
  // taskId alway single string
  const taskId = Array.isArray(router.query.taskId) ? router.query.taskId[0] : router.query.taskId;
  const dispatch = useDispatch();
  const {taskById, taskByIdStatus} = useSelector((state: RootState) => state.task);

  useEffect(() => {
    if (taskId) {
      dispatch(fetchTaskDataById(taskId) as any as AnyAction);
    }
  }, [dispatch, taskId, router]);

  useEffect(() => {
    if(taskByIdStatus === 'succeeded' || taskByIdStatus === 'failed'){
    if (!taskById) {
      router.push('/404');
    }
  }
  }, [taskById, router, taskByIdStatus]);

  if (taskByIdStatus === 'loading') {
    return (
      <Layout>
        <div className='min-h-screen max-h-screen w-full flex justify-center items-center'>
          <Loading />
        </div>
      </Layout>
    );
  }

  const { title, desc, dueDate, category, priority, completed } = taskById ?? {};

  if (!taskById) {
    return null;
  }

  return (<>
  <Head>
    <title>{title}</title>
  </Head>
    <Layout>
      <section className="container px-4 mx-auto my-10">
        <h2 className="text-lg font-medium text-gray-800 dark:text-white lg:text-center">Details</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-300 lg:text-center">Additional details and content of the task can be displayed here.</p>
        {/* Task */}
        <div className="flex flex-col mt-6 w-full items-center">
          <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
            <div className="inline-block max-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className="max-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        Property
                      </th>

                      <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        Value
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                    <tr>
                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                        <div>
                          <h2 className="font-medium text-gray-800 dark:text-white ">Title</h2>
                        </div>
                      </td>
                      <td className="px-12 py-4 text-sm font-medium">{title}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                        <div>
                          <h2 className="font-medium text-gray-800 dark:text-white ">Date</h2>
                        </div>
                      </td>
                      <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">{dueDate?.split('T')[0]}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                        <div>
                          <h2 className="font-medium text-gray-800 dark:text-white ">Time</h2>
                        </div>
                      </td>
                      <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">{dueDate?.split('T')[1].split('.')[0]}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                        <div>
                          <h2 className="font-medium text-gray-800 dark:text-white ">Category</h2>
                        </div>
                      </td>
                      <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">{category}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                        <div>
                          <h2 className="font-medium text-gray-800 dark:text-white ">Status</h2>
                        </div>
                      </td>
                      <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
                        {completed ? (
                            <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 dark:bg-gray-800">
                            <HiOutlineCheck />
 
                            <h2 className="text-sm font-normal">completed</h2>
                          </div>
                        ) : (
                          <div className="inline-flex items-center px-3 py-1 text-red-500 rounded-full gap-x-2 bg-red-100/60 dark:bg-gray-800">
                            <HiOutlineX />

                            <h2 className="text-sm font-normal">incomplete</h2>
                          </div>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                        <div>
                          <h2 className="font-medium text-gray-800 dark:text-white ">Priority</h2>
                        </div>
                      </td>
                      <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
                        {priority ? (
                          <span className="flex gap-x-1 items-center">
                            <FaStar className="text-yellow-500" /> Yes
                          </span>
                        ) : (
                          <span className="flex gap-x-1 items-center">
                            <FaStar className="text-black-500" /> No
                          </span>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 text-sm font-medium">
                        <div>
                          <h2 className="font-medium text-gray-800 dark:text-white ">Action</h2>
                        </div>
                      </td>
                      <td className="px-12 py-4 text-sm font-medium flex gap-x-3">
                        <button
                          className="flex items-center justify-center px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600"
                          onClick={() => router.push(`/tasks/edit/${taskId}`)}
                        >
                          <FaEdit className="h-5 w-5" />

                          <span>Edit</span>
                        </button>
                        
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 text-sm font-medium">
                        <div>
                          <h2 className="font-medium text-gray-800 dark:text-white ">Description</h2>
                        </div>
                      </td>
                      <td className="px-12 py-4 text-sm font-medium">{desc}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* End Task */}
      </section>
    </Layout>
  </>);
};

export default TaskById;
