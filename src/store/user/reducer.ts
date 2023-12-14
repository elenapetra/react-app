import { UserType, UsersAction, UsersActionTypes } from './types.ts';

export const userInitialState: UserType = {
  isAuth: false,
  name: '',
  email: '',
  token: '',
};
export const usersReducer = (state = userInitialState, action: UsersAction) => {
  switch (action.type) {
    case UsersActionTypes.ADD_USER:
      return {
        isAuth: action.payload.isAuth,
        name: action.payload.name,
        email: action.payload.email,
        token: action.payload.token,
      };
    case UsersActionTypes.REMOVE_USER:
      return {
        ...userInitialState,
      };
    default:
      return state;
  }
};
