import React, { FC, useContext, useEffect, useState } from "react";
import { PanelLayout } from "../../components/common/PanelLayout";
import { Box, Button, Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import { TUpdateUser } from "../../core/models/user.model";
import {
  useGetAuthUser,
  useLoginUser,
  useUpdateUser,
} from "../../core/services/api/user.api";
import { profileValidationSchema } from "../../core/validation/profileValidationSchema";
import Avatar from "../../components/common/Avatar";
import { Loading } from "../../components/common/Loading";
import { useUploadFile } from "../../core/services/api/file.api";
import { MuiFileInput } from "mui-file-input";
import { UploadButton } from "@bytescale/upload-widget-react";
import { TokenContext } from "../../context/TokenContext";

const Profile: FC = () => {
  const tokenCtx = useContext(TokenContext);
  const getAuthUser = useGetAuthUser();
  const updateUser = useUpdateUser();
  const loginUser = useLoginUser();
  // const uploadFile = useUploadFile(); // encountered 503 error (CORS)
  const [userDetail, setUserDetail] = useState<TUpdateUser>({
    avatar: "",
    email: "",
    name: "",
    id: 0,
    password: "",
  });

  const options = {
    apiKey: import.meta.env.VITE_UPLOAD_APIKEY,
    maxFileCount: 1,
  };

  useEffect(() => {
    getAuthUser.mutate(undefined, {
      onSuccess: (value) => {
        // console.log("userAuth", value);
        setUserDetail({
          avatar: value.data.avatar,
          email: value.data.email,
          name: value.data.name,
          id: value.data.id,
          password: value.data.password,
        });
      },
    });
  }, []);

  const formik = useFormik<TUpdateUser>({
    initialValues: userDetail,
    onSubmit: (values) => {
      // console.log("obsubmit", values);
      updateUser.mutate(values, {
        onSuccess: (user) => {
          loginUser.mutate(
            {
              email: user.data.email,
              password: user.data.password,
            },
            {
              onSuccess: (data) => {
                tokenCtx.logIn(data.data.access_token);
              },
            }
          );
        },
      });
    },
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema: profileValidationSchema,
  });

  return (
    <PanelLayout pageHeaderName={"پروفایل کاربر"}>
      <Box>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <Avatar
                  src={formik.values.avatar}
                  sx={{ width: "100px", height: "100px" }}
                />
                <UploadButton
                  options={options}
                  onComplete={(files) => {
                    console.log("uploadddd", files);
                    formik.setFieldValue("avatar", files[0].fileUrl);
                  }}
                >
                  {({ onClick }) => (
                    <Button onClick={onClick} variant="contained">
                      آپلود تصویر کاربر
                    </Button>
                  )}
                </UploadButton>
              </Box>
            </Grid>
            <Grid item md={6} xs={12}>
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
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
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
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  disabled={!formik.isValid || updateUser.isLoading}
                >
                  {updateUser.isLoading ? <Loading /> : "ثبت"}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
    </PanelLayout>
  );
};

export { Profile };
