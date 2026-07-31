import { storageService } from './storageService'
import type { User, AppSettings, Statistics, ProgressRecord } from '@/types'

/**
 * User service for managing user data
 */

export const userService = {
  /**
   * Get or create a user
   */
  getOrCreateUser(): User {
    let user = storageService.getItem<User>('user')

    if (!user) {
      user = {
        id: `user_${Date.now()}`,
        name: 'Math Learner',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      storageService.setItem('user', user)
    }

    return user
  },

  /**
   * Update user data
   */
  updateUser(updates: Partial<User>): User {
    const user = this.getOrCreateUser()
    const updated = {
      ...user,
      ...updates,
      updatedAt: new Date(),
    }
    storageService.setItem('user', updated)
    return updated
  },

  /**
   * Get or create user settings
   */
  getOrCreateSettings(): AppSettings {
    const user = this.getOrCreateUser()
    let settings = storageService.getItem<AppSettings>('settings')

    if (!settings) {
      settings = {
        userId: user.id,
        theme: 'auto',
        soundEnabled: true,
        animationsEnabled: true,
        difficulty: 'medium',
        questsPerSession: 10,
      }
      storageService.setItem('settings', settings)
    }

    return settings
  },

  /**
   * Update user settings
   */
  updateSettings(updates: Partial<AppSettings>): AppSettings {
    const settings = this.getOrCreateSettings()
    const updated = {
      ...settings,
      ...updates,
    }
    storageService.setItem('settings', updated)
    return updated
  },

  /**
   * Get or create user statistics
   */
  getOrCreateStatistics(): Statistics {
    const user = this.getOrCreateUser()
    let stats = storageService.getItem<Statistics>('statistics')

    if (!stats) {
      stats = {
        userId: user.id,
        totalQuestsCompleted: 0,
        totalCorrectAnswers: 0,
        totalQuestions: 0,
        streakDays: 0,
        accuracy: 0,
        lastActiveDate: null,
      }
      storageService.setItem('statistics', stats)
    }

    return stats
  },

  /**
   * Update statistics
   */
  updateStatistics(updates: Partial<Statistics>): Statistics {
    const stats = this.getOrCreateStatistics()
    const updated = {
      ...stats,
      ...updates,
      lastActiveDate: new Date(),
    }
    storageService.setItem('statistics', updated)
    return updated
  },

  /**
   * Get all progress records
   */
  getProgressRecords(): ProgressRecord[] {
    const records = storageService.getItem<ProgressRecord[]>('progress-records')
    return records ?? []
  },

  /**
   * Save a progress record
   */
  saveProgressRecord(record: ProgressRecord): void {
    const records = this.getProgressRecords()
    const index = records.findIndex((r) => r.id === record.id)

    if (index >= 0) {
      records[index] = record
    } else {
      records.push(record)
    }

    storageService.setItem('progress-records', records)
  },

  /**
   * Clear all user data
   */
  clearAllData(): void {
    storageService.clear()
  },
}
