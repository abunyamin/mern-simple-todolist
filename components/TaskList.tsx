import React, { useEffect, useState } from 'react';
import { currentTaskType } from '@/utils/type';

import TaskTitle from './TaskTitle'

// Redux
import { useDispatch } from 'react-redux';
import { updateTaskData } from '@/redux/taskSlice';
import { AnyAction } from '@reduxjs/toolkit';

interface TaskListType {
  taskList: currentTaskType[];
}

const TaskList = ({ taskList }: TaskListType) => {
  const dispatch = useDispatch();

  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [taskId, setTaskId] = useState<string>('');

  // trigger and updating task when taskid and checked not equal
  useEffect(() => {
    if (taskId !== '' && isChecked !== !isChecked) {
      dispatch(updateTaskData({ update: { _id: taskId, completed: isChecked }, taskId: taskId }) as any as AnyAction);
    }
  }, [isChecked, taskId, dispatch]);

  // complete handling for click checkbox
  const handleComplete = (id: string, checked: boolean) => {
    setTaskId(id);
    setIsChecked(checked);
  };

  return (
    <section className="container px-4 mx-auto my-10">
      <div className="flex flex-col">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      Title
                    </th>

                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                  {taskList?.map((task, index) => (
                    <TaskTitle task={task} handleComplete={handleComplete} key={index} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TaskList;
