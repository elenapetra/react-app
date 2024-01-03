export type UserType = {
  isAuth: boolean;
  name: string;
  email: string;
  token: string;
  role?: string;
};

export const enum UsersActionTypes {
  STORE_USER = 'STORE_USER',
  REMOVE_USER = 'REMOVE_USER',
  GET_USER = 'GET_USER',
}
export type StoreUserAction = {
  type: UsersActionTypes.STORE_USER;
  payload: UserType;
};

export type RemoveUserAction = {
  type: UsersActionTypes.REMOVE_USER;
};
export type GetUserAction = {
  type: UsersActionTypes.GET_USER;
  payload: UserType;
};

interface StoreUser {
  type: UsersActionTypes.STORE_USER;
  payload: UserType;
}

interface RemoveUser {
  type: UsersActionTypes.REMOVE_USER;
}
interface GetUser {
  type: UsersActionTypes.GET_USER;
  payload: UserType;
}

export type UsersAction = StoreUser | RemoveUser | GetUser;
