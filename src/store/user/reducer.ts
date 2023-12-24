import { UserType, UsersAction, UsersActionTypes } from './types.ts';

export const userInitialState: UserType = {
  isAuth: false,
  name: '',
  email: '',
  token: '',
  role: '',
};
export const usersReducer = (state = userInitialState, action: UsersAction) => {
  switch (action.type) {
    case UsersActionTypes.STORE_USER:
      return {
        ...state,
        isAuth: action.payload.isAuth,
        name: action.payload.name,
        email: action.payload.email,
        token: action.payload.token,
      };
    case UsersActionTypes.REMOVE_USER:
      return {
        ...userInitialState,
      };
    case UsersActionTypes.GET_USER:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
