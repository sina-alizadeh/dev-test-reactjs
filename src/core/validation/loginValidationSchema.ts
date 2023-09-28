import { object, string } from "yup";

export const loginValidationSchema = object({
  name: string().required("نام و نام خانوادگی الزامی است."),
  password: string()
    .min(8, "رمز عبور باید حداقل از 8 کاراکتر تشکیل شده باشد.")
    .required("رمز عبور الزامی است."),
});
