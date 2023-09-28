import { object, string } from "yup";

export const loginValidationSchema = object({
  email: string().email("ایمیل نامعتبر").required("ایمیل الزامی است."),
  password: string()
    .min(8, "رمز عبور باید حداقل از 8 کاراکتر تشکیل شده باشد.")
    .required("رمز عبور الزامی است."),
});
