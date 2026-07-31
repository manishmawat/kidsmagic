import React, { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import {
  generateAdditionQuestions,
  generateMultiplicationQuestions,
  generateDivisionQuestions,
  generateSubtractionQuestions,
  generateMixedQuestions,
  getQuestionDisplay,
  validateAnswer,
} from '@/services/mathService'
import type { Question, DigitLevel } from '@/types'

type OperationType = 'addition' | 'subtraction' | 'multiplication' | 'division' | 'mixed'

export const QuestionGeneratorDemo: React.FC = () => {
  const [operation, setOperation] = useState<OperationType>('addition')
  const [digitLevel, setDigitLevel] = useState<DigitLevel>(1)
  const [questions, setQuestions] = useState<Question[]>([])
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [showAnswers, setShowAnswers] = useState(false)

  const handleGenerateQuestions = () => {
    let newQuestions: Question[] = []

    switch (operation) {
      case 'addition':
        newQuestions = generateAdditionQuestions(digitLevel, 20)
        break
      case 'subtraction':
        newQuestions = generateSubtractionQuestions(digitLevel, 20)
        break
      case 'multiplication':
        newQuestions = generateMultiplicationQuestions(digitLevel, 20)
        break
      case 'division':
        newQuestions = generateDivisionQuestions(digitLevel, 20)
        break
      case 'mixed':
        newQuestions = generateMixedQuestions(digitLevel, 20)
        break
    }

    setQuestions(newQuestions)
    setAnswers({})
    setShowAnswers(false)
  }

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value === '' ? 0 : parseInt(value, 10),
    }))
  }

  const getCorrectCount = () => {
    return questions.filter((q) => validateAnswer(q, answers[q.id] || 0)).length
  }

  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Question Generator Demo</CardTitle>
          <CardDescription>
            Generate and test 20 unique math questions for each operation and difficulty level
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Controls */}
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-medium">Operation</label>
              <select
                value={operation}
                onChange={(e) => setOperation(e.target.value as OperationType)}
                className="w-full rounded-md border border-border bg-background px-3 py-2"
              >
                <option value="addition">Addition</option>
                <option value="subtraction">Subtraction</option>
                <option value="multiplication">Multiplication</option>
                <option value="division">Division</option>
                <option value="mixed">Mixed</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Digit Level</label>
              <select
                value={digitLevel}
                onChange={(e) => setDigitLevel(parseInt(e.target.value) as DigitLevel)}
                className="w-full rounded-md border border-border bg-background px-3 py-2"
              >
                <option value="1">1 Digit (1-9)</option>
                <option value="2">2 Digits (10-99)</option>
                <option value="3">3 Digits (100-999)</option>
              </select>
            </div>

            <div className="flex items-end">
              <Button onClick={handleGenerateQuestions} className="w-full">
                Generate Questions
              </Button>
            </div>
          </div>

          {/* Stats */}
          {questions.length > 0 && (
            <div className="rounded-lg bg-muted p-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="text-2xl font-bold">{questions.length}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Correct</p>
                  <p className="text-2xl font-bold text-green-600">{getCorrectCount()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Accuracy</p>
                  <p className="text-2xl font-bold">
                    {questions.length > 0
                      ? Math.round((getCorrectCount() / questions.length) * 100)
                      : 0}
                    %
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Questions Grid */}
      {questions.length > 0 && (
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Questions</h3>
            <Button
              variant={showAnswers ? 'default' : 'outline'}
              onClick={() => setShowAnswers(!showAnswers)}
            >
              {showAnswers ? 'Hide Answers' : 'Show Answers'}
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {questions.map((question) => {
              const isCorrect = validateAnswer(question, answers[question.id] || 0)
              const answered = question.id in answers

              return (
                <Card
                  key={question.id}
                  className={`transition-all ${
                    answered ? (isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50') : ''
                  }`}
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">{getQuestionDisplay(question)}</CardTitle>
                    <CardDescription className="text-xs">
                      {question.digitLevel} digit | {question.difficulty}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {showAnswers && <p className="text-sm font-semibold text-green-600">Answer: {question.answer}</p>}

                    <input
                      type="number"
                      value={answers[question.id] ?? ''}
                      onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                      placeholder="Your answer"
                      className="w-full rounded-md border border-border bg-background px-2 py-1 text-center text-sm"
                    />

                    {answered && (
                      <p className={`text-xs font-medium ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                        {isCorrect ? '✓ Correct' : `✗ Wrong (answer: ${question.answer})`}
                      </p>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      )}

      {/* Features List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Generator Features</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li className="flex gap-2">
              <span>✓</span>
              <span>Generates exactly 20 unique questions per request</span>
            </li>
            <li className="flex gap-2">
              <span>✓</span>
              <span>Supports 1, 2, and 3 digit difficulty levels</span>
            </li>
            <li className="flex gap-2">
              <span>✓</span>
              <span>Division always produces whole-number answers</span>
            </li>
            <li className="flex gap-2">
              <span>✓</span>
              <span>Subtraction never produces negative results</span>
            </li>
            <li className="flex gap-2">
              <span>✓</span>
              <span>Duplicates automatically prevented</span>
            </li>
            <li className="flex gap-2">
              <span>✓</span>
              <span>Full TypeScript type safety</span>
            </li>
            <li className="flex gap-2">
              <span>✓</span>
              <span>Mixed mode for variety across all operations</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
