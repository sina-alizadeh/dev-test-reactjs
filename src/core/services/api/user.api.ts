import { useMutation } from "@tanstack/react-query";
import axios from "./interceptor.api";
import {
  TCreateUserResponse,
  TIsEmailAvailableResponse,
  TLoginUser,
  TUpdateUser,
  TUser,
  TUserDetails,
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

const getAllUsers = async (): Promise<AxiosResponse<Array<TUserDetails>>> => {
  return await axios.get(mainUrl + "users");
};

const getAuthUser = async (): Promise<AxiosResponse<TCreateUserResponse>> => {
  return await axios.get(mainUrl + `auth/profile`);
};

const updateUser = async (
  data: TUpdateUser & { id: number }
): Promise<AxiosResponse<TCreateUserResponse>> => {
  return await axios.put(mainUrl + `users/${data.id}`, data);
};

export const useUpdateUser = () => {
  return useMutation(updateUser);
};

export const useGetAllUsers = () => {
  return useMutation(getAllUsers);
};

export const useGetAuthUser = () => {
  return useMutation(getAuthUser);
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
