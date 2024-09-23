"use client";

import {
  createContext,
  ReactNode,
  useContext, useEffect, useState
} from "react";
import jwt from "jsonwebtoken";
import { DataUser } from "../types";
import { useRouter } from "next/navigation";
import { getUserProfile } from "@/actions/login-user-action";

type GlobalContextType = {
  dataGlobal: DataUser;
  closeSection: () => void;
  dataUserLogin: (data: string) => void;
};

type DataLoginType = {
  ext: number;
  email: string;
};

export const GlobalContext = createContext<GlobalContextType | undefined>(
  undefined
);

export const GlobalProvaider = ({ children }: { children: ReactNode }) => {
  const [dataGlobal, setDataGlobal] = useState<DataUser>({
    id: "",
    name: "",
    role: "",
    ext: 0,
    email: "",
  });

  const dataUserLogin = async (data: string) => {

    const search = jwt.decode(data) as DataLoginType;

    const info: DataLoginType = {
      ext: search.ext,
      email: search.email,
    }
    const result = await getUserProfile(info);

    if (result?.data) {
      setDataGlobal(result!.data);
    }
  };

  if (typeof window !== "undefined") {
    if (dataGlobal) {
      useEffect(() => {
        const token = window.localStorage.getItem("token");
        if (token) {
          dataUserLogin(token);
        }
      }, []);
     }
   }

  const { push } = useRouter();
  const closeSection = () => {
    setDataGlobal({
      id: "",
      name: "",
      role: "",
      ext: 0,
      email: "",
    });
    push("/");
  };

  return (
    <GlobalContext.Provider
      value={{ dataGlobal, closeSection, dataUserLogin }}
    >
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
