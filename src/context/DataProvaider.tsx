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

/**
 * Tipo que define el contexto global de la aplicación.
 * 
 * @typedef {Object} GlobalContextType
 * @property {DataUser} dataGlobal - Datos del usuario global.
 * @property {Function} closeSection - Función para cerrar la sesión.
 * @property {Function} dataUserLogin - Función para manejar el inicio de sesión del usuario.
 */
type GlobalContextType = {
  dataGlobal: DataUser;
  closeSection: () => void;
  dataUserLogin: (data: string) => void;
};

/**
 * Tipo que representa los datos necesarios para el inicio de sesión.
 * 
 * @typedef {Object} DataLoginType
 * @property {number} ext - Extensión del usuario.
 * @property {string} email - Correo electrónico del usuario.
 */
type DataLoginType = {
  ext: number;
  email: string;
};

/**
 * Contexto global de la aplicación.
 * 
 * @type {React.Context<GlobalContextType | undefined>}
 */
export const GlobalContext = createContext<GlobalContextType | undefined>(
  undefined
);

/**
 * Proveedor del contexto global de la aplicación.
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {ReactNode} props.children - Elementos hijos del componente.
 * @returns {JSX.Element} Elemento JSX que provee el contexto global.
 */
export const GlobalProvaider = ({ children }: { children: ReactNode }) => {
  const [dataGlobal, setDataGlobal] = useState<DataUser>({
    id: "",
    name: "",
    role: "",
    ext: 0,
    email: "",
  });

  /**
   * Función para manejar el inicio de sesión del usuario.
   *
   * @param {DataLoginType} data - Datos necesarios para el inicio de sesión.
   */
  const dataUserLogin = async (data: string) => {
    const search = jwt.decode(data) as DataLoginType;

    const info: DataLoginType = {
      ext: search.ext,
      email: search.email,
    };
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
  };

  const { push } = useRouter();

  /**
   * Función para cerrar la sesión.
   */
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
    <GlobalContext.Provider value={{ dataGlobal, closeSection, dataUserLogin }}>
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
