import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/common/Container'

export const Header: React.FC = () => {
  return (
    <header className="border-b border-border bg-card shadow-sm">
      <Container className="flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="text-2xl font-bold text-primary">🧮</div>
          <h1 className="text-xl font-bold">Math Practice</h1>
        </Link>

        <nav className="flex items-center gap-4">
          <Link to="/quests">
            <Button variant="ghost">Quests</Button>
          </Link>
          <Link to="/stats">
            <Button variant="ghost">Stats</Button>
          </Link>
          <Link to="/settings">
            <Button variant="ghost">Settings</Button>
          </Link>
        </nav>
      </Container>
    </header>
  )
}
