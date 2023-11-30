import Hero from '@/components/home/Hero';
import Feature from '@/components/home/Feature';
import Footer from '@/components/home/Footer';
import Head from 'next/head';
import Metadata from '@/components/Metadata';

export default function Home() {
  return (
    <>
    <Head>
      <title>YaminTask - Online Task Management</title>
      <Metadata />
    </Head>
      <Hero />
      <Feature />
      <Footer />
    </>
  );
}
