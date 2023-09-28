import React, { FC } from "react";
import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { useFormik } from "formik";
import { TUser } from "../../core/models/user.model";
import RegBac from "../../assets/images/svg/lighFormBackground.svg";
import { registerValidationSchema } from "../../core/validation/registerValidationSchema";

interface IRegisterProps {}

const CustomBox = styled(Box)({
  width: "100%",
  height: "100vh",
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
  padding: "10px",
  gap: "25px",
  border: 0,
  borderRadius: "15px",
  background: "rgba(255,255,255,0.4)",
});

const Register: FC<IRegisterProps> = () => {
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
      // api call
      console.log(values);
    },
  });

  return (
    <CustomBox>
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
        <Button type="submit" variant="contained" disabled={!formik.isValid}>
          ثبت نام
        </Button>
        <Typography>صفحه ورود</Typography>
      </RegisterBox>
    </CustomBox>
  );
};

export { Register };
