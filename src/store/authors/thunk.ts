import { storeAuthorAction, saveAuthorAction } from './actions';
import { fetchAuthors, addAuthorRequest } from 'services';
import { AppDispatch } from 'store';
import { AuthorType } from './types';

const fetchAuthorsThunk = () => async (dispatch: AppDispatch) => {
  try {
    const authorsData = await fetchAuthors();
    dispatch(storeAuthorAction(authorsData));
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};

const addAuthorThunk =
  (newAuthor: AuthorType) => async (dispatch: AppDispatch) => {
    try {
      const authorData = await addAuthorRequest(newAuthor);
      dispatch(saveAuthorAction(authorData));
    } catch (error) {
      console.error('Error fetching authors:', error);
      throw error;
    }
  };

export { fetchAuthorsThunk, addAuthorThunk };
