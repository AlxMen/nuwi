import { create } from 'zustand'
import { ProcedItem } from './types'

interface Store {
  projects: ProcedItem[]
}

export const useStore = create<Store>( () => ({
  projects: []
}))

