import type { Question, DifficultyLevel, DigitLevel, OperationType } from '@/types/question'

/**
 * Get the range of numbers for a given digit level
 */
function getNumberRange(digitLevel: DigitLevel): { min: number; max: number } {
  switch (digitLevel) {
    case 1:
      return { min: 1, max: 9 }
    case 2:
      return { min: 10, max: 99 }
    case 3:
      return { min: 100, max: 999 }
    default:
      return { min: 1, max: 9 }
  }
}

/**
 * Generate a random number within a range
 */
function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Generate a unique ID for a question
 */
function generateQuestionId(): string {
  return `q_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Determine difficulty based on operands and operation
 */
function calculateDifficulty(
  _operand1: number,
  _operand2: number,
  operation: OperationType,
  digitLevel: DigitLevel,
): DifficultyLevel {
  if (digitLevel === 1) {
    return 'easy'
  }

  if (digitLevel === 2) {
    return operation === 'multiplication' ? 'hard' : 'medium'
  }

  return 'hard'
}

/**
 * Generate addition questions
 * Ensures no duplicate questions are generated
 */
export function generateAdditionQuestions(digitLevel: DigitLevel, count: number = 20): Question[] {
  const questions: Question[] = []
  const range = getNumberRange(digitLevel)
  const seenQuestions = new Set<string>()
  let attempts = 0
  const maxAttempts = count * 100

  while (questions.length < count && attempts < maxAttempts) {
    attempts++

    const operand1 = getRandomNumber(range.min, range.max)
    const operand2 = getRandomNumber(range.min, range.max)
    const answer = operand1 + operand2

    // Create a signature to ensure uniqueness (order-independent for addition)
    const signature = [operand1, operand2].sort().join(',')

    if (seenQuestions.has(signature)) {
      continue
    }

    seenQuestions.add(signature)

    const question: Question = {
      id: generateQuestionId(),
      operand1,
      operand2,
      operation: 'addition',
      answer,
      difficulty: calculateDifficulty(operand1, operand2, 'addition', digitLevel),
      digitLevel,
    }

    questions.push(question)
  }

  return questions
}

/**
 * Generate subtraction questions
 * Ensures operand1 >= operand2 to avoid negative results
 */
export function generateSubtractionQuestions(digitLevel: DigitLevel, count: number = 20): Question[] {
  const questions: Question[] = []
  const range = getNumberRange(digitLevel)
  const seenQuestions = new Set<string>()
  let attempts = 0
  const maxAttempts = count * 100

  while (questions.length < count && attempts < maxAttempts) {
    attempts++

    let operand1 = getRandomNumber(range.min, range.max)
    let operand2 = getRandomNumber(range.min, range.max)

    // Ensure operand1 >= operand2
    if (operand1 < operand2) {
      [operand1, operand2] = [operand2, operand1]
    }

    const answer = operand1 - operand2
    const signature = `${operand1},${operand2}`

    if (seenQuestions.has(signature)) {
      continue
    }

    seenQuestions.add(signature)

    const question: Question = {
      id: generateQuestionId(),
      operand1,
      operand2,
      operation: 'subtraction',
      answer,
      difficulty: calculateDifficulty(operand1, operand2, 'subtraction', digitLevel),
      digitLevel,
    }

    questions.push(question)
  }

  return questions
}

/**
 * Generate multiplication questions
 */
export function generateMultiplicationQuestions(digitLevel: DigitLevel, count: number = 20): Question[] {
  const questions: Question[] = []
  const range = getNumberRange(digitLevel)
  const seenQuestions = new Set<string>()
  let attempts = 0
  const maxAttempts = count * 100

  while (questions.length < count && attempts < maxAttempts) {
    attempts++

    const operand1 = getRandomNumber(range.min, range.max)
    const operand2 = getRandomNumber(range.min, range.max)
    const answer = operand1 * operand2

    // Create a signature to ensure uniqueness (order-independent for multiplication)
    const signature = [operand1, operand2].sort().join(',')

    if (seenQuestions.has(signature)) {
      continue
    }

    seenQuestions.add(signature)

    const question: Question = {
      id: generateQuestionId(),
      operand1,
      operand2,
      operation: 'multiplication',
      answer,
      difficulty: calculateDifficulty(operand1, operand2, 'multiplication', digitLevel),
      digitLevel,
    }

    questions.push(question)
  }

  return questions
}

/**
 * Generate division questions
 * Ensures divisor is never 0 and answer is always a whole number
 */
export function generateDivisionQuestions(digitLevel: DigitLevel, count: number = 20): Question[] {
  const questions: Question[] = []
  const range = getNumberRange(digitLevel)
  const seenQuestions = new Set<string>()
  let attempts = 0
  const maxAttempts = count * 100

  while (questions.length < count && attempts < maxAttempts) {
    attempts++

    // Generate divisor first (cannot be 0)
    let divisor = getRandomNumber(range.min, range.max)
    if (divisor === 0) {
      divisor = 1
    }

    // Generate quotient (the answer we want)
    let quotient = getRandomNumber(range.min, range.max)

    // Dividend = divisor * quotient (ensures whole number result)
    const operand1 = divisor * quotient
    const operand2 = divisor
    const answer = quotient

    const signature = `${operand1},${operand2}`

    if (seenQuestions.has(signature)) {
      continue
    }

    seenQuestions.add(signature)

    const question: Question = {
      id: generateQuestionId(),
      operand1,
      operand2,
      operation: 'division',
      answer,
      difficulty: calculateDifficulty(operand1, operand2, 'division', digitLevel),
      digitLevel,
    }

    questions.push(question)
  }

  return questions
}

/**
 * Generate all four operations in one call
 */
export function generateMixedQuestions(
  digitLevel: DigitLevel,
  count: number = 20,
): Question[] {
  const perOperation = Math.floor(count / 4)
  const remainder = count % 4

  const questions = [
    ...generateAdditionQuestions(digitLevel, perOperation + (remainder > 0 ? 1 : 0)),
    ...generateSubtractionQuestions(digitLevel, perOperation + (remainder > 1 ? 1 : 0)),
    ...generateMultiplicationQuestions(digitLevel, perOperation + (remainder > 2 ? 1 : 0)),
    ...generateDivisionQuestions(digitLevel, perOperation),
  ]

  // Shuffle the questions
  return questions.sort(() => Math.random() - 0.5)
}

/**
 * Validate an answer to a question
 */
export function validateAnswer(question: Question, userAnswer: number): boolean {
  return userAnswer === question.answer
}

/**
 * Get display text for a question
 */
export function getQuestionDisplay(question: Question): string {
  const operationSymbols: Record<string, string> = {
    addition: '+',
    subtraction: '−',
    multiplication: '×',
    division: '÷',
  }

  const symbol = operationSymbols[question.operation] || '?'
  return `${question.operand1} ${symbol} ${question.operand2}`
}
