import { UsersActionTypes, UserType, StoreUserAction } from './types';

export const storeUserAction = (userData: UserType): StoreUserAction => ({
  type: UsersActionTypes.STORE_USER,
  payload: userData,
});

export const removeUserAction = () => ({
  type: UsersActionTypes.REMOVE_USER,
});
