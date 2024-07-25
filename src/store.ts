import { create } from 'zustand'
import { ProcedItem } from './types'
import { prisma } from './lib/prisma'

interface Store {
  projects: ProcedItem[]
}

export const useStore = create<Store>( () => ({
  projects: []
}))

export async function getCategory() {
  return await prisma.category.findMany()
}

export async function getProjectByCategory(category: string) { 
  return await prisma.proceeding.findMany({
    include: {
      lastuser: true
    },
    where: {
      category: {
        equals: category
      }
    }
  })
}