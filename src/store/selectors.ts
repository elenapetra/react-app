import { RootState } from 'store';

export const getCourses = (state: RootState) => state.courses;
export const getAuthors = (state: RootState) => state.authors;
export const getUserName = (state: RootState) => state.user.name;
export const getUserRole = (state: RootState) => state.user.role;
