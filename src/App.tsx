import { FC } from "react";
// import { Register } from "./screen/Register/Register";
import "./cssReset.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
// import { Login } from "./screen/Login/Login";
import { Register } from "./screen/Register/Register";

const theme = createTheme({
  direction: "rtl",
});

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});
const App: FC = () => {
  // css reset
  // router
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <Register />
      </ThemeProvider>
    </CacheProvider>
  );
};

export default App;
