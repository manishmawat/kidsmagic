import { createBrowserRouter } from 'react-router-dom'
import { MainLayout } from '@/layouts/MainLayout'
import {
  HomePage,
  QuestsPage,
  PracticePage,
  StatsPage,
  SettingsPage,
  NotFoundPage,
} from '@/pages'

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/quests',
        element: <QuestsPage />,
      },
      {
        path: '/practice/:operation/:level',
        element: <PracticePage />,
      },
      {
        path: '/stats',
        element: <StatsPage />,
      },
      {
        path: '/settings',
        element: <SettingsPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
])
