import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaRegListAlt, FaRegFile, FaRegEdit, FaRegWindowClose } from 'react-icons/fa';
import { MdKeyboardArrowRight } from 'react-icons/md'
import { AiFillHome } from 'react-icons/ai'

const Breadcrumb = () => {
  const pathname = usePathname();

  const [pathArray, setPathArray] = useState<any>('')

  useEffect(()=> {
    setPathArray(pathname?.split('/').filter((item) => item !== ''));
  },[pathname])

  const getIconFromTitle = (title: string) => {
    switch (title) {
      case 'tasks':
        return <FaRegListAlt className="w-6 h-6 mx-2" />;
        break;
      case 'new':
        return <FaRegFile className="w-6 h-6 mx-2" />;
        break;
      case 'edit':
        return <FaRegEdit className="w-6 h-6 mx-2" />;
        break;
      default:
        return <FaRegWindowClose />;
    }
  };



  return (
    <div className="bg-gray-200 dark:bg-gray-800">
      <div className="container flex items-center px-6 py-4 mx-auto overflow-x-auto whitespace-nowrap">
        <Link href="/" className="text-gray-600 dark:text-gray-200">
          <AiFillHome className="w-5 h-5" />
        </Link>

        {pathArray.map((item: string, index: number) => {
          const href = `/${pathArray?.slice(0, index + 1).join('/')}`;
          const isLastItem = pathArray.length - 1;
          
          return (
            <React.Fragment key={index}>
              <span className="mx-5 text-gray-500 dark:text-gray-300 rtl:-scale-x-100">
              <MdKeyboardArrowRight className='w-5 h-5' />
              </span>

              <Link href={isLastItem == index ? '#' : href} className={`flex items-center ${isLastItem == index ? 'text-blue-600' : 'text-gray-600'} -px-2 dark:text-gray-200 hover:underline`}>
                {getIconFromTitle(item)}
                <span className="mx-2">{item}</span>
              </Link>
              </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Breadcrumb;
