import {
  UsersActionTypes,
  UserType,
  StoreUserAction,
  GetUserAction,
  RemoveUserAction,
} from './types';

export const storeUserAction = (userData: UserType): StoreUserAction => ({
  type: UsersActionTypes.STORE_USER,
  payload: userData,
});

export const removeUserAction = (): RemoveUserAction => ({
  type: UsersActionTypes.REMOVE_USER,
});

export const getUserAction = (userData: UserType): GetUserAction => ({
  type: UsersActionTypes.GET_USER,
  payload: userData,
});
