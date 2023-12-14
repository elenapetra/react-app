export type AuthorType = {
  id: string;
  name: string;
};

export const enum AuthorsActionTypes {
  SAVE_AUTHOR = 'SAVE_AUTHOR',
  ADD_AUTHORS = 'ADD_AUTHORS',
}
export type SaveAuthorAction = {
  type: AuthorsActionTypes.SAVE_AUTHOR;
  payload: AuthorType;
};

export type AddAuthorAction = {
  type: AuthorsActionTypes.ADD_AUTHORS;
  payload: AuthorType[];
};

interface SaveAuthor {
  type: AuthorsActionTypes.SAVE_AUTHOR;
  payload: AuthorType;
}

interface AddAuthors {
  type: AuthorsActionTypes.ADD_AUTHORS;
  payload: AuthorType[];
}

export type AuthorsAction = SaveAuthor | AddAuthors;
