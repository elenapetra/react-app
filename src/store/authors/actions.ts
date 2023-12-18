import {
  AuthorsActionTypes,
  AuthorType,
  StoreAuthorAction,
  SaveAuthorAction,
} from './types';

export const storeAuthorAction = (
  authorData: AuthorType[]
): StoreAuthorAction => ({
  type: AuthorsActionTypes.STORE_AUTHORS,
  payload: authorData,
});

export const saveAuthorAction = (authorData: AuthorType): SaveAuthorAction => ({
  type: AuthorsActionTypes.SAVE_AUTHOR,
  payload: authorData,
});
