import React, { FC } from "react";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { useFormik } from "formik";
import { TUser } from "../../core/models/user.model";
import RegBac from "../../assets/images/svg/lighFormBackground.svg";
import { loginValidationSchema } from "../../core/validation/loginValidationSchema";

interface ILoginProps {}

const CustomBox = styled(Box)({
  width: "100%",
  height: "100vh",
  background: "url(" + RegBac + ")",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const LoginBox = styled(Paper)({
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

const Login: FC<ILoginProps> = () => {
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
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      // api call
      console.log(values);
    },
  });

  return (
    <CustomBox>
      <LoginBox elevation={4}>
        <Typography>ورود</Typography>
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
        <Button type="submit" variant="contained" disabled={!formik.isValid}>
          ورود
        </Button>
        <Typography>صفحه ثبت نام</Typography>
      </LoginBox>
    </CustomBox>
  );
};

export { Login };
