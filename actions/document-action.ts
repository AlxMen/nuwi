"use server";

import { prisma } from "@/src/lib/prisma";
import { DocumentSchema } from "@/src/schema";
import { currentDate } from "@/src/utils/currentDate";


export async function uploadFile(fileFormData: FormData) {
  try {
    await fetch("http://localhost:3000/api/upload", {
      method: "POST",
      body: fileFormData,
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return { error: "Failed to upload file" };
  }
};

export async function createDocument(
  data: unknown,
  procced: string,
  user: string,
) {
  const result = DocumentSchema.safeParse(data);

  if (!result.success) {
    return { errors: result.error.issues };
  }

  try {
    const newDocument = prisma.document.create({
      data: {
        name: result.data.name,
        date: result.data.date,
        regisNumber: result.data.regisNumber,
        path: result.data.path,
        proceedId: procced,
      },
    });

    const updateModifUser = prisma.proceeding.update({
      where: { id: procced },
      data: {
        lastupdate: currentDate(),
        userId: user,
      },
    });

    await Promise.all([newDocument, updateModifUser]);

    return {
      message: "Documento creado exitosamente",
    };

  } catch (error) {
    return { errors: [{ message: "Hubo un error al crear el documento" }] };
  }
}
