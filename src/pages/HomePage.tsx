import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Container } from '@/components/common/Container'
import { getTimeOfDayGreeting } from '@/utils'
import type { OperationType, DigitLevel } from '@/types'

export const HomePage: React.FC = () => {
  const navigate = useNavigate()
  const greeting = getTimeOfDayGreeting()

  const handleStartPractice = (operation: OperationType, digitLevel: DigitLevel) => {
    navigate(`/practice/${operation}/${digitLevel}`)
  }

  return (
    <Container className="py-12">
      <div className="space-y-8">
        {/* Hero Section */}
        <section className="text-center">
          <h2 className="mb-4 text-4xl font-bold sm:text-5xl">
            {greeting}, Math Learner! 👋
          </h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Choose an operation and difficulty level to start practicing.
          </p>
        </section>

        {/* Operation Cards */}
        <section>
          <div className="grid gap-6 md:grid-cols-3">
            {operations.map((op) => (
              <Card key={op.id} className="flex flex-col">
                <CardHeader>
                  <div className="mb-2 text-4xl">{op.icon}</div>
                  <CardTitle className="text-2xl">{op.title}</CardTitle>
                  <CardDescription>{op.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleStartPractice(op.operation as OperationType, 1 as DigitLevel)
                    }
                  >
                    1 Digit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleStartPractice(op.operation as OperationType, 2 as DigitLevel)
                    }
                  >
                    2 Digits
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleStartPractice(op.operation as OperationType, 3 as DigitLevel)
                    }
                  >
                    3 Digits
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Features */}
        <section>
          <h3 className="mb-6 text-2xl font-bold">Why Use Math Practice?</h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.id}>
                <CardHeader>
                  <div className="mb-2 text-4xl">{feature.icon}</div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-lg bg-primary/10 p-8 text-center">
          <h3 className="mb-4 text-2xl font-bold">Get Started</h3>
          <p className="text-muted-foreground">
            Select an operation and difficulty level above to begin your practice session!
          </p>
        </section>
      </div>
    </Container>
  )
}

const operations = [
  {
    id: 'addition',
    icon: '➕',
    title: 'Addition',
    description: 'Add two numbers together',
    operation: 'addition',
  },
  {
    id: 'multiplication',
    icon: '✖️',
    title: 'Multiplication',
    description: 'Multiply two numbers',
    operation: 'multiplication',
  },
  {
    id: 'division',
    icon: '➗',
    title: 'Division',
    description: 'Divide one number by another',
    operation: 'division',
  },
]

const features = [
  {
    id: 1,
    icon: '🎯',
    title: 'Targeted Practice',
    description: 'Focus on specific math skills with curated practice quests.',
  },
  {
    id: 2,
    icon: '📊',
    title: 'Track Progress',
    description: 'Monitor your improvement with detailed statistics and analytics.',
  },
  {
    id: 3,
    icon: '🏆',
    title: 'Achieve Goals',
    description: 'Build streaks and unlock achievements as you practice.',
  },
  {
    id: 4,
    icon: '⚡',
    title: 'Quick Sessions',
    description: 'Short, focused practice sessions fit perfectly into your schedule.',
  },
  {
    id: 5,
    icon: '📱',
    title: 'Mobile Friendly',
    description: 'Practice anywhere, anytime on any device.',
  },
  {
    id: 6,
    icon: '🎨',
    title: 'Clean Interface',
    description: 'Simple, distraction-free design for focused learning.',
  },
]
