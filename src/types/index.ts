import { User, Proceeding } from "@prisma/client";
/**
 * Creacion de los type de datos para su tipologia que usaran durante las comprobaciones y las creaciones de los registro en el aplicativo
 */
export type ProcedItem = Pick<
  Proceeding,
  | "createdexp"
  | "status"
  | "name"
  | "lastupdate"
  | "nExp"
  | "applicant"
  | "userId"
>;

export type DataUser = Pick<User, "id" | "name" | "email" | "ext" | "role">

export type projects = {
  lastuser: {
    id: string;
    name: string;
    password: string;
    role: string;
    ext: number;
    email: string;
  };
  id: string;
  nExp: string;
  name: string;
  category: string;
  type: string;
  status: string;
  applicant: string;
  createdexp: string;
  lastupdate: string;
  userId: string;
};