import { CourseType, CoursesAction, CoursesActionTypes } from './types.ts';

export const coursesInitialState = [] as CourseType[];
export const coursesReducer = (
  state = coursesInitialState,
  action: CoursesAction
) => {
  switch (action.type) {
    case CoursesActionTypes.ADD_COURSES:
      return action.payload;
    case CoursesActionTypes.SAVE_COURSE:
      return [...state, action.payload];
    case CoursesActionTypes.DELETE_COURSE:
      return state.filter((course) => course.id !== action.payload);
    case CoursesActionTypes.UPDATE_COURSE:
      return state.map((course) =>
        course.id === action.payload.courseId
          ? action.payload.updatedCourse
          : course
      );
    default:
      return state;
  }
};
