import React, { useEffect, useState, MouseEventHandler } from 'react';
import TaskList from './TaskList';
import { useRouter } from 'next/router';
import { FaRegPlusSquare, FaSearch } from 'react-icons/fa';
import { HiOutlineArrowNarrowLeft, HiOutlineArrowNarrowRight, HiRefresh } from 'react-icons/hi';
import { currentTaskType } from '@/utils/type';
import Loading from './Loading';

import { RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasksData } from '@/redux/taskSlice';
import { AnyAction } from '@reduxjs/toolkit';

interface LayoutTaskListType {
  taskList: currentTaskType[];
  taskDataStatus: string;
}

const LayoutTaskList = ({ taskList, taskDataStatus }: LayoutTaskListType) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [filteredTaskList, setFilteredTaskList] = useState<currentTaskType[]>(taskList || []);
  const [taskListFinall, setTaskListFinall] = useState<currentTaskType[]>(taskList || []);
  const [tabActive, setTabActive] = useState<number | undefined>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [countPage, setCountPage] = useState<number>(Math.ceil(taskListFinall?.length / 10) || 1);
  const [keyword, setKeyword] = useState<string>('');

  const updatedById = useSelector((state: RootState) => state.task.taskById);

  // Trigger result filterTasks from TaskList for the first load
  useEffect(()=> {
    filterTasks(taskList, 'all', 0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[taskList]);
  
  // updating currentTasks state with new Task value
  useEffect(() => {
    if (updatedById) {
      const newTasks = filteredTaskList.map((task) => {
          if (task._id === updatedById._id) {
            return { ...task, ...updatedById };
          }
          return task;
        });
  
        setFilteredTaskList(newTasks);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, updatedById]);
    
    useEffect(() => {
    pageHandle(taskListFinall, currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);
  
  // href link handle
  const newTaskHandle: MouseEventHandler<HTMLButtonElement> = () => {
    router.push('/tasks/new');
  };


  const pageHandle = (data: currentTaskType[], page: number) => {
    const pageSize: number = 10;
    const startIndex: number = Math.ceil((page - 1) * pageSize);
    const endIndex: number = page * pageSize;

    setFilteredTaskList(data?.slice(startIndex, endIndex));

    console.log(`PAGINATION ${currentPage} :`, filteredTaskList);
  };
    
  // filtering task list by status
  const filterTasks = (Tasks: currentTaskType[], status?: string, index?: number) => {
    let taskList = Tasks;
    setCurrentPage(1);

    if (status === 'all') {
      setTaskListFinall(taskList);
      setCountPage(Math.ceil(taskList?.length / 10));
      pageHandle(taskList, currentPage);
    } else if (status == 'completed') {
      taskList = taskList?.filter((item) => item.completed);
      setCountPage(Math.ceil(taskList?.length / 10));
      setTaskListFinall(taskList);
      pageHandle(taskList, currentPage);
    } else if (status == 'incomplete') {
      taskList = taskList?.filter((item) => !item.completed);
      setCountPage(Math.ceil(taskList?.length / 10));
      setTaskListFinall(taskList);
      pageHandle(taskList, currentPage);
    } else if (status == 'priority') {
      taskList = taskList?.filter((item) => item.priority);
      setCountPage(Math.ceil(taskList?.length / 10));
      setTaskListFinall(taskList);
      pageHandle(taskList, currentPage);
    }

    setTabActive(index);
  };

  const searchHandle = (e: any) => {
    setKeyword(e.target.value);

    const lowerKeyword = keyword.toLowerCase();

    const searchResult = taskList?.filter((task) => task.title.toLowerCase().includes(lowerKeyword));

    if(searchResult){
    setFilteredTaskList(searchResult);
  }else if(lowerKeyword === ''){
    setFilteredTaskList(taskList);
  }
  }

  return (
    <section className="container px-4 mx-auto my-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-x-3">
            <h2 className="text-lg font-medium text-gray-800 dark:text-white">Your Daily Tasks, Organized</h2>

            <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">{taskList?.length} Tasks</span>
          </div>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
            Say goodbye to cluttered to-do lists and hello to organized tasks with Todolist.
          </p>
        </div>
        <div className="flex items-center mt-4 gap-x-3">
          <button className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700" onClick={()=> dispatch(fetchTasksData() as any as AnyAction)}>
            <HiRefresh className='h-5 w-5'/>
            <span>Refresh</span>
          </button>

          <button
            className="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600"
            onClick={newTaskHandle}
          >
            <FaRegPlusSquare className='h-5 w-5'/>

            <span>Add Taks</span>
          </button>
        </div>
      </div>
      <div className="mt-6 md:flex md:items-center md:justify-between overflow-x-auto">
        <div className="inline-flex overflow-hidden bg-white border divide-x rounded-lg dark:bg-gray-900 rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700">
          <button
            className={`tab px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:bg-gray-800 dark:text-gray-300 ${tabActive == 0 && 'bg-gray-100'}`}
            data-tab="all"
            onClick={() => {
              filterTasks(taskList, 'all', 0);
            }}
          >
            All
          </button>

          <button
            className={`tab px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100 ${tabActive == 1 && 'bg-gray-100'}`}
            data-tab="completed"
            onClick={() => {
              filterTasks(taskList, 'completed', 1);
            }}
          >
            Completed
          </button>

          <button
            className={`tab px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100 ${tabActive == 2 && 'bg-gray-100'}`}
            data-tab="incomplete"
            onClick={() => {
              filterTasks(taskList, 'incomplete', 2);
            }}
          >
            Incomplete
          </button>

          <button
            className={`tab px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100 ${tabActive == 2 && 'bg-gray-100'}`}
            data-tab="incomplete"
            onClick={() => {
              filterTasks(taskList, 'priority', 3);
            }}
          >
            Priority
          </button>
        </div>

        <div className="relative flex items-center mt-4 md:mt-0">
          <span className="absolute">
            <FaSearch className="w-5 h-5 mx-3 text-gray-400 dark:text-gray-600" />
          </span>

          <input
            type="text"
            placeholder="Search"
            className="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            onChange={searchHandle}
          />
        </div>
      </div>
      {taskDataStatus === 'loading' ? (<div className='min-h-[50vh] w-full flex justify-center items-center'>
          <Loading />
        </div>) : filteredTaskList?.length == 0 ? <TaskNotFound /> : <TaskList taskList={filteredTaskList} />}

      <div className="mt-6 sm:flex sm:items-center sm:justify-between ">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Page{' '}
          <span className="font-medium text-gray-700 dark:text-gray-100">
            {currentPage} of {countPage}
          </span>
        </div>

        <div className="flex items-center mt-4 gap-x-4 sm:mt-0">
          <button
            className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
            onClick={() => setCurrentPage(currentPage === 1 ? currentPage : currentPage - 1)}
          >
            <HiOutlineArrowNarrowLeft className="w-5 h-5 rtl:-scale-x-100" />

            <span>previous</span>
          </button>

          <button
            className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
            onClick={() => setCurrentPage(currentPage === countPage ? currentPage : currentPage + 1)}
          >
            <span>Next</span>
            <HiOutlineArrowNarrowRight className="w-5 h-5 rtl:-scale-x-100" />
          </button>
        </div>
      </div>
    </section>
  );
};

const TaskNotFound = () => {
  return (
    <div className="flex items-center mt-6 text-center border rounded-lg h-96 dark:border-gray-700">
      <div className="flex flex-col w-full max-w-sm px-4 mx-auto">
        <div className="p-3 mx-auto text-blue-500 bg-blue-100 rounded-full dark:bg-gray-800">
          <FaSearch className="w-6 h-6" />
        </div>
        <h1 className="mt-3 text-lg text-gray-800 dark:text-white">No tasks found</h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">The task is empty. Please create new task.</p>
      </div>
    </div>
  );
};

export default LayoutTaskList;
