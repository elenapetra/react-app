import { RootState } from './rootReducer';

export const getCourses = (state: RootState) => state.courses;
export const getAuthors = (state: RootState) => state.authors;
export const getUserName = (state: RootState) => state.user.name;
