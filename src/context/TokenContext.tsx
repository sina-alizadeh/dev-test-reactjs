import { createContext, FC, Fragment, useState } from "react";
import { getItem } from "../core/services/storage/storage";
import { setJwt } from "../core/services/api/interceptor.api";

interface ITokenContext {
  token: string | false;
  logIn: (token: string) => void;
  logOut: () => void;
}

export const TokenContext = createContext<ITokenContext | undefined>({
  token: getItem("token") ? getItem("token") : "",
  logOut: () => {},
  logIn: (token: string) => {},
});

interface ITokenProvider {
  children: JSX.Element;
  authHandler: (isAuth: boolean) => void;
}

const TokenProvider: FC<ITokenProvider> = ({ children, authHandler }) => {
  const token =
    getItem("token") == false || getItem("token") == null
      ? ""
      : (getItem("token") as string);
  const [tkn, setTkn] = useState<string>(token);

  const logIn = (token: string) => {
    // console.log("token", token);
    setJwt(token);
    localStorage.setItem("token", token);
    setTkn(token);
    authHandler(Boolean(token));
  };

  const logOut = () => {
    setTkn("");
    authHandler(false);
    localStorage.removeItem("token");
  };

  return (
    <Fragment>
      <TokenContext.Provider
        value={{
          token: tkn,
          logIn: logIn,
          logOut: logOut,
        }}
      >
        {children}
      </TokenContext.Provider>
    </Fragment>
  );
};

export { TokenProvider };
