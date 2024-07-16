import { z } from "zod";

export const UserSchema = z.object({
  email: z.string().min(1, "El email del usuario es requerido"),
  password: z.string().min(1, "La contraseña es obligatoria"),
})

export const DocumentSchema = z.object({
  name: z.string().min(1, "El nombre del documento es requerido"),
  date: z.string().min(1, "La fecha del documento es requerida"),
  regisNumber: z.string().min(1, "El número de registro del documento es requerido"),
  path: z.string().min(1, "No se ha selecciónado un archivo. Por favor seleccione uno"),
});