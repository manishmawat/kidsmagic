/**
 * User-related types
 */
export interface User {
  id: string
  name: string
  createdAt: Date
  updatedAt: Date
}

/**
 * Progress-related types
 */
export interface ProgressRecord {
  id: string
  userId: string
  questId: string
  status: 'in-progress' | 'completed'
  correctAnswers: number
  totalQuestions: number
  timeSpent: number // in seconds
  startedAt: Date
  completedAt: Date | null
}

/**
 * Quest/Activity types
 */
export interface Quest {
  id: string
  title: string
  description: string
  type: 'addition' | 'subtraction' | 'multiplication' | 'division' | 'mixed'
  difficulty: 'easy' | 'medium' | 'hard'
  questionsCount: number
  estimatedTime: number // in minutes
}

/**
 * Statistics types
 */
export interface Statistics {
  userId: string
  totalQuestsCompleted: number
  totalCorrectAnswers: number
  totalQuestions: number
  streakDays: number
  accuracy: number // percentage
  lastActiveDate: Date | null
}

/**
 * Settings types
 */
export interface AppSettings {
  userId: string
  theme: 'light' | 'dark' | 'auto'
  soundEnabled: boolean
  animationsEnabled: boolean
  difficulty: 'easy' | 'medium' | 'hard'
  questsPerSession: number
}

// Re-export question types
export type {
  Question,
  QuestionDisplay,
  QuestionResult,
  QuestionGenerationConfig,
  DifficultyLevel,
  DigitLevel,
  OperationType,
} from './question'
