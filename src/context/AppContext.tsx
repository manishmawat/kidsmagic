import { createContext, useContext } from 'react'
import type { User, AppSettings, Statistics } from '@/types'
import type { ReactNode } from 'react'

interface AppContextType {
  user: User | null
  settings: AppSettings | null
  statistics: Statistics | null
  isLoading: boolean
  setUser: (user: User | null) => void
  updateSettings: (settings: Partial<AppSettings>) => void
  updateStatistics: (stats: Partial<Statistics>) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider = ({ children }: { children: ReactNode }) => {
  // This will be populated with actual logic
  const value: AppContextType = {
    user: null,
    settings: null,
    statistics: null,
    isLoading: false,
    setUser: () => {},
    updateSettings: () => {},
    updateStatistics: () => {},
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useApp = () => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}
