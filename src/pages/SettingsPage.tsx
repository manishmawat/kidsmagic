import React from 'react'
import { Container } from '@/components/common/Container'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export const SettingsPage: React.FC = () => {
  const [settings, setSettings] = React.useState({
    theme: 'auto',
    soundEnabled: true,
    animationsEnabled: true,
    difficulty: 'medium',
    questsPerSession: 10,
  })

  const handleSettingChange = (key: string, value: string | boolean | number) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  return (
    <Container className="py-12">
      <div className="max-w-2xl space-y-8">
        <div>
          <h1 className="mb-2 text-4xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Customize your learning experience</p>
        </div>

        {/* Appearance */}
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>Customize how the app looks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="mb-3 block text-sm font-medium">Theme</label>
              <div className="flex gap-4">
                {['light', 'dark', 'auto'].map((theme) => (
                  <label key={theme} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="theme"
                      value={theme}
                      checked={settings.theme === theme}
                      onChange={(e) => handleSettingChange('theme', e.target.value)}
                      className="h-4 w-4"
                    />
                    <span className="text-sm capitalize">{theme}</span>
                  </label>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sound & Animation */}
        <Card>
          <CardHeader>
            <CardTitle>Experience</CardTitle>
            <CardDescription>Control sound and animations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <label className="flex items-center justify-between">
              <span className="text-sm font-medium">Sound Effects</span>
              <input
                type="checkbox"
                checked={settings.soundEnabled}
                onChange={(e) => handleSettingChange('soundEnabled', e.target.checked)}
                className="h-4 w-4"
              />
            </label>
            <label className="flex items-center justify-between">
              <span className="text-sm font-medium">Animations</span>
              <input
                type="checkbox"
                checked={settings.animationsEnabled}
                onChange={(e) => handleSettingChange('animationsEnabled', e.target.checked)}
                className="h-4 w-4"
              />
            </label>
          </CardContent>
        </Card>

        {/* Practice Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Practice Settings</CardTitle>
            <CardDescription>Configure your practice sessions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="mb-3 block text-sm font-medium">Difficulty Level</label>
              <div className="flex gap-4">
                {['easy', 'medium', 'hard'].map((difficulty) => (
                  <label key={difficulty} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="difficulty"
                      value={difficulty}
                      checked={settings.difficulty === difficulty}
                      onChange={(e) => handleSettingChange('difficulty', e.target.value)}
                      className="h-4 w-4"
                    />
                    <span className="text-sm capitalize">{difficulty}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-3 block text-sm font-medium">
                Questions per Session: {settings.questsPerSession}
              </label>
              <input
                type="range"
                min="5"
                max="30"
                step="5"
                value={settings.questsPerSession}
                onChange={(e) => handleSettingChange('questsPerSession', parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card>
          <CardHeader>
            <CardTitle>Data Management</CardTitle>
            <CardDescription>Manage your application data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full">
              Export Progress
            </Button>
            <Button variant="destructive" className="w-full">
              Clear All Data
            </Button>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex gap-4">
          <Button size="lg" className="flex-1">
            Save Changes
          </Button>
          <Button size="lg" variant="outline" className="flex-1">
            Reset to Defaults
          </Button>
        </div>
      </div>
    </Container>
  )
}
