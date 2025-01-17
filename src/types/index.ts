import { User, Proceeding } from "@prisma/client";

/**
 * Tipo que representa un ítem de procedimiento.
 * 
 * @typedef {Object} ProcedItem
 * @property {Date} createdexp - Fecha de creación del expediente.
 * @property {string} status - Estado del procedimiento.
 * @property {string} name - Nombre del procedimiento.
 * @property {Date} lastupdate - Última actualización del procedimiento.
 * @property {string} nExp - Número del expediente.
 * @property {string} applicant - Solicitante del procedimiento.
 * @property {string} userId - Identificador del usuario asociado al procedimiento.
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

/**
 * Tipo que representa los datos del usuario.
 * 
 * @typedef {Object} DataUser
 * @property {string} id - Identificador del usuario.
 * @property {string} name - Nombre del usuario.
 * @property {string} email - Correo electrónico del usuario.
 * @property {number} ext - Extensión del usuario.
 * @property {string} role - Rol del usuario.
 */
export type DataUser = Pick<User, "id" | "name" | "email" | "ext" | "role">

/**
 * Tipo que representa un proyecto.
 * 
 * @typedef {Object} projects
 * @property {Object} lastuser - Último usuario que modificó el proyecto.
 * @property {string} lastuser.id - Identificador del último usuario.
 * @property {string} lastuser.name - Nombre del último usuario.
 * @property {string} lastuser.password - Contraseña del último usuario.
 * @property {string} lastuser.role - Rol del último usuario.
 * @property {number} lastuser.ext - Extensión del último usuario.
 * @property {string} lastuser.email - Correo electrónico del último usuario.
 * @property {string} id - Identificador del proyecto.
 * @property {string} nExp - Número del expediente del proyecto.
 * @property {string} name - Nombre del proyecto.
 * @property {string} category - Categoría del proyecto.
 * @property {string} type - Tipo del proyecto.
 * @property {string} status - Estado del proyecto.
 * @property {string} applicant - Solicitante del proyecto.
 * @property {string} createdexp - Fecha de creación del expediente del proyecto.
 * @property {string} lastupdate - Última actualización del proyecto.
 * @property {string} userId - Identificador del usuario asociado al proyecto.
 */
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