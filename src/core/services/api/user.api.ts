import { useMutation } from "@tanstack/react-query";
import axios from "./interceptor.api";
import {
  TCreateUserResponse,
  TIsEmailAvailableResponse,
  TLoginUser,
  TUser,
} from "../../models/user.model";
import { AxiosResponse } from "axios";

const mainUrl = import.meta.env.VITE_API_URL;

const isEmailAvailable = async (
  value: string
): Promise<AxiosResponse<TIsEmailAvailableResponse>> => {
  return await axios.post(mainUrl + "users/is-available", { email: value });
};

const createUser = async (
  user: TUser
): Promise<AxiosResponse<TCreateUserResponse>> => {
  return await axios.post(mainUrl + "users/", user);
};

const loginUser = async (data: {
  email: string;
  password: string;
}): Promise<AxiosResponse<TLoginUser>> => {
  return await axios.post(mainUrl + "auth/login", data);
};

export const useCreateUser = () => {
  return useMutation(createUser);
};

export const useLoginUser = () => {
  return useMutation(loginUser);
};

export const useIsEmailAvailable = () => {
  return useMutation(isEmailAvailable);
};
