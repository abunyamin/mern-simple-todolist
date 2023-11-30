import React, { useEffect } from 'react';
import Head from 'next/head';
import Layout from '@/components/Layout';
import LayoutTaskList from '@/components/LayoutTaskList';

// Redux
import { AnyAction } from '@reduxjs/toolkit';
import { useDispatch, useSelector, batch } from 'react-redux';
import { RootState } from '@/redux/store';
import { fetchTasksData, setTaskById, tasksUpdated, setTaskByIdStatus, setAddByIdStatus, setUpdateByIdStatus, setTaskDeleteStatus } from '@/redux/taskSlice';

const Tasks = () => {
  const dispatch = useDispatch();

  const { currentTask, taskCurrentStatus } = useSelector((state: RootState) => state.task);
  const updatedById = useSelector((state: RootState) => state.task.taskById);

  // fetching task list from API if authentication and task list is 0
  useEffect(() => {
    dispatch(fetchTasksData() as any as AnyAction);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  // updating currentTasks state with new Task value
  useEffect(() => {
    if (updatedById) {
      const newTasks = currentTask.map((task) => {
        if (task._id === updatedById._id) {
          return { ...task, ...updatedById };
        }
        return task;
      });

      dispatch(tasksUpdated(newTasks));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, updatedById]);

  //reset status after updated
  useEffect(() => {
    batch(() => {
      dispatch(setTaskByIdStatus(''));
      dispatch(setTaskDeleteStatus(''));
      dispatch(setUpdateByIdStatus(''));
      dispatch(setAddByIdStatus(''));
      dispatch(setTaskById(null));
    });
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>Task List</title>
      </Head>
      <Layout>
        <LayoutTaskList taskList={currentTask} taskDataStatus={taskCurrentStatus} />
      </Layout>
    </>
  );
};

export default Tasks;
