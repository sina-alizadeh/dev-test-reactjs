import React, { FC } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { styled } from "@mui/material";

const Loading = styled(CircularProgress)({
  width: "30px !important",
  height: "30px !important",
});

export { Loading };
