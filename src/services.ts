import { Dispatch } from 'redux';
import { addCourseAction } from 'store/courses/actions';
import { addAuthorAction } from 'store/authors/actions';

const fetchCourses = async () => {
  try {
    const response = await fetch(`http://localhost:4000/courses/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch courses');
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};

export const fetchAndAddCourses = async (dispatch: Dispatch) => {
  try {
    const coursesResponse = await fetchCourses();
    dispatch(addCourseAction(coursesResponse.result));
  } catch (error) {
    console.error('Error fetching and saving courses:', error);
  }
};

const fetchAuthors = async () => {
  try {
    const response = await fetch(`http://localhost:4000/authors/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch courses');
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};

export const fetchAndAddAuthors = async (dispatch: Dispatch) => {
  try {
    const authorsResponse = await fetchAuthors();
    dispatch(addAuthorAction(authorsResponse.result));
  } catch (error) {
    console.error('Error fetching and saving courses:', error);
  }
};
export { fetchCourses, fetchAuthors };
