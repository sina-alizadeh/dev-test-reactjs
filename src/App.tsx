import { FC, useContext, useState } from "react";
import "./cssReset.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import { Register } from "./screen/Register/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./screen/Login/Login";
import { Dashboard } from "./screen/Dashboard/Dashboard";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { TokenContext, TokenProvider } from "./context/TokenContext";
import { PageNotFound } from "./screen/PageNotFound/PageNotFound";
import { Profile } from "./screen/Profile/Profile";
const theme = createTheme({
  direction: "rtl",
});

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const queryClient = new QueryClient();
const App: FC = () => {
  const tokenCtx = useContext(TokenContext);
  const [isAuthed, setIsAuthed] = useState<boolean>(Boolean(tokenCtx?.token));

  const authHandler = (isAuth: boolean) => {
    setIsAuthed(isAuth);
  };

  return (
    <TokenProvider authHandler={authHandler}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={theme}>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute hasToken={isAuthed}>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/"
                  index
                  element={
                    <ProtectedRoute hasToken={isAuthed}>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
              <Toaster />
            </ThemeProvider>
          </CacheProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </TokenProvider>
  );
};

export default App;
