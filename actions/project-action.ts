"use server";

import { prisma } from "@/src/lib/prisma";
import { EditProjectSchema, ProjectSchema } from "@/src/schema";
import { currentDate } from "@/src/utils/currentDate";
import { redirect } from "next/navigation";

export async function getCategory() {
  return await prisma.category.findMany();
}

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

export async function getProjectById(id: string) {
  return await prisma.proceeding.findUnique({
    where: {
      id,
    },
    include: {
      lastuser: true,
    },
  });
}

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

  console.log(dateupdate);

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