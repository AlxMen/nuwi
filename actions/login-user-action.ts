"use server";

import { prisma } from "@/src/lib/prisma";
import { DataUserSchema, UserSchema } from "@/src/schema";
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
          ext: user.ext,
          email: user.email,
          name: user.name,
          role: user.role,
          password: user.password,
        },
      };
    }
  } catch (error) {
    console.log(error);
  }
}
