import { AuthorType, AuthorsAction, AuthorsActionTypes } from './types.ts';

export const coursesInitialState = [] as AuthorType[];
export const authorsReducer = (
  state = coursesInitialState,
  action: AuthorsAction
) => {
  switch (action.type) {
    case AuthorsActionTypes.STORE_AUTHORS:
      return action.payload;
    case AuthorsActionTypes.SAVE_AUTHOR:
      return [...state, action.payload];
    default:
      return state;
  }
};
