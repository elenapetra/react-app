export type UserType = {
  isAuth: boolean;
  name: string;
  email: string;
  token: string;
};

export const enum UsersActionTypes {
  ADD_USER = 'ADD_USER',
  REMOVE_USER = 'REMOVE_USER',
}
export type AddUserAction = {
  type: UsersActionTypes.ADD_USER;
  payload: UserType;
};

export type RemoveUserAction = {
  type: UsersActionTypes.REMOVE_USER;
};

interface AddUser {
  type: UsersActionTypes.ADD_USER;
  payload: UserType;
}

interface RemoveUser {
  type: UsersActionTypes.REMOVE_USER;
}

export type UsersAction = AddUser | RemoveUser;
