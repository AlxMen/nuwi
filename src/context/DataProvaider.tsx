"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import jwt from "jsonwebtoken";
import { DataUser } from "../types";

type GlobalContextType = {
  dataGlobal: DataUser;
  triggerEffect: () => void;
};

export const GlobalContext = createContext<GlobalContextType | undefined>(
  undefined
);

export const GlobalProvaider = ({ children }: { children: ReactNode }) => {
  const [dataGlobal, setDataGlobal] = useState<DataUser>({
    name: "",
    role: "",
    ext: 0,
    email: "",
  });
  const [loginButton, setLoginButton] = useState(false);

  const triggerEffect = () => {
    setLoginButton(true);
  };

  let token: string | null = null;
  let data: DataUser | null = null;
  useEffect(() => {
    if (loginButton) {
      if (typeof window !== "undefined") {
        token = window.localStorage.getItem("token");
      }

      if (token) {
        data = jwt.decode(token) as DataUser;
      }

      if (data !== null) {
        setDataGlobal(data);
      }
      setLoginButton(false);
    }
  }, [loginButton]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      token = window.localStorage.getItem("token");
      if (token) {
        data = jwt.decode(token) as DataUser;
      }

      if (data !== null) {
        setDataGlobal(data);
      }
    }
  }, []);

  return (
    <GlobalContext.Provider value={{ dataGlobal, triggerEffect }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useMyContext = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useMyContext must be used within a MyContextProvider");
  }
  return context;
};
