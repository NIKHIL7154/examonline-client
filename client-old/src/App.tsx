import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import RootLayout from './layouts/RootLayout'
import DashboardLayout from './layouts/DashboardLayout'
import IndexPage from './pages/verificationPage/IndexPage'
import AuthLayout from './layouts/AuthLayout'
import AuthPage from './pages/authpage/AuthPage'


import ErrorBoundary from './pages/ErrorBoundary'
import TestsLayout from './pages/tests/TestsLayout'
import OverviewPage from './pages/overviewpage/OverviewPage'

import { Toaster } from "react-hot-toast";

import QuestionsPage from './pages/questionSetsPage/QuestionsPage'
import TestCreationPage from './pages/testCreationPage/TestCreationPage'
import QuestionModifierPage from './pages/questionMakerPage/QuestionModifierPage'
import CreateNewTestPage from './pages/testCreationPage/CreateNewTestPage'
import QuestionSetSelector from './pages/testCreationPage/components/QuestionSetSelector'
import TestOptionForm from './pages/testCreationPage/components/TestOptionForm'
import TestParticipants from './pages/testCreationPage/components/TestParticipants'
import { TestConfigProvider } from './pages/testCreationPage/context/TestConfigContext'
import TestConductLayout from './pages/testConductPages/TestConductLayout'
import FaceVerification from './pages/testConductPages/pages/FaceProctoring'
import { TestNavigationProvider } from './pages/testConductPages/context/TestNavigationContext'
import QuestionSetPage from './pages/questionSetView/questionSetPage';
import TestPage from './pages/tests/TestPage';

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <IndexPage /> },
      {
        path: "auth", element: <AuthLayout />, children: [
          { path: "", element: <AuthPage /> },
        ]
      }
      , {
        element: <DashboardLayout />,
        path: 'app',
        children: [
          // { path: '', element: <div>overview page</div> /* add overview page here */ },
          { path: '', element: <OverviewPage /> /* add overview page here */ },
          { path: 'tests', element: <TestsLayout /> },
          { path: 'tests/test/:testId', element: <TestPage /> },
          // { path: 'create', element: <div>Create test</div> /* add create test page here */ },
          { path: 'create', element: <TestCreationPage /> /* add create test page here */ },
          { path: "edit-set", element: <div>Edit set</div> /*add questions page here*/ },
          { path: "questions", element: <QuestionsPage /> /*add questions page here*/ },
          { path: "questions/create", element: <QuestionModifierPage /> },
          { path: "questions/set/:setId", element: <QuestionSetPage /> },
          { path: "settings", element: <QuestionModifierPage /> },
          {
            path: "create/new-test", element: <TestConfigProvider><CreateNewTestPage /></TestConfigProvider>, children: [
              //  if (condition) navigate("/path" , {replace: true});
              { index: true, element: <Navigate to="testQuestions" replace /> },
              { path: "testQuestions", element: <QuestionSetSelector /> },
              { path: "testSettings", element: <TestOptionForm /> },
              { path: "testParticipants", element: <TestParticipants /> },
            ]
          },

        ],
      },
      {
        path: "test", element: <TestNavigationProvider><TestConductLayout /></TestNavigationProvider>

      },
      {
        path: "face", element: <FaceVerification />
      }
    ],
    errorElement: <ErrorBoundary />
  },
], {
  future: {
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation: true,
  },
})


const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
        // staleTime: 60 * 1000,
      },
    }
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} future={{
        v7_startTransition: true,
      }} />

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "#fff",
            color: "#374151",
          }
        }}
      />
    </QueryClientProvider>
  )
}

export default App