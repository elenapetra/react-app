export type CourseType = {
  id: string;
  title: string;
  description: string;
  duration: number;
  creationDate: string;
  authors: string[];
};

export const enum CoursesActionTypes {
  SAVE_COURSE = 'SAVE_COURSE',
  STORE_COURSES = 'STORE_COURSES',
  DELETE_COURSE = 'DELETE_COURSE',
  UPDATE_COURSE = 'UPDATE_COURSE',
}

export type StoreCourseAction = {
  type: CoursesActionTypes.STORE_COURSES;
  payload: CourseType[];
};
export type DeleteCourseAction = {
  type: CoursesActionTypes.DELETE_COURSE;
  payload: string;
};
export type SaveCourseAction = {
  type: CoursesActionTypes.SAVE_COURSE;
  payload: CourseType;
};
export type UpdateCourseAction = {
  type: CoursesActionTypes.UPDATE_COURSE;
  payload: {
    courseId: string;
    updatedCourse: CourseType;
  };
};

interface SaveCourse {
  type: CoursesActionTypes.SAVE_COURSE;
  payload: CourseType;
}

interface StoreCourses {
  type: CoursesActionTypes.STORE_COURSES;
  payload: CourseType[];
}

interface DeleteCourse {
  type: CoursesActionTypes.DELETE_COURSE;
  payload: string;
}

interface UpdateCourse {
  type: CoursesActionTypes.UPDATE_COURSE;
  payload: {
    courseId: string;
    updatedCourse: CourseType;
  };
}

export type CoursesAction =
  | SaveCourse
  | StoreCourses
  | DeleteCourse
  | UpdateCourse;
