import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import ExplorerPage from './pages/ExplorerPage.tsx';
import DashboardPage from './pages/DashboardPage.tsx';
import LessonPage from './pages/LessonPage.tsx';
import './index.css';
import './i18n';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <DashboardPage />
      },
      {
        path: "/lesson/:lessonId",
        element: <LessonPage />
      },
      {
        path: "/explorer",
        element: <ExplorerPage />
      }
    ]
  }
], {
  basename: "/trigonometry"
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
