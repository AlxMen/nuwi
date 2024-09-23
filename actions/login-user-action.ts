"use server";

import { prisma } from "@/src/lib/prisma";
import { CorrectPasswordSchema, DataUserSchema, UserChangeSchema, UserSchema } from "@/src/schema";
import { error } from "console";
import jwt from "jsonwebtoken";

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
