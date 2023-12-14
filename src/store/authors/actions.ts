import {
  AuthorsActionTypes,
  AuthorType,
  AddAuthorAction,
  SaveAuthorAction,
} from './types';

export const addAuthorAction = (authorData: AuthorType[]): AddAuthorAction => ({
  type: AuthorsActionTypes.ADD_AUTHORS,
  payload: authorData,
});

export const saveAuthorAction = (authorData: AuthorType): SaveAuthorAction => ({
  type: AuthorsActionTypes.SAVE_AUTHOR,
  payload: authorData,
});
