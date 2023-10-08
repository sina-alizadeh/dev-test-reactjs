import { object, string } from "yup";

export const profileValidationSchema = object({
  name: string().required("نام و نام خانوادگی الزامی است."),
  email: string().email("ایمیل نامعتبر").required("ایمیل الزامی است."),
  avatar: string().nullable(),
});
