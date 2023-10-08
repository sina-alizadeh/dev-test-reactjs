import { useMutation } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { TUploadFile } from "../../models/file.model";

const mainUrl = import.meta.env.VITE_API_URL;

const uploadFile = async (file: File): Promise<AxiosResponse<TUploadFile>> => {
  return await axios.post(
    mainUrl + `/files/upload`,
    { file: file },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export const useUploadFile = () => {
  return useMutation(uploadFile);
};
