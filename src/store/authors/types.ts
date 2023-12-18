export type AuthorType = {
  id: string;
  name: string;
};

export const enum AuthorsActionTypes {
  SAVE_AUTHOR = 'SAVE_AUTHOR',
  STORE_AUTHORS = 'STORE_AUTHORS',
}
export type SaveAuthorAction = {
  type: AuthorsActionTypes.SAVE_AUTHOR;
  payload: AuthorType;
};

export type StoreAuthorAction = {
  type: AuthorsActionTypes.STORE_AUTHORS;
  payload: AuthorType[];
};

interface SaveAuthor {
  type: AuthorsActionTypes.SAVE_AUTHOR;
  payload: AuthorType;
}

interface StoreAuthors {
  type: AuthorsActionTypes.STORE_AUTHORS;
  payload: AuthorType[];
}

export type AuthorsAction = SaveAuthor | StoreAuthors;
