import React, { ReactNode, useEffect } from 'react';
import Navbar from './Navbar';
import Breadcrumb from './Breadcrumb';
import Head from 'next/head';
import Metadata from './Metadata';
import useCheckAuth from '../utils/authUtils';
import Loading from './Loading';

interface layoutType {
  children: ReactNode;
}

const Layout = ({ children }: layoutType) => {
  const isLoading = useCheckAuth();

  if (isLoading) {
    return (
      <>
      <Head>
        <Metadata />
      </Head>
        <section className="h-screen w-screen flex items-center justify-center">
          <Loading />
        </section>
      </>
    );
  }

  return (
    <>
      <Head>
        <Metadata />
      </Head>
      <section className="p-x-50">
        <Navbar />
        {/* <Breadcrumb /> */}
        {children}
      </section>
    </>
  );
};

export default Layout;
