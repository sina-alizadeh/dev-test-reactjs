import { createContext, FC, Fragment, useState } from "react";
import { getItem } from "../core/services/storage/storage";

interface ITokenContext {
  token: string;
  logIn: (token: string) => void;
  logOut: () => void;
}

export const TokenContext = createContext<ITokenContext | undefined>(undefined);

interface ITokenProvider {
  children: JSX.Element;
}

const TokenProvider: FC<ITokenProvider> = ({ children }) => {
  const token =
    getItem("token") == false || getItem("token") == null
      ? ""
      : (getItem("token") as string);
  const [tkn, setTkn] = useState<string>(token);

  const logIn = (token: string) => {
    setTkn(token);
    localStorage.setItem("token", token);
  };

  const logOut = () => {
    setTkn("");
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