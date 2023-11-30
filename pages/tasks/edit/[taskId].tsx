import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import TaskForm from '@/components/TaskForm';
import Notif from '@/components/Notif';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTaskDataById } from '@/redux/taskSlice';
import { RootState } from '@/redux/store';
import { AnyAction } from '@reduxjs/toolkit';
import Head from 'next/head';
import Loading from '@/components/Loading';

const EditById = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const taskId = router.query?.taskId;
  const {taskByIdStatus, updateByIdStatus} = useSelector((state: RootState) => state.task);
  const [notif, setNotif] = useState<boolean>(false);
  const [text, setText] = useState<string>('');

  useEffect(() => {
    if (taskId) {
      dispatch(fetchTaskDataById(taskId) as any as AnyAction);
    }
  }, [dispatch, taskId]);

  useEffect(() => {
    if (updateByIdStatus === 'succeeded') {
      setNotif(true);
      setText('The task has been updated successfully.');
    } else if (updateByIdStatus === 'failed') {
      setNotif(true);
      setText('Unable to update the task.');
    }
  }, [updateByIdStatus]);

  useEffect(() => {
    setTimeout(() => setNotif(false), 1000);
  }, [notif]);

  if (taskByIdStatus === 'loading' && !taskId) {
    return (
      <Layout>
        <div className='min-h-screen max-h-screen w-full flex justify-center items-center'>
          <Loading />
        </div>
      </Layout>
    );
  }

  return (
    <>
      <Head>
        <title>Edit Task</title>
      </Head>
      <Layout>
        {notif && <Notif type={updateByIdStatus} text={text} />}
        <div className="h-full flex flex-col justify-center items-center py-8 md:py-18">
          <h1 className="text-4xl mb-8">EDIT TASK</h1>
          <TaskForm />
        </div>
      </Layout>
    </>
  );
};

export default EditById;
