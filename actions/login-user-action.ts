"use server";

import { prisma } from "@/src/lib/prisma";
import { CorrectPasswordSchema, DataUserSchema, UserChangeSchema, UserSchema } from "@/src/schema";
import jwt from "jsonwebtoken";

/**
 * Inicia sesión de un usuario.
 * 
 * @async
 * @function loginUser
 * @param {unknown} data - Datos del usuario para iniciar sesión.
 * @returns {Promise<Object>} Resultado del inicio de sesión.
 */
export async function loginUser(data: unknown) {
  const result = UserSchema.safeParse(data);

  if (!result.success) {
    return { errors: result.error.issues };
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: result.data.email,
        password: result.data.password,
      },
    });
    if (!user) {
      return { errors: [{ message: "Usuario o contraseña incorrectos" }] };
    } else {
      return {
        token: jwt.sign(
          {
            ext: user.ext,
            email: user.email,
          },
          "OAOAServices",
          { expiresIn: "10h" }
        ),
      };
    }
  } catch (error) {
    console.log(error);
  }
}

/**
 * Obtiene el perfil de un usuario.
 * 
 * @async
 * @function getUserProfile
 * @param {unknown} info - Información del usuario.
 * @returns {Promise<Object>} Perfil del usuario.
 */
export async function getUserProfile(info: unknown) {
  const result = DataUserSchema.safeParse(info);
  
  if (!result.success) {
    return { errors: result.error.issues };
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: result.data.email,
        ext: result.data.ext,
      },
    });   

    if (!user) {
      return { errors: [{ message: "Usuario o contraseña incorrectos" }] };
    } else {
      return {
        data: {
          id: user.id,
          ext: user.ext,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      };
    }
  } catch (error) {
    console.log(error);
  }
}

/**
 * Actualiza los datos de un usuario.
 * 
 * @async
 * @function updateUserData
 * @param {unknown} data - Datos actualizados del usuario.
 * @param {string} id - Identificador del usuario.
 * @returns {Promise<Object>} Resultado de la actualización del usuario.
 */
export async function updateUserData(data: unknown, id: string) { 
  const result = UserChangeSchema.safeParse(data);

  if (!result.success) {
    return { errors: result.error.issues };
  }

  try {
    const user = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        name: result.data.name,
        email: result.data.email,
      },
    });   

    if (!user) {
      return { errors: [{ message: "Usuario o contraseña incorrectos" }] };
    } else {
      return {
        message: "Usuario actualizado correctamente",
      };
    }
  } catch (error) {
    console.log(error);
  }
  
}

/**
 * Cambia la contraseña de un usuario.
 * 
 * @async
 * @function changePasswordUser
 * @param {unknown} data - Datos de la nueva contraseña.
 * @param {string} id - Identificador del usuario.
 * @returns {Promise<Object>} Resultado del cambio de contraseña.
 */
export async function changePasswordUser(data: unknown, id: string) {
  const result = CorrectPasswordSchema.safeParse(data)

  if (!result.success) {
    return { errors: result.error.issues };
  }

  try {
    const pass = await prisma.user.update({
      where: {
        id: id
      },
      data: {
        password: result.data.password,
      },
    })

    if (!pass) {
      return { errors: [{ message: "la contraseña introducida no cumple los requisitos minimos o el usuario no esta autorizado" }] };
    } else { 
      return {
        message: "Contraseña actualizada correctamente"
      }
    }

  } catch (error) {
    console.log(error);
    
  }
}
