import React from 'react'
import { Container } from '@/components/common/Container'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'

export const StatsPage: React.FC = () => {
  return (
    <Container className="py-12">
      <div className="space-y-8">
        <div>
          <h1 className="mb-2 text-4xl font-bold">Your Statistics</h1>
          <p className="text-muted-foreground">
            Track your progress and see how you're improving over time.
          </p>
        </div>

        {/* Overall Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Quests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">0</div>
              <p className="mt-1 text-xs text-muted-foreground">Completed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">0</div>
              <p className="mt-1 text-xs text-muted-foreground">Answered</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Accuracy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">0%</div>
              <p className="mt-1 text-xs text-muted-foreground">Average</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Day Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">0</div>
              <p className="mt-1 text-xs text-muted-foreground">Days</p>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Charts Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle>Performance by Type</CardTitle>
            <CardDescription>Your accuracy across different math operations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['Addition', 'Subtraction', 'Multiplication', 'Division'].map((type) => (
                <div key={type} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{type}</span>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-32 rounded-full bg-muted">
                      <div className="h-2 w-0 rounded-full bg-primary" />
                    </div>
                    <span className="text-xs text-muted-foreground">0%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your recent quest completions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center text-muted-foreground">
              <p>No completed quests yet. Start your first quest to see activity here!</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Container>
  )
}
