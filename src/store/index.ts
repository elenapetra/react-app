import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import { CoursesAction } from './courses/types';
import { UsersAction } from './user/types';
import { AuthorsAction } from './authors/types';

const store = configureStore({
  reducer: rootReducer,
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
export type AppAction = CoursesAction | UsersAction | AuthorsAction;
export default store;
