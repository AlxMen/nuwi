"use server";

import { prisma } from "@/src/lib/prisma";
import { UserSchema } from "@/src/schema";
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
            name: user.name,
            role: user.role,
            email: user.email,
          },
          "OAOAServices",
          { expiresIn: "7h" }
        ),
      };
    }
  } catch (error) {
    console.log(error);
  }
}
