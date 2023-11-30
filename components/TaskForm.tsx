import React, { useState, useEffect, useCallback, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { FaRegPlusSquare, FaEdit } from 'react-icons/fa';
import Loading from './Loading';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction, current } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';
import { updateTaskData, addTaskData, setTaskCurrentStatus, setUpdateByIdStatus, deleteTaskDataById, setTaskDeleteStatus } from '@/redux/taskSlice';

const TaskForm = () => {
  const router = useRouter();

  // taskId alway single string
  const taskId = Array.isArray(router.query.taskId) ? router.query.taskId[0] : router.query.taskId;
  const dispatch = useDispatch();

  const { currentTask, taskById, taskByIdStatus, addByIdStatus, updateByIdStatus, taskDeleteStatus } = useSelector((state: RootState) => state.task);

  const [title, setTitle] = useState<string>(taskById && taskId ? taskById.title : '');
  const [desc, setDesc] = useState<string>(taskById && taskId ? taskById.desc : '');
  const lastTime: string | null = taskById && taskById.dueDate?.split('T')[1].substring(0, 5);
  const lastDate: string | null = taskById && taskById.dueDate?.split('T')[0];
  const [category, setCategory] = useState<string>(taskById && taskId ? taskById.category : '');
  const [time, setTime] = useState<string | number | readonly string[] | undefined | null>(taskById && taskId ? lastTime : new Date().toISOString()?.split('T')[1].substring(0, 5));
  const [date, setDate] = useState<string | number | readonly string[] | undefined | null>(taskById && taskId ? lastDate : new Date().toISOString()?.split('T')[0]);
  const [dueDate, setDueDate] = useState<string | number | readonly string[] | undefined | null>('');

  const [priority, setPriority] = useState<boolean>(taskById && taskId ? taskById.priority : false);
  const [categoryList, setCategoryList] = useState<string[]>([]);

  const [task, setTask] = useState<any>({ title, desc, category, dueDate, priority });

  const [textInput, setTextInput] = useState('');
  // State untuk input select dan array data untuk pencarian
  const [selectInput, setSelectInput] = useState('');

  useEffect(() => {
    setDueDate(new Date(`${date}T${time}:00.000Z`).toISOString());
  }, [date, time, taskId]);

  console.log('Due date', dueDate);

  useEffect(() => {
    setTask({ title, desc, category, dueDate, priority });
  }, [title, desc, category, dueDate, priority]);

  useEffect(() => {
    taskDeleteStatus === 'succeeded' && router.push('/tasks');
  }, [taskDeleteStatus, router]);

  const deleteHandler = (taskId: string) => {
    try {
      if (taskId) {
        dispatch(setTaskDeleteStatus('loading'));
        dispatch(deleteTaskDataById(taskId) as any as AnyAction);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTextInput(event.target.value);
  };

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectInput(event.target.value);
  };

  useEffect(() => {
    let category: string[] = [];
    currentTask.map((task) => category.push(task.category));
    setCategoryList(uniqueCategory(category));
  }, [currentTask]);

  // func for filtering array to unique element
  const uniqueCategory = (category: string[]) => {
    return category.filter((item, index) => category.indexOf(item) === index);
  }

  const searchOptions = useCallback(
    (query: string) => {
      return categoryList.filter((category: string) => category.toLowerCase().includes(query.toLowerCase()));
    },
    [categoryList]
  );

  useEffect(() => {
    setCategory(textInput);
    setCategory(selectInput);
  }, [textInput, selectInput]);

  const submitHandler = (e: any) => {
    e.preventDefault();
    try {
      dispatch(setTaskCurrentStatus('loading'));
      if (taskId) {
        dispatch(setUpdateByIdStatus('loading'));
        dispatch(updateTaskData({ update: task, taskId: taskId }) as any as AnyAction);
      } else {
        dispatch(addTaskData(task) as any as AnyAction).then(() => {
          setTitle('');
          setDesc('');
          setCategory('');
          setPriority(false);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
      <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">Input Tasks</h2>

      <form>
        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
          <label className="text-gray-700 dark:text-gray-200" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            type="text"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
            autoComplete="true"
            placeholder="Title..."
            value={title}
            onChange={(e: any) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="text-gray-700 dark:text-gray-200" htmlFor="emailAddress">
            Description
          </label>
          <div>
            <textarea
              placeholder="Description..."
              className="block  mt-2 w-full  placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-4 h-32 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
              value={desc}
              onChange={(e: any) => setDesc(e.target.value)}
            ></textarea>
          </div>

          <div className="my-4">
            <label className="text-gray-700 dark:text-gray-200" htmlFor="categories">
              Categories
            </label>
            <div className="block">
              <input
                type="text"
                id="category"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                placeholder="Category..."
                autoComplete="true"
                value={category}
                onChange={handleTextChange}
              />
              <select
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                value={category}
                onChange={handleSelectChange}
              >
                <option value="">Choice...</option>
                {searchOptions(selectInput).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="Birthday" className="block text-sm text-gray-500 dark:text-gray-300">
              Date and Time
            </label>

            <input
              type="date"
              className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
              value={date ? date : ''}
              onChange={(e: any) => setDate(e.target.value)}
            />
            <input
              type="time"
              className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
              value={time ? time : ''}
              onChange={(e: any) => setTime(e.target.value)}
            />
          </div>
          <div className="my-4">
            <label htmlFor="Priority" className="block text-sm text-gray-500 dark:text-gray-300">
              Priority
            </label>

            <div className="flex items-center justify-center w-full mb-12">
              <label htmlFor="toggleB" className="flex items-center cursor-pointer">
                <div className="relative">
                  <input type="checkbox" id="toggleB" className="sr-only" checked={priority} onChange={(e) => setPriority(e.target.checked)} />

                  <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>

                  <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                </div>
              </label>
            </div>
          </div>
        </div>

        <div className={`flex gap-x-8 ${taskId ? 'justify-between' : 'justify-end'} mt-6`}>
          {taskId && (
            <button
              className="flex items-center bg-red-500 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 sm:text-base sm:px-6 dark:hover:bg-red-800 dark:text-white gap-x-3 hover:bg-red-800 rounded-md"
              onClick={(e) => {
                e.preventDefault();
                deleteHandler(taskId);
              }}
            >
              <span className="flex items-center gap-x-2">
                <RiDeleteBin5Line className="w-5 h-5 sm:w-6 sm:h-6" /> Delete
              </span>
            </button>
          )}

          <button
            type="submit"
            className="px-4 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            disabled={taskByIdStatus === 'loading' ? true : false}
            onClick={submitHandler}
          >
            <span className="flex items-center gap-x-2">
              {taskId ? (
                <>
                  <FaEdit className="w-5 h-5" /> Update
                </>
              ) : (
                <>
                  <FaRegPlusSquare className="w-5 h-5" /> Add
                </>
              )}
            </span>
          </button>
        </div>
      </form>
    </section>
  );
};

export default TaskForm;
