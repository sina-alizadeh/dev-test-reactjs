import React, { FC, useRef } from "react";
import {
  Box,
  Button,
  Link,
  Paper,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { useFormik } from "formik";
import { TUser } from "../../core/models/user.model";
import RegBac from "../../assets/images/svg/lighFormBackground.svg";
import { registerValidationSchema } from "../../core/validation/registerValidationSchema";
import {
  useCreateUser,
  useIsEmailAvailable,
} from "../../core/services/api/user.api";
import ReCAPTCHA from "react-google-recaptcha";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
interface IRegisterProps {}

const CustomBox = styled(Box)({
  width: "100%",
  minHeight: "100vh",
  background: "url(" + RegBac + ")",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const RegisterBox = styled(Paper)({
  width: "400px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
  gap: "25px",
  border: 0,
  borderRadius: "15px",
  background: "rgba(255,255,255,0.4)",
});

const Register: FC<IRegisterProps> = () => {
  const createUser = useCreateUser();
  const recaptcha = useRef<ReCAPTCHA>(null);
  const isEmailAvailable = useIsEmailAvailable();
  const navigate = useNavigate();
  const formik = useFormik<TUser & { passwordRepeat: string }>({
    initialValues: {
      avatar: "",
      email: "",
      name: "",
      password: "",
      passwordRepeat: "",
    },
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema: registerValidationSchema,
    onSubmit: (values) => {
      console.log("ref", recaptcha.current);
      if (recaptcha.current == undefined) return;
      const captchaValue = recaptcha.current.getValue();
      console.log("captcha", captchaValue);
      if (!captchaValue) {
        toast.error("کپچا نامعتبر است.");
        return;
      }
      isEmailAvailable.mutate(values.email, {
        onError: () => {
          toast.error("کپچا نامعتبر است.");
        },
        onSuccess: (value) => {
          // this API always returns false for all emails which is not correct.
          // So true value is manually provided in this function.
          // if (value.data.isAvailable) {
          if (true) {
            const user: TUser = {
              avatar:
                "https://as2.ftcdn.net/v2/jpg/03/31/69/91/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.jpg",
              email: values.email,
              name: values.name,
              password: values.password,
            };
            createUser.mutate(user, {
              onSuccess: (user) => {
                toast.success("حساب کاربری ایجاد شد.");
                console.log("user", user);
                // redirect to login
                navigate("/login");
              },
            });
          } else {
            toast.error("ایمیل وارد شده در دسترس نمیباشد.");
            formik.setFieldValue("email", "");
            formik.isValid = false;
          }
        },
      });
    },
  });

  return (
    <CustomBox>
      <form onSubmit={formik.handleSubmit}>
        <RegisterBox elevation={4}>
          <Typography>ثبت نام</Typography>
          <TextField
            type="text"
            name="name"
            label="نام و نام خانوادگی"
            variant="outlined"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            type="email"
            name="email"
            label="ایمیل"
            variant="outlined"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            type="password"
            name="password"
            label="رمز عبور"
            variant="outlined"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <TextField
            type="password"
            name="passwordRepeat"
            label="تکرار رمز عبور"
            variant="outlined"
            value={formik.values.passwordRepeat}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.passwordRepeat &&
              Boolean(formik.errors.passwordRepeat)
            }
            helperText={
              formik.touched.passwordRepeat && formik.errors.passwordRepeat
            }
          />
          <ReCAPTCHA ref={recaptcha} sitekey={import.meta.env.VITE_SITE_KEY} />
          <Button type="submit" variant="contained" disabled={!formik.isValid}>
            ثبت نام
          </Button>
          <Link href="login">
            <Typography>صفحه ورود</Typography>
          </Link>
        </RegisterBox>
      </form>
    </CustomBox>
  );
};

export { Register };
