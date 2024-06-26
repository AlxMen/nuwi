import { User, Category, Proceeding, Document, Ministerio, Cabildo, Gobierno, Ayuntamiento, AsociacionesCaza, AsociacionesEco, AsociacionesVec, Emergencia } from "@prisma/client";

export type ProcedItem = Pick<
  Proceeding,
  | "id"
  | "createdexp"
  | "status"
  | "name"
  | "lastupdate"
  | "nExp"
  | "applicant"
  | "userId"
> & {
  evaluate: string
};