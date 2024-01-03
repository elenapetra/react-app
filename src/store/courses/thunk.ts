import {
  storeCourseAction,
  deleteCourseAction,
  addCourseAction,
  updateCourseAction,
} from 'store/courses/actions';
import {
  fetchCourses,
  deleteCourseRequest,
  addCourseRequest,
  updateCourseRequest,
} from 'services';
import { AppDispatch } from 'store';
import { CourseType } from './types';

const fetchCoursesThunk = () => async (dispatch: AppDispatch) => {
  try {
    const courseData = await fetchCourses();
    dispatch(storeCourseAction(courseData));
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};

const deleteCourseThunk =
  (courseId: string) => async (dispatch: AppDispatch) => {
    try {
      await deleteCourseRequest(courseId);
      dispatch(deleteCourseAction(courseId));
    } catch (error) {
      console.error('Error in deleteCourseThunk:', error);
    }
  };

const addCourseThunk =
  (newCourseData: CourseType) => async (dispatch: AppDispatch) => {
    try {
      const addedCourse: CourseType = await addCourseRequest(newCourseData);

      dispatch(addCourseAction(addedCourse));
    } catch (error) {
      console.error('Error in addCourseThunk:', error);
    }
  };

const updateCourseThunk =
  (updatedCourse: CourseType) => async (dispatch: AppDispatch) => {
    try {
      const newUpdatedCourse = await updateCourseRequest(updatedCourse);

      dispatch(updateCourseAction(newUpdatedCourse));
    } catch (error) {
      console.error('Error in updateCourseThunk:', error);
    }
  };

export {
  fetchCoursesThunk,
  deleteCourseThunk,
  addCourseThunk,
  updateCourseThunk,
};
