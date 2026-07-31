/**
 * LocalStorage service for persisting data
 */

const STORAGE_PREFIX = 'math-practice:'

export const storageService = {
  /**
   * Set an item in localStorage
   */
  setItem<T>(key: string, value: T): void {
    try {
      const serialized = JSON.stringify(value)
      localStorage.setItem(`${STORAGE_PREFIX}${key}`, serialized)
    } catch (error) {
      console.error(`Failed to set item ${key}:`, error)
    }
  },

  /**
   * Get an item from localStorage
   */
  getItem<T>(key: string, defaultValue?: T): T | null {
    try {
      const item = localStorage.getItem(`${STORAGE_PREFIX}${key}`)
      if (item === null) {
        return defaultValue ?? null
      }
      return JSON.parse(item) as T
    } catch (error) {
      console.error(`Failed to get item ${key}:`, error)
      return defaultValue ?? null
    }
  },

  /**
   * Remove an item from localStorage
   */
  removeItem(key: string): void {
    try {
      localStorage.removeItem(`${STORAGE_PREFIX}${key}`)
    } catch (error) {
      console.error(`Failed to remove item ${key}:`, error)
    }
  },

  /**
   * Clear all items from localStorage
   */
  clear(): void {
    try {
      const keys = Object.keys(localStorage)
      keys.forEach((key) => {
        if (key.startsWith(STORAGE_PREFIX)) {
          localStorage.removeItem(key)
        }
      })
    } catch (error) {
      console.error('Failed to clear storage:', error)
    }
  },
}
