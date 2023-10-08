import React from "react";
import { Box, Button, Typography, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import RegBac from "../../assets/images/svg/lighFormBackground.svg";
import NotFoundBac from "../../assets/images/svg/pageNotFound.svg";
import { CustomBox } from "../../components/common/CustomBox";

const NotFoundBox = styled(Box)({
  width: "500px",
  height: "500px",
  background: "url(" + NotFoundBac + ")",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const PageNotFound = () => {
  const history = useNavigate();
  return (
    <CustomBox
      sx={{ background: "url(" + RegBac + ")", flexDirection: "column" }}
    >
      <NotFoundBox />
      <Typography>صفحه یافت نشد !!!</Typography>
      <Button onClick={() => history(-1)}>بازگشت</Button>
    </CustomBox>
  );
};

export { PageNotFound };
