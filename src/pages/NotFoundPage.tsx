import React from 'react'
import { Container } from '@/components/common/Container'
import { Button } from '@/components/ui/Button'

export const NotFoundPage: React.FC = () => {
  return (
    <Container className="flex min-h-[60vh] items-center justify-center py-12">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold">404</h1>
        <p className="mb-8 text-xl text-muted-foreground">Page not found</p>
        <a href="/">
          <Button>Go Home</Button>
        </a>
      </div>
    </Container>
  )
}
