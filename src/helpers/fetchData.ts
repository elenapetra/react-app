import { useAppDispatch } from './hooks';
import { useEffect } from 'react';
import { fetchAuthorsThunk } from 'store/authors/thunk';
import { fetchCoursesThunk } from 'store/courses/thunk';

export const useFetchAppData = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(fetchCoursesThunk());
      } catch (error) {
        console.error('Error fetching and saving courses:', error);
      }

      try {
        dispatch(fetchAuthorsThunk());
      } catch (error) {
        console.error('Error fetching and saving authors:', error);
      }
    };
    fetchData();
  }, []);
};
