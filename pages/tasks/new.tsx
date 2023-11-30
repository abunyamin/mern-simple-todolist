import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import TaskForm from '@/components/TaskForm';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Notif from '@/components/Notif';
import Head from 'next/head';

const NewTask = () => {
 
  const [notif, setNotif] = useState<boolean>(false);
  const addByIdStatus = useSelector((state: RootState) => state.task.addByIdStatus);
  const [text, setText] = useState<string>('');
  
  useEffect(() => {
    if (addByIdStatus === 'succeeded') {
      setNotif(true);
      setText('The task has been saved successfully.');
    } else if (addByIdStatus === 'failed') {
      setNotif(true);
      setText('Unable to save the task.');
    }
  }, [addByIdStatus]);

  if (notif) setTimeout(() => setNotif(false), 1000);

  return (<>
    <Head>
    <title>New Task</title>
  </Head>
    <Layout>
      {notif && <Notif type={addByIdStatus} text={text} />}
      <div className="h-full flex flex-col justify-center items-center py-8 md:py-18">
        <h1 className="text-4xl mb-8">NEW TASK</h1>
        <TaskForm />
      </div>
    </Layout>
    </>
  );
};

export default NewTask;
