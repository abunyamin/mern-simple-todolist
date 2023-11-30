import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '@/redux/userSlice';
import { currentUserType } from './type';

const useCheckAuth = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = localStorage.getItem('access_token');
      const userString: string | null = localStorage.getItem('persist:root');
      const user: any = userString ? JSON.parse(userString) : null;
      const id =  user && JSON.parse(user?.user).currentUser?._id || undefined;

      if (!accessToken) {
        router.push('/login');
        return null;
      }

      try {
        const response = await axios.get('http://localhost:8800/api/auth/protected', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true, 
        });

        console.log('data protected', response.data)

        if(response.status === 200) {
          localStorage.setItem('access_token', response.data.access_token);
        }

        if(response.data.id === id) return  setIsLoading(false);

        if (response.status === 200) {
          try {
            const res = await axios.get('http://localhost:8800/api/auth/me', { withCredentials: true });
            dispatch(loginSuccess(res.data));
          } catch (error) {
            router.push('/login');
            return null;
          }
        } else {
          router.push('/login');
          return null;
        }
      } catch (error) {
        console.log(error);
        router.push('/login');
        return null;
      }finally {
        setIsLoading(false); // Set loading state to false
      }
    };

    checkAuth();
  }, [dispatch, router]);

  return isLoading;
};

export default useCheckAuth;
