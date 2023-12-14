import { combineReducers } from '@reduxjs/toolkit';
import { coursesReducer } from './courses/reducer.ts';
import { usersReducer } from './user/reducer.ts';
import { authorsReducer } from './authors/reducer.ts';

const rootReducer = combineReducers({
  courses: coursesReducer,
  user: usersReducer,
  authors: authorsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
