import { coursesReducer, coursesInitialState } from 'store/courses/reducer';
import { CoursesActionTypes } from 'store/courses/types';
import * as mockData from 'helpers/mockData.json';

const sampleCoursesArray = mockData.mockCourses;
const sampleCourse = mockData.mockCourses[0];

describe('Courses Reducer', () => {
  it('should return the initial state', () => {
    const initialState = coursesReducer(undefined, {});
    expect(initialState).toEqual(coursesInitialState);
  });

  it('should handle ADD_COURSE and return new state', () => {
    const newState = coursesReducer(coursesInitialState, {
      type: CoursesActionTypes.ADD_COURSE,
      payload: sampleCourse,
    });

    expect(newState).toEqual([sampleCourse]);
  });

  it('should handle ADD_COURSE and append to existing state', () => {
    const existingState = sampleCoursesArray;
    const newCourse = sampleCourse;
    const newState = coursesReducer(existingState, {
      type: CoursesActionTypes.ADD_COURSE,
      payload: newCourse,
    });

    expect(newState).toEqual([...existingState, newCourse]);
  });
});
