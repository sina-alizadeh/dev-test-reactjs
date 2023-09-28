import { object, ref, string } from "yup";

export const registerValidationSchema = object({
  name: string().required("نام و نام خانوادگی الزامی است."),
  email: string().email("ایمیل نامعتبر").required("ایمیل الزامی است."),
  password: string()
    .min(8, "رمز عبور باید حداقل از 8 کاراکتر تشکیل شده باشد.")
    .required("رمز عبور الزامی است."),
  passwordRepeat: string()
    .required("رمز عبور الزامی است.")
    .oneOf([ref("password")], "رمز عبور مطابقت نمی کند."),
});
