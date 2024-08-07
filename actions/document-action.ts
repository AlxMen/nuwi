"use server"

import { prisma } from "@/src/lib/prisma"
import { DocumentSchema } from "@/src/schema"

export async function createDocument(data: unknown) {
  const result = DocumentSchema.safeParse(data)

  if (!result.success) {
    return { errors: result.error.issues }
  }

  try {
    /*
    await prisma.document.create({
      data: {
        name: result.data.name,
        date: result.data.date,
        regisNumber: result.data.regisNumber,
        path: result.data.path,
      },
    })
    */
  } catch (error) {
    console.log(error);
  }
}