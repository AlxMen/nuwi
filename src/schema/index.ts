import { z } from "zod";

/**
 * Esquema de validación para la búsqueda.
 * 
 * @typedef {Object} SearchSchema
 * @property {string} search - Término de búsqueda.
 */
export const SearchSchema = z.object({
  search: z.string()
})

/**
 * Esquema de validación para el usuario.
 * 
 * @typedef {Object} UserSchema
 * @property {string} email - Correo electrónico del usuario.
 * @property {string} password - Contraseña del usuario.
 */
export const UserSchema = z.object({
  email: z.string().min(1, "El email del usuario es requerido"),
  password: z.string().min(1, "La contraseña es obligatoria"),
})

/**
 * Esquema de validación para los datos del usuario.
 * 
 * @typedef {Object} DataUserSchema
 * @property {number} ext - Extensión del usuario.
 * @property {string} email - Correo electrónico del usuario.
 */
export const DataUserSchema = z.object({
  ext: z.number(),
  email: z.string().min(1, "El email del usuario es requerido"),
});

/**
 * Esquema de validación para el cambio de datos del usuario.
 * 
 * @typedef {Object} UserChangeSchema
 * @property {string} name - Nombre del usuario.
 * @property {string} email - Correo electrónico del usuario.
 */
export const UserChangeSchema = z.object({
  name: z.string().min(1, "El Nombre es Obligatorio"),
  email: z.string().min(1, "El email es obligatorio"),
});

/**
 * Esquema de validación para la corrección de la contraseña.
 * 
 * @typedef {Object} CorrectPasswordSchema
 * @property {string} password - Contraseña del usuario.
 */
export const CorrectPasswordSchema = z.object({
  password: z.string().min(1, "La contraseña es obligatoria")
})

/**
 * Esquema de validación para el proyecto.
 * 
 * @typedef {Object} ProjectSchema
 * @property {string} name - Nombre del proyecto.
 * @property {string} category - Categoría del proyecto.
 * @property {string} nexp - Número del expediente del proyecto.
 */
export const ProjectSchema = z.object({
  name: z.string().min(1, "El nombre del proyecto es requerido"),
  category: z.string().min(1, "Es Obligatorio elegir una Categoria"),
  nexp: z.string().min(1, "El mumero del Expediente es Obligatorio"),
  type: z.string().min(1, "Es Obligatorio Elegir un tipo de Evaluacion"),
  date: z.string().min(1, "La Fecha es obligatoria"),
  applicant: z.string().min(1, "El solicitante es obligatorio "),
});

/**
 * Esquema de validación para la edición de un proyecto.
 * 
 * @typedef {Object} EditProjectSchema
 * @property {string} id - Identificador del proyecto.
 * @property {string} name - Nombre del proyecto.
 * @property {string} status - Estado del proyecto.
 */
export const EditProjectSchema = z.object({
  id: z.string().min(1, "El project e obligatorio"),
  name: z.string().min(1, "El nombre es obligatorio"),
  status: z.string().min(1, "El estado es obligatorio"),
})

/**
 * Esquema de validación para un documento.
 * 
 * @typedef {Object} DocumentSchema
 * @property {string} name - Nombre del documento.
 * @property {string} date - Fecha del documento.
 * @property {string} regisNumber - Número de registro del documento.
 * @property {string} path - Ruta del archivo del documento.
 */
export const DocumentSchema = z.object({
  name: z.string().min(1, "El nombre del documento es requerido"),
  date: z.string().min(1, "La fecha del documento es requerida"),
  regisNumber: z.string().min(1, "El número de registro del documento es requerido"),
  path: z.string().min(1, "No se ha selecciónado un archivo. Por favor seleccione uno"),
});

/**
 * Esquema de validación para la edición de un documento.
 * 
 * @typedef {Object} EditDocumentSchema
 * @property {string} name - Nombre del documento.
 * @property {string} date - Fecha del documento.
 * @property {string} regisNumber - Número de registro del documento.
 */
export const EditDocumentSchema = z.object({
  name: z.string().min(1, "El nombre del documento es requerido"),
  date: z.string().min(1, "La fecha del documento es requerida"),
  regisNumber: z.string().min(1, "El número de registro del documento es requerido"),
})