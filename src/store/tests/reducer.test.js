import { coursesReducer, coursesInitialState } from 'store/courses/reducer';
import { CoursesActionTypes } from 'store/courses/types';

describe('Courses Reducer', () => {
  it('should return the initial state', () => {
    const initialState = coursesReducer(undefined, {});
    expect(initialState).toEqual(coursesInitialState);
  });

  it('should handle ADD_COURSE and return new state', () => {
    const initialCourse = {
      id: '1',
      title: 'Initial Course',
      description: 'description',
      duration: 30,
      creationDate: '25/12/2023',
      authors: ['1', '2'],
    };
    const newState = coursesReducer(coursesInitialState, {
      type: CoursesActionTypes.ADD_COURSE,
      payload: initialCourse,
    });

    expect(newState).toEqual([initialCourse]);
  });

  it('should handle ADD_COURSE and append to existing state', () => {
    const existingState = [
      {
        id: '1',
        title: 'Course 1',
        description: 'description',
        duration: 30,
        creationDate: '25/12/2023',
        authors: ['1', '2'],
      },
    ];
    const newCourse = {
      id: '3',
      title: 'New Course',
      description: 'description',
      duration: 60,
      creationDate: '26/12/2023',
      authors: ['3', '4'],
    };
    const newState = coursesReducer(existingState, {
      type: CoursesActionTypes.ADD_COURSE,
      payload: newCourse,
    });

    expect(newState).toEqual([...existingState, newCourse]);
  });
});
