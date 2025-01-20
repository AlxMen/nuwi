"use server";

import { prisma } from "@/src/lib/prisma";
import { EditProjectSchema, ProjectSchema } from "@/src/schema";
import { currentDate } from "@/src/utils/currentDate";
import { redirect } from "next/navigation";

/**
 * Obtiene todas las categorías.
 * 
 * @async
 * @function getCategory
 * @returns {Promise<Array<Object>>} Lista de categorías.
 */
export async function getCategory() {
  return await prisma.category.findMany();
}

/**
 * Obtiene el conteo total de proyectos según una consulta y categoría.
 * 
 * @async
 * @function getProjectCount
 * @param {string} query - Término de búsqueda.
 * @param {string} category - Categoría del proyecto.
 * @returns {Promise<number>} Total de proyectos.
 */
export async function getProjectCount(query: string, category: string){
  return await prisma.proceeding.count({
    where: {
      category,
      OR: [
        {
          nExp: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          name: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          type: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
    },
  });
}

/**
 * Obtiene un proyecto por su identificador.
 * 
 * @async
 * @function getProjectById
 * @param {string} id - Identificador del proyecto.
 * @returns {Promise<Object>} Proyecto encontrado.
 */
export async function getProjectById(id: string) {

  return await prisma.proceeding.findFirst({
    where: {
      id,
    },
    include: {
      lastuser: true,
    },
  });
}

/**
 * Obtiene proyectos por categoría y consulta de búsqueda con paginación.
 * 
 * @async
 * @function getProjectByCategoryAndQuery
 * @param {string} category - Categoría del proyecto.
 * @param {string} query - Término de búsqueda.
 * @param {number} currentPage - Página actual.
 * @returns {Promise<Array<Object>>} Lista de proyectos.
 */
export async function getProjectByCategoryAndQuery(
  category: string,
  query: string,
  currentPage: number
) {
  const pageSize = 10;
  const skip = (currentPage - 1) * pageSize;
  
  return await prisma.proceeding.findMany({
    take: pageSize,
    skip,
    include: {
      lastuser: true,
    },
    where: {
      category: {
        equals: category,
      },
      OR: [
        {
          nExp: {
            contains: query,
            mode: "insensitive"
          },
        },
        {
          name: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          type: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
    },
  });
}

/**
 * Crea un nuevo proyecto en la base de datos.
 * 
 * @async
 * @function createProject
 * @param {unknown} data - Datos del proyecto.
 * @param {string} email - Correo electrónico del usuario que crea el proyecto.
 * @returns {Promise<Object>} Resultado de la creación del proyecto.
 */
export async function createProject(data: unknown, email: string) {
  const result = ProjectSchema.safeParse(data);
  if (!result.success) {
    return {
      errors: result.error.issues,
    };
  }

  const dataUser = await prisma.user.findUnique({
    where: { email: email },
  });
  if (!dataUser) {
    return { errors: [{ message: "El usuario no existe" }] };
  }

  const dateupdate = currentDate();

  const response = await prisma.proceeding.create({
    data: {
      nExp: result.data.nexp,
      name: result.data.name,
      category: result.data.category,
      type: result.data.type,
      createdexp: result.data.date,
      lastupdate: dateupdate,
      applicant: result.data.applicant,
      userId: dataUser.id,
    },
  });

  if (response) {
    return {
      message: "Proyecto creado exitosamente",
    };
  }
}

/**
 * Actualiza un proyecto existente en la base de datos.
 * 
 * @async
 * @function updateProject
 * @param {unknown} data - Datos actualizados del proyecto.
 * @returns {Promise<Object>} Resultado de la actualización del proyecto.
 */
export async function updateProject(data: unknown) {
  const result = EditProjectSchema.safeParse(data);

  if (!result.success) {
    return {
      errors: result.error.issues,
    };
  }

  const response = await prisma.proceeding.update({
    where: { id: result.data.id },
    data: {
      name: result.data.name,
      status: result.data.status,
      lastupdate: currentDate(),
    },
  })
  if (!response) {
    return {
      errors: [{ message: "No se pudo actualizar el proyecto" }],
    }
  }
  else {
    redirect(`/home/${response.category}`)
  }
}

/**
 * Elimina un proyecto de la base de datos.
 * 
 * @async
 * @function deleteProject
 * @param {string} id - Identificador del proyecto a eliminar.
 * @returns {Promise<Object>} Resultado de la eliminación del proyecto.
 */
export async function deleteProject(id: string) {
  const response = await prisma.proceeding.delete({
    where: { id },
  });

  if (!response) {
    return {
      errors: [{ message: "No se pudo eliminar el proyecto" }],
    };
  }
  else {
    redirect(`/home/${response.category}`)
  }
  
}