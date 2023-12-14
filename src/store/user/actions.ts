import { UsersActionTypes, UserType, AddUserAction } from './types';

export const addUserAction = (userData: UserType): AddUserAction => ({
  type: UsersActionTypes.ADD_USER,
  payload: userData,
});

export const removeUserAction = () => ({
  type: UsersActionTypes.REMOVE_USER,
});
