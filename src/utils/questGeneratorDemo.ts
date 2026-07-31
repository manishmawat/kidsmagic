/**
 * Utility for testing and demonstrating the question generator
 * This file shows how to use all the math question generation functions
 */

import {
  generateAdditionQuestions,
  generateSubtractionQuestions,
  generateMultiplicationQuestions,
  generateDivisionQuestions,
  generateMixedQuestions,
  validateAnswer,
  getQuestionDisplay,
} from '@/services/mathService'
import type { Question, DigitLevel } from '@/types'

/**
 * Demo: Generate questions for all operations and difficulty levels
 */
export function demoGenerateAllQuestions() {
  console.log('=== Math Question Generator Demo ===\n')

  const digitLevels: DigitLevel[] = [1, 2, 3]

  digitLevels.forEach((level) => {
    console.log(`\n--- Digit Level: ${level} digit${level > 1 ? 's' : ''} ---`)

    // Addition
    console.log('\nAddition Questions:')
    const addQuestions = generateAdditionQuestions(level, 3)
    addQuestions.forEach((q) => {
      console.log(`  ${getQuestionDisplay(q)} = ${q.answer}`)
    })

    // Subtraction
    console.log('\nSubtraction Questions:')
    const subQuestions = generateSubtractionQuestions(level, 3)
    subQuestions.forEach((q) => {
      console.log(`  ${getQuestionDisplay(q)} = ${q.answer}`)
    })

    // Multiplication
    console.log('\nMultiplication Questions:')
    const mulQuestions = generateMultiplicationQuestions(level, 3)
    mulQuestions.forEach((q) => {
      console.log(`  ${getQuestionDisplay(q)} = ${q.answer}`)
    })

    // Division
    console.log('\nDivision Questions:')
    const divQuestions = generateDivisionQuestions(level, 3)
    divQuestions.forEach((q) => {
      console.log(`  ${getQuestionDisplay(q)} = ${q.answer}`)
    })
  })
}

/**
 * Demo: Generate exactly 20 questions for each operation at 2-digit level
 */
export function demoGenerate20Questions() {
  console.log('\n=== Generating 20 Questions per Operation (2-digit level) ===\n')

  console.log('Addition (20 questions):')
  const addQuestions = generateAdditionQuestions(2, 20)
  console.log(`  Generated ${addQuestions.length} questions`)
  console.log(`  First 5: ${addQuestions.slice(0, 5).map(getQuestionDisplay).join(', ')}`)

  console.log('\nMultiplication (20 questions):')
  const mulQuestions = generateMultiplicationQuestions(2, 20)
  console.log(`  Generated ${mulQuestions.length} questions`)
  console.log(`  First 5: ${mulQuestions.slice(0, 5).map(getQuestionDisplay).join(', ')}`)

  console.log('\nDivision (20 questions):')
  const divQuestions = generateDivisionQuestions(2, 20)
  console.log(`  Generated ${divQuestions.length} questions`)
  console.log(`  All have whole-number answers: ${divQuestions.every((q) => q.operand1 % q.operand2 === 0)}`)
  console.log(`  First 5: ${divQuestions.slice(0, 5).map(getQuestionDisplay).join(', ')}`)
}

/**
 * Demo: Verify question uniqueness
 */
export function demoVerifyUniqueness() {
  console.log('\n=== Verifying Question Uniqueness ===\n')

  const addQuestions = generateAdditionQuestions(2, 20)
  const displays = addQuestions.map((q) => `${q.operand1}+${q.operand2}`)
  const uniqueDisplays = new Set(displays)

  console.log(`Addition: Generated ${addQuestions.length}, Unique: ${uniqueDisplays.size}`)
  console.log(`  All unique: ${addQuestions.length === uniqueDisplays.size}`)

  const mulQuestions = generateMultiplicationQuestions(2, 20)
  const mulDisplays = mulQuestions.map((q) => {
    const sorted = [q.operand1, q.operand2].sort().join('*')
    return sorted
  })
  const uniqueMulDisplays = new Set(mulDisplays)

  console.log(`Multiplication: Generated ${mulQuestions.length}, Unique: ${uniqueMulDisplays.size}`)
  console.log(`  All unique: ${mulQuestions.length === uniqueMulDisplays.size}`)
}

/**
 * Demo: Test answer validation
 */
export function demoValidateAnswers() {
  console.log('\n=== Testing Answer Validation ===\n')

  const questions = generateAdditionQuestions(1, 3)

  questions.forEach((q) => {
    const display = getQuestionDisplay(q)
    const correctAnswer = q.answer
    const incorrectAnswer = q.answer + 1

    console.log(`Question: ${display}`)
    console.log(`  Correct answer (${correctAnswer}): ${validateAnswer(q, correctAnswer) ? '✓' : '✗'}`)
    console.log(`  Wrong answer (${incorrectAnswer}): ${validateAnswer(q, incorrectAnswer) ? '✗' : '✓'}`)
  })
}

/**
 * Demo: Generate mixed questions
 */
export function demoMixedQuestions() {
  console.log('\n=== Generating Mixed Questions ===\n')

  const mixed = generateMixedQuestions(2, 20)

  const operations = mixed.reduce(
    (acc, q) => {
      acc[q.operation] = (acc[q.operation] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  console.log(`Total questions: ${mixed.length}`)
  console.log('Operation breakdown:')
  Object.entries(operations).forEach(([op, count]) => {
    console.log(`  ${op}: ${count}`)
  })

  console.log('\nFirst 5 questions:')
  mixed.slice(0, 5).forEach((q) => {
    console.log(`  ${getQuestionDisplay(q)} = ?`)
  })
}

/**
 * Run all demos
 */
export function runAllDemos() {
  demoGenerateAllQuestions()
  demoGenerate20Questions()
  demoVerifyUniqueness()
  demoValidateAnswers()
  demoMixedQuestions()
  console.log('\n=== All Demos Complete ===\n')
}

// Export for testing purposes
export const questGeneratorDemo = {
  demoGenerateAllQuestions,
  demoGenerate20Questions,
  demoVerifyUniqueness,
  demoValidateAnswers,
  demoMixedQuestions,
  runAllDemos,
}
