import React from 'react'
import { Container } from '@/components/common/Container'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'

const SAMPLE_QUESTS = [
  {
    id: 1,
    title: 'Basic Addition',
    description: 'Master addition with single-digit numbers',
    type: 'addition',
    difficulty: 'easy',
    questionsCount: 10,
    estimatedTime: 5,
  },
  {
    id: 2,
    title: 'Subtraction Basics',
    description: 'Learn subtraction fundamentals',
    type: 'subtraction',
    difficulty: 'easy',
    questionsCount: 10,
    estimatedTime: 5,
  },
  {
    id: 3,
    title: 'Multiplication Tables',
    description: 'Memorize multiplication facts',
    type: 'multiplication',
    difficulty: 'medium',
    questionsCount: 15,
    estimatedTime: 10,
  },
  {
    id: 4,
    title: 'Division Practice',
    description: 'Practice division skills',
    type: 'division',
    difficulty: 'medium',
    questionsCount: 15,
    estimatedTime: 10,
  },
  {
    id: 5,
    title: 'Mixed Operations',
    description: 'Challenge yourself with multiple operations',
    type: 'mixed',
    difficulty: 'hard',
    questionsCount: 20,
    estimatedTime: 15,
  },
]

const difficultyColors = {
  easy: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  hard: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
}

export const QuestsPage: React.FC = () => {
  return (
    <Container className="py-12">
      <div className="space-y-8">
        <div>
          <h1 className="mb-2 text-4xl font-bold">Math Quests</h1>
          <p className="text-muted-foreground">
            Choose a quest and start practicing. Quests are organized by difficulty level and
            topic.
          </p>
        </div>

        {/* Filter Section - Placeholder */}
        <div className="flex gap-2">
          <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
            All
          </button>
          <button className="rounded-md border border-border bg-background px-4 py-2 text-sm">
            Easy
          </button>
          <button className="rounded-md border border-border bg-background px-4 py-2 text-sm">
            Medium
          </button>
          <button className="rounded-md border border-border bg-background px-4 py-2 text-sm">
            Hard
          </button>
        </div>

        {/* Quests Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SAMPLE_QUESTS.map((quest) => (
            <Card key={quest.id} className="cursor-pointer transition-all hover:shadow-md">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{quest.title}</CardTitle>
                    <CardDescription>{quest.description}</CardDescription>
                  </div>
                  <span
                    className={`ml-2 whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${
                      difficultyColors[quest.difficulty as keyof typeof difficultyColors]
                    }`}
                  >
                    {quest.difficulty}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Questions:</span>
                    <span className="font-semibold">{quest.questionsCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Est. Time:</span>
                    <span className="font-semibold">{quest.estimatedTime} min</span>
                  </div>
                  <button className="mt-4 w-full rounded-md bg-primary py-2 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90">
                    Start Quest →
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Container>
  )
}
