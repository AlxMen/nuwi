"use client";

import { createContext, ReactNode, useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { DataUser } from "../types";

type GlobalContextType = {
  dataGlobal: DataUser;
};

export const GlobalContext = createContext<GlobalContextType>({
  dataGlobal: {
    name: "",
    role: "",
    ext: 0,
    email: "",
  },
});

export const GlobalProvaider = ({ children }: { children: ReactNode }) => {
  const [dataGlobal, setDataGlobal] = useState<DataUser>({
    name: "",
    role: "",
    ext: 0,
    email: "",
  });

  let token: string | null = null;
  let data: DataUser | null = null;
  useEffect(() => {
    if (typeof window !== "undefined") {
      token = window.localStorage.getItem("token");
    }

    if (token) {
      data = jwt.decode(token) as DataUser;
    }

    if (data !== null) {
      setDataGlobal(data);
    }
  }, []);
  return (
    <GlobalContext.Provider value={{ dataGlobal }}>
      {children}
    </GlobalContext.Provider>
  );
};
