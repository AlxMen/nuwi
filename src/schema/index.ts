import { z } from "zod";

export const SearchSchema = z.object({
  search: z.string()
})

export const UserSchema = z.object({
  email: z.string().min(1, "El email del usuario es requerido"),
  password: z.string().min(1, "La contraseña es obligatoria"),
})

export const ProjectSchema = z.object({
  name: z.string().min(1, "El nombre del proyecto es requerido"),
  category: z.string().min(1, "Es Obligatorio elegir una Categoria"),
  nexp: z.string().min(1, "El mumero del Expediente es Obligatorio"),
  type: z.string().min(1, "Es Obligatorio Elegir un tipo de Evaluacion"),
  date: z.string().min(1, "La Fecha es obligatoria"),
  applicant: z.string().min(1, "El solicitante es obligatorio "),
});

export const EditProjectSchema = z.object({
  id: z.string().min(1, "El project e obligatorio"),
  name: z.string().min(1, "El nombre es obligatorio"),
  status: z.string().min(1, "El estado es obligatorio"),
})

export const DocumentSchema = z.object({
  name: z.string().min(1, "El nombre del documento es requerido"),
  date: z.string().min(1, "La fecha del documento es requerida"),
  regisNumber: z.string().min(1, "El número de registro del documento es requerido"),
  path: z.string().min(1, "No se ha selecciónado un archivo. Por favor seleccione uno"),
});