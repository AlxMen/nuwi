import { User, Category, Proceeding, Document, Ministerio, Cabildo, Gobierno, Ayuntamiento, AsociacionesCaza, AsociacionesEco, AsociacionesVec, Emergencia } from "@prisma/client";

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

export type DataUser = Pick<User,"name" | "email" | "ext" | "role" | "password">

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