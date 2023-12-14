import {
  CoursesActionTypes,
  CourseType,
  AddCourseAction,
  DeleteCourseAction,
  SaveCourseAction,
  UpdateCourseAction,
} from './types';

export const addCourseAction = (courseData: CourseType[]): AddCourseAction => ({
  type: CoursesActionTypes.ADD_COURSES,
  payload: courseData,
});

export const deleteCourseAction = (courseId: string): DeleteCourseAction => ({
  type: CoursesActionTypes.DELETE_COURSE,
  payload: courseId,
});

export const saveCourseAction = (courseData: CourseType): SaveCourseAction => ({
  type: CoursesActionTypes.SAVE_COURSE,
  payload: courseData,
});

export const updateCourseAction = (
  courseId: string,
  updatedCourse: CourseType
): UpdateCourseAction => ({
  type: CoursesActionTypes.UPDATE_COURSE,
  payload: {
    courseId,
    updatedCourse,
  },
});
