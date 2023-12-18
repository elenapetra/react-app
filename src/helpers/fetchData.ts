import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchCourses, fetchAuthors } from 'services';
import { storeAuthorAction } from 'store/authors/actions';
import { storeCourseAction } from 'store/courses/actions';

export const useFetchAppData = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const authorsResponse = await fetchAuthors();
        dispatch(storeAuthorAction(authorsResponse.result));
      } catch (error) {
        console.error('Error fetching and saving authors:', error);
      }

      try {
        const coursesResponse = await fetchCourses();
        dispatch(storeCourseAction(coursesResponse.result));
      } catch (error) {
        console.error('Error fetching and saving courses:', error);
      }
    };
    fetchData();
  }, []);
};
