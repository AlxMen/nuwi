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
}

export async function createDocument(
  data: unknown,
  procced: string,
  user: string
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

export async function getTotalDocumentsByProject(projectId: string, query: string){
  return await prisma.document.count({
    where: {
      proceedId: projectId,
      OR: [
        {
          name: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          regisNumber: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          date: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
    },
  });
}

export async function getDocumentByProject(
  projectId: string,
  currentPage: number,
  query: string,
  filterOr: string
) {
  const pageSize = 20;
  const skip = (currentPage - 1) * pageSize;
  console.log(filterOr);
  
  const option = Number(filterOr) || 0

  const tipeOption = [
    "date",
    "date",
    "regisNumber",
    "name",
  ]

  const filterOrder = [
    "asc",
    "desc",
    "asc",
    "asc",
  ]
  
  return await prisma.document.findMany({
    take: pageSize,
    skip,
    orderBy: [
      {
        [tipeOption[option]]: filterOrder[option],
      }
    ],
    where: {
      proceedId: projectId,
      OR: [
        {
          name: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          regisNumber: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          date: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
    },
  });
}

export async function updateDocument(
  id: string,
  data: {
    name: string;
    date: string;
    regisNumber: string;
}
) { 
  const response = await prisma.document.update({
    where: { id },
    data: {
      name: data.name,
      date: data.date,
      regisNumber: data.regisNumber,
    }
  })
  if (!response) {
    return {
      errors: [{ message: "No se pudo actualizar el documento" }],
    };
  } else {
    return {
      message: "Documento actualizado exitosamente",
    };
  }
}

export async function deleteDocument(id: string) {
  const response = await prisma.document.delete({
    where: { id },
  });
  if (!response) {
    return {
      errors: [{ message: "No se pudo eliminar el documento" }],
    };
  }
}