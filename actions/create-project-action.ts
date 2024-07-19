"use server"

import { ProjectSchema } from "@/src/schema";


export async function createProject(data: unknown, user: string) {
  
  const result = ProjectSchema.safeParse(data)
  if (!result.success) {
    return {
      errors: result.error.issues,
    }
  }
  console.log(data, user);
  
  
}