export type TUser = {
  name: string;
  email: string;
  password: string;
  avatar: string;
};

export type TIsEmailAvailableResponse = {
  isAvailable: boolean;
};

export type TCreateUserResponse = {
  email: string;
  password: string;
  name: string;
  avatar: string;
  role: string;
  id: number;
};

export type TUpdateUser = {
  email: string;
  name: string;
  avatar: string;
  id: number;
  password: string;
};

export type TUserDetails = TCreateUserResponse & {
  creationAt: string;
  updateAt: string;
};

export type TLoginUser = {
  access_token: string;
  refresh_token: string;
};
