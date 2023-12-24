import {
  CoursesActionTypes,
  CourseType,
  StoreCourseAction,
  DeleteCourseAction,
  AddCourseAction,
  UpdateCourseAction,
} from './types';

export const storeCourseAction = (
  courseData: CourseType[]
): StoreCourseAction => ({
  type: CoursesActionTypes.STORE_COURSES,
  payload: courseData,
});

export const deleteCourseAction = (courseId: string): DeleteCourseAction => ({
  type: CoursesActionTypes.DELETE_COURSE,
  payload: courseId,
});

export const addCourseAction = (courseData: CourseType): AddCourseAction => ({
  type: CoursesActionTypes.ADD_COURSE,
  payload: courseData,
});

export const updateCourseAction = (
  updatedCourse: CourseType
): UpdateCourseAction => ({
  type: CoursesActionTypes.UPDATE_COURSE,
  payload: updatedCourse,
});
