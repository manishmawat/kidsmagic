import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Container } from '@/components/common/Container'
import { useTimer } from '@/hooks'
import { storageService } from '@/services'
import {
  generateAdditionQuestions,
  generateMultiplicationQuestions,
  generateDivisionQuestions,
  validateAnswer,
  getQuestionDisplay,
} from '@/services'
import type { Question, DigitLevel } from '@/types'

type OperationType = 'addition' | 'multiplication' | 'division'

interface QuizResult {
  id: string
  operation: OperationType
  digitLevel: DigitLevel
  score: number
  totalQuestions: number
  accuracy: number
  timeSpent: number // in seconds
  completedAt: string
  stars: number
}

export const PracticePage: React.FC = () => {
  const navigate = useNavigate()
  const { operation = 'addition', level = '1' } = useParams<{
    operation?: OperationType
    level?: string
  }>()

  const digitLevel = (parseInt(level) as DigitLevel) || 1
  const operationType = (operation as OperationType) || 'addition'

  // Timer
  const { seconds, isActive, toggle, reset: resetTimer } = useTimer()
  const minutes = Math.floor(seconds / 60)
  const displaySeconds = seconds % 60

  const [questions, setQuestions] = useState<Question[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [userAnswer, setUserAnswer] = useState<string>('')
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [skipped, setSkipped] = useState(new Set<string>())
  const [isLoading, setIsLoading] = useState(true)
  const [sessionStartTime, setSessionStartTime] = useState<number>(0)

  // Generate questions on mount
  useEffect(() => {
    const generateQuestions = () => {
      let newQuestions: Question[] = []

      switch (operationType) {
        case 'addition':
          newQuestions = generateAdditionQuestions(digitLevel, 20)
          break
        case 'multiplication':
          newQuestions = generateMultiplicationQuestions(digitLevel, 20)
          break
        case 'division':
          newQuestions = generateDivisionQuestions(digitLevel, 20)
          break
        default:
          newQuestions = generateAdditionQuestions(digitLevel, 20)
      }

      setQuestions(newQuestions)
      setSessionStartTime(Date.now())
      setIsLoading(false)
      toggle() // Start timer
    }

    generateQuestions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [operationType, digitLevel])

  if (isLoading) {
    return (
      <Container className="flex items-center justify-center py-20">
        <div className="text-center">
          <p className="text-lg text-muted-foreground">Loading questions...</p>
        </div>
      </Container>
    )
  }

  if (questions.length === 0) {
    return (
      <Container className="flex items-center justify-center py-20">
        <div className="text-center">
          <p className="text-lg text-muted-foreground">No questions available</p>
        </div>
      </Container>
    )
  }

  const currentQuestion = questions[currentIndex]
  const isComplete = currentIndex >= questions.length
  const accuracy = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0

  // Calculate stars based on accuracy
  const getStars = (acc: number): number => {
    if (acc >= 90) return 3
    if (acc >= 70) return 2
    if (acc >= 50) return 1
    return 0
  }

  const stars = getStars(accuracy)

  // Save results to localStorage
  const saveResults = () => {
    const results: QuizResult[] = storageService.getItem<QuizResult[]>('quiz_results', [])

    const newResult: QuizResult = {
      id: `${operationType}_${digitLevel}_${Date.now()}`,
      operation: operationType,
      digitLevel,
      score,
      totalQuestions: questions.length,
      accuracy,
      timeSpent: seconds,
      completedAt: new Date().toISOString(),
      stars,
    }

    results.push(newResult)
    storageService.setItem('quiz_results', results)
  }

  const handleSubmitAnswer = () => {
    if (userAnswer === '') return

    const isCorrect = validateAnswer(currentQuestion, parseInt(userAnswer, 10))
    if (isCorrect) {
      setScore(score + 1)
    }

    setAnswered(true)
  }

  const handleSkipQuestion = () => {
    setSkipped((prev) => new Set(prev).add(currentQuestion.id))
    handleNextQuestion()
  }

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setUserAnswer('')
      setAnswered(false)
    }
  }

  const handleFinish = () => {
    saveResults()
    navigate('/')
  }

  const operationLabel = {
    addition: 'Addition',
    multiplication: 'Multiplication',
    division: 'Division',
  }[operationType]

  const difficultyLabel = `${digitLevel}-Digit`

  // Complete screen
  if (isComplete) {
    return (
      <Container className="py-12">
        <div className="flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl">Practice Complete! 🎉</CardTitle>
              <CardDescription>Great job! Here's how you did:</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {/* Score */}
                <div className="rounded-lg bg-muted p-4 text-center">
                  <p className="text-sm text-muted-foreground">Score</p>
                  <p className="text-4xl font-bold text-green-600">
                    {score}/{questions.length}
                  </p>
                </div>

                {/* Accuracy */}
                <div className="rounded-lg bg-muted p-4 text-center">
                  <p className="text-sm text-muted-foreground">Accuracy</p>
                  <p className="text-4xl font-bold">{accuracy}%</p>
                </div>

                {/* Stars */}
                <div className="rounded-lg bg-muted p-4 text-center">
                  <p className="text-sm text-muted-foreground">Rating</p>
                  <div className="flex items-center justify-center gap-1">
                    {[1, 2, 3].map((star) => (
                      <span key={star} className="text-3xl">
                        {star <= stars ? '⭐' : '☆'}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Time */}
                <div className="rounded-lg bg-muted p-4 text-center">
                  <p className="text-sm text-muted-foreground">Time</p>
                  <p className="text-2xl font-bold">
                    {minutes}:{displaySeconds.toString().padStart(2, '0')}
                  </p>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Operation:</span>
                    <span className="font-medium">
                      {
                        {
                          addition: 'Addition',
                          multiplication: 'Multiplication',
                          division: 'Division',
                        }[operationType]
                      }
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Difficulty:</span>
                    <span className="font-medium">{digitLevel}-Digit</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button onClick={handleFinish} size="lg" className="w-full">
                  Back to Home
                </Button>
                <Button
                  onClick={() => {
                    setCurrentIndex(0)
                    setUserAnswer('')
                    setScore(0)
                    setAnswered(false)
                    setSkipped(new Set())
                    resetTimer()
                    const generateQuestions = () => {
                      let newQuestions: Question[] = []
                      switch (operationType) {
                        case 'addition':
                          newQuestions = generateAdditionQuestions(digitLevel, 20)
                          break
                        case 'multiplication':
                          newQuestions = generateMultiplicationQuestions(digitLevel, 20)
                          break
                        case 'division':
                          newQuestions = generateDivisionQuestions(digitLevel, 20)
                          break
                        default:
                          newQuestions = generateAdditionQuestions(digitLevel, 20)
                      }
                      setQuestions(newQuestions)
                      setSessionStartTime(Date.now())
                      toggle()
                    }
                    generateQuestions()
                  }}
                  variant="outline"
                  size="lg"
                  className="w-full"
                >
                  Try Again
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    )
  }

  return (
    <Container className="py-8">
      <div className="space-y-6">
        {/* Header */}
        <div className="grid gap-4 md:grid-cols-4">
          {/* Question Number */}
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Question</CardDescription>
              <CardTitle className="text-2xl">
                {currentIndex + 1}/{questions.length}
              </CardTitle>
            </CardHeader>
          </Card>

          {/* Score */}
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Score</CardDescription>
              <CardTitle className="text-2xl text-green-600">
                {score}/{questions.length}
              </CardTitle>
            </CardHeader>
          </Card>

          {/* Timer */}
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Time</CardDescription>
              <CardTitle className="text-2xl font-mono">
                {minutes}:{displaySeconds.toString().padStart(2, '0')}
              </CardTitle>
            </CardHeader>
          </Card>

          {/* Accuracy */}
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Accuracy</CardDescription>
              <CardTitle className="text-2xl">{accuracy}%</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Question Card */}
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-4xl">
              {getQuestionDisplay(currentQuestion)} = ?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Answer Input */}
            <div className="space-y-3">
              <input
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !answered) {
                    handleSubmitAnswer()
                  }
                }}
                placeholder="Enter your answer"
                disabled={answered}
                className="w-full rounded-lg border-2 border-border bg-background px-4 py-3 text-center text-2xl font-bold placeholder-muted-foreground focus:border-primary focus:outline-none disabled:bg-muted"
                autoFocus
              />

              {/* Feedback */}
              {answered && (
                <div
                  className={`rounded-lg p-4 text-center ${
                    validateAnswer(currentQuestion, parseInt(userAnswer, 10))
                      ? 'bg-green-100 text-green-900'
                      : 'bg-red-100 text-red-900'
                  }`}
                >
                  {validateAnswer(currentQuestion, parseInt(userAnswer, 10)) ? (
                    <div>
                      <p className="text-lg font-bold">✓ Correct!</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-lg font-bold">✗ Incorrect</p>
                      <p className="text-sm">The correct answer is {currentQuestion.answer}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="grid gap-3 sm:grid-cols-3">
              {!answered ? (
                <>
                  <Button
                    onClick={handleSubmitAnswer}
                    disabled={userAnswer === ''}
                    size="lg"
                    className="sm:col-span-2"
                  >
                    Check Answer
                  </Button>
                  <Button onClick={handleSkipQuestion} variant="outline" size="lg">
                    Skip
                  </Button>
                </>
              ) : (
                <>
                  <Button onClick={handleNextQuestion} size="lg" className="sm:col-span-3">
                    {currentIndex === questions.length - 1 ? 'Finish' : 'Next Question'}
                  </Button>
                </>
              )}
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Progress</span>
                <span>
                  {currentIndex + 1}/{questions.length}
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full bg-primary transition-all"
                  style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Container>
  )
}
