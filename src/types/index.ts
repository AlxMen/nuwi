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

export type DataUser = Pick<User, "name"| "email"| "ext" | "role">