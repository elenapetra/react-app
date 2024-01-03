import { AppDispatch } from 'store';
import { fetchCurrentUser, logoutRequest } from 'services';
import { getUserAction, removeUserAction } from './actions';

const fetchCurrentUserThunk = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found in localStorage');
      }
      const userData = await fetchCurrentUser(token);
      dispatch(
        getUserAction({
          isAuth: true,
          name: userData.result.name,
          email: userData.result.email,
          role: userData.result.role,
          token: token,
        })
      );
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  };
};

const logoutThunk = () => {
  return async (dispatch: AppDispatch) => {
    try {
      await logoutRequest();
      dispatch(removeUserAction());
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
};
export { fetchCurrentUserThunk, logoutThunk };
