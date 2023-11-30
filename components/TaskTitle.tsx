import React from 'react';
import { HiOutlineX, HiOutlineCheck } from 'react-icons/hi';
import { FaStar } from 'react-icons/fa';
import Link from 'next/link';

type TaskTitleType = {
  task: TaskType;
  handleComplete: (id: string, checked: boolean)=> void;
}

type TaskType = {
  _id: string;
  title: string;
  priority: boolean;
  dueDate: string;
  completed: boolean;
}

const TaskTitle = ({task, handleComplete}: TaskTitleType) => {
  return (
    <tr>
      <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
        <div className="inline-flex items-center gap-x-3">
          <input
            type="checkbox"
            checked={task.completed}
            className="text-blue-500 h-6 w-6 cursor-pointer border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700"
            onChange={(e: any) => handleComplete(task._id, e.target.checked)}
          />
          <Link href={`/tasks/${task._id}`}>
            <span className="flex gap-x-2 items-center">
              {task.title} {task.priority && <FaStar className="text-yellow-500" />}
            </span>
            <span className="py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{task.dueDate?.split('T')[0]}</span>
            <span className="text-lg text-gray-500 dark:text-gray-300"> - </span>
            <span className="py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{task.dueDate?.split('T')[1].split('.')[0]}</span>
          </Link>
        </div>
      </td>

      <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
        {task.completed ? (
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
  );
};

export default TaskTitle;
