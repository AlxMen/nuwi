import { create } from 'zustand'
import { ProcedItem } from './types'
import { prisma } from './lib/prisma'

interface Store {
  projects: ProcedItem[]
}

export const useStore = create<Store>( () => ({
  projects: []
}))

