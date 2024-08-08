"use server"

import { prisma } from "@/src/lib/prisma";
import { ProjectSchema } from "@/src/schema";
import { currentDate } from "@/src/utils/currentDate";

export async function getCategory() {
  return await prisma.category.findMany();
}

export async function getProjectCount(query: string) {
  return await prisma.proceeding.count();
}
export async function getProjectByCategoryAndQuery(
  category: string,
  query: string,
  currentPage: number,
) {
  const pageSize = 10
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
        { nExp: { contains: query } },
        { name: { contains: query } },
      ],
    },
  });
}

export async function createProject(data: unknown, email: string) {
  
  const result = ProjectSchema.safeParse(data)
  if (!result.success) {
    return {
      errors: result.error.issues,
    }
  }

  const dataUser = await prisma.user.findUnique({
    where: { email: email },
  });
  if (!dataUser) {
    return { errors: [{ message: "El usuario no existe" }] }
  }

  const dateupdate = currentDate()

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
    }
  })

  if (response) {
    
    return {
      message: "Proyecto creado exitosamente",
    }
  }
  
}