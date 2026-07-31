import React from 'react'
import { Container } from '@/components/common/Container'

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-card">
      <Container className="py-8 text-center">
        <p className="text-sm text-muted-foreground">
          © {currentYear} Math Practice. All rights reserved.
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          Created with ❤️ to make math fun
        </p>
      </Container>
    </footer>
  )
}
