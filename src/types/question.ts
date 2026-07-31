/**
 * Question and Answer related types
 */

export type DifficultyLevel = 'easy' | 'medium' | 'hard'
export type DigitLevel = 1 | 2 | 3
export type OperationType = 'addition' | 'subtraction' | 'multiplication' | 'division'

/**
 * Represents a single math question
 */
export interface Question {
  id: string
  operand1: number
  operand2: number
  operation: OperationType
  answer: number
  difficulty: DifficultyLevel
  digitLevel: DigitLevel
}

/**
 * Represents a question with answer hidden (for display)
 */
export interface QuestionDisplay extends Omit<Question, 'answer'> {
  displayText: string
}

/**
 * Result of answering a question
 */
export interface QuestionResult {
  questionId: string
  userAnswer: number
  isCorrect: boolean
  timeSpent: number // in seconds
}

/**
 * Configuration for question generation
 */
export interface QuestionGenerationConfig {
  count: number
  digitLevel: DigitLevel
  difficulty?: DifficultyLevel
}
