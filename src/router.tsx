import { createBrowserRouter, createHashRouter } from 'react-router-dom';

import { PageShell } from './components/layout/PageShell';
import { DashboardPage } from './pages/DashboardPage';
import { DomainPage } from './pages/DomainPage';
import { DomainsDirectoryPage } from './pages/DomainsDirectoryPage';
import { DomainQuizPage } from './pages/DomainQuizPage';
import { LabPage } from './pages/LabPage';
import { LessonQuizPage } from './pages/LessonQuizPage';
import { ExamPage, ExamResultsPage, ExamSessionPage, FlashcardsPage, FlashcardSessionPage, VaultCategoryPage, VaultPage } from './pages/RoutePlaceholderPages';
import { LessonDetailPage } from './pages/LessonDetailPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProfilePage } from './pages/ProfilePage';
import { SimulationPage } from './pages/SimulationPage';

const routeConfig = [
  {
    path: '/',
    element: <PageShell />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      },
      {
        path: 'domains',
        element: <DomainsDirectoryPage />,
      },
      {
        path: 'domains/:id',
        element: <DomainPage />,
      },
      {
        path: 'lesson/:id',
        element: <LessonDetailPage />,
      },
      {
        path: 'lesson/:id/simulation',
        element: <SimulationPage />,
      },
      {
        path: 'lesson/:id/lab',
        element: <LabPage />,
      },
      {
        path: 'lesson/:id/quiz',
        element: <LessonQuizPage />,
      },
      {
        path: 'domains/:id/quiz',
        element: <DomainQuizPage />,
      },
      {
        path: 'vault',
        element: <VaultPage />,
      },
      {
        path: 'vault/:category',
        element: <VaultCategoryPage />,
      },
      {
        path: 'flashcards',
        element: <FlashcardsPage />,
      },
      {
        path: 'flashcards/:domainId',
        element: <FlashcardSessionPage />,
      },
      {
        path: 'exam',
        element: <ExamPage />,
      },
      {
        path: 'exam/session',
        element: <ExamSessionPage />,
      },
      {
        path: 'exam/results',
        element: <ExamResultsPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
];

const isGitHubPagesHost =
  typeof window !== 'undefined' && window.location.hostname === 'hakimzx17.github.io';

export const router = isGitHubPagesHost
  ? createHashRouter(routeConfig)
  : createBrowserRouter(routeConfig);
