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

export type TLoginUser = {
  access_token: string;
  refresh_token: string;
};
