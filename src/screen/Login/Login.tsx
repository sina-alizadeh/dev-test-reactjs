import React, { FC, useContext, useRef } from "react";
import {
  Button,
  Link,
  Paper,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { useFormik } from "formik";
import RegBac from "../../assets/images/svg/lighFormBackground.svg";
import { loginValidationSchema } from "../../core/validation/loginValidationSchema";
import { useLoginUser } from "../../core/services/api/user.api";
import { TokenContext } from "../../context/TokenContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { CustomBox } from "../../components/common/CustomBox";
import { Loading } from "../../components/common/Loading";

interface ILoginProps {}

const LoginBox = styled(Paper)({
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

const Login: FC<ILoginProps> = () => {
  const tokenCtx = useContext(TokenContext);
  const loginuser = useLoginUser();
  const recaptcha = useRef<ReCAPTCHA>(null);
  const navigate = useNavigate();
  const formik = useFormik<{ email: string; password: string }>({
    initialValues: {
      email: "",
      password: "",
    },
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      // api call
      // console.log("ref", recaptcha.current);
      if (recaptcha.current == undefined) return;
      const captchaValue = recaptcha.current.getValue();
      // console.log("captcha", captchaValue);
      if (!captchaValue) {
        toast.error("کپچا نامعتبر است.");
        return;
      }
      loginuser.mutate(
        {
          email: values.email,
          password: values.password,
        },
        {
          onSuccess: (value) => {
            // console.log(value);
            const accessToken = value.data.access_token;
            tokenCtx?.logIn(accessToken);
            toast.success("خوش آمدید.");
            navigate("/");
          },
        }
      );
      // console.log(values);
    },
  });

  return (
    <CustomBox sx={{ background: "url(" + RegBac + ")" }}>
      <form onSubmit={formik.handleSubmit}>
        <LoginBox elevation={4}>
          <Typography>ورود</Typography>
          <TextField
            type="text"
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
          <ReCAPTCHA ref={recaptcha} sitekey={import.meta.env.VITE_SITE_KEY} />
          <Button
            type="submit"
            variant="contained"
            disabled={!formik.isValid || loginuser.isLoading}
          >
            {loginuser.isLoading ? <Loading /> : "ورود"}
          </Button>
          <Link href="/register">
            <Typography>صفحه ثبت نام</Typography>
          </Link>
        </LoginBox>
      </form>
    </CustomBox>
  );
};

export { Login };
