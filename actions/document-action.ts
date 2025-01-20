"use server";

import { prisma } from "@/src/lib/prisma";
import { DocumentSchema } from "@/src/schema";
import { currentDate } from "@/src/utils/currentDate";

/**
 * Sube un archivo al servidor.
 *
 * @async
 * @function uploadFile
 * @param {FormData} fileFormData - FormData del archivo a subir.
 * @returns {Promise<Object>} Resultado de la subida del archivo.
 */
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

/**
 * Crea un nuevo documento en la base de datos.
 *
 * @async
 * @function createDocument
 * @param {Object} data - Datos del documento.
 * @param {string} procced - Identificador del procedimiento asociado.
 * @param {string} user - Identificador del usuario que crea el documento.
 * @returns {Promise<Object>} Resultado de la creación del documento.
 */
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

/**
 * Obtiene el total de documentos de un proyecto específico según un término de búsqueda.
 *
 * @async
 * @function getTotalDocumentsByProject
 * @param {string} projectId - Identificador del proyecto.
 * @param {string} query - Término de búsqueda.
 * @returns {Promise<number>} Total de documentos del proyecto.
 */
export async function getTotalDocumentsByProject(
  projectId: string,
  query: string
) {
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

/**
 * Obtiene los documentos de un proyecto específico con paginación y filtros.
 *
 * @async
 * @function getDocumentByProject
 * @param {string} projectId - Identificador del proyecto.
 * @param {number} currentPage - Página actual.
 * @param {string} query - Término de búsqueda.
 * @param {string} filterOr - Orden de los documentos.
 * @returns {Promise<Array<Object>>} Lista de documentos del proyecto.
 */
export async function getDocumentByProject(
  projectId: string,
  currentPage: number,
  query: string,
  filterOr: string
) {
  const pageSize = 20;
  const skip = (currentPage - 1) * pageSize;
  console.log(filterOr);

  const option = Number(filterOr) || 0;

  const tipeOption = ["date", "date", "regisNumber", "name"];

  const filterOrder = ["asc", "desc", "asc", "asc"];

  return await prisma.document.findMany({
    take: pageSize,
    skip,
    orderBy: [
      {
        [tipeOption[option]]: filterOrder[option],
      },
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

/**
 * Actualiza un documento existente en la base de datos.
 *
 * @async
 * @function updateDocument
 * @param {string} id - Identificador del documento a actualizar.
 * @param {Object} data - Datos actualizados del documento.
 * @returns {Promise<Object>} Resultado de la actualización del documento.
 */
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
    },
  });
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

/**
 * Elimina un documento de la base de datos.
 *
 * @async
 * @function deleteDocument
 * @param {string} id - Identificador del documento a eliminar.
 * @returns {Promise<Object>} Resultado de la eliminación del documento.
 */
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
