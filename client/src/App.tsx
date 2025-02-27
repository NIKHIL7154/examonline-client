import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import DashboardLayout from './layouts/DashboardLayout'
import IndexPage from './pages/verificationPage/IndexPage'
import AuthLayout from './layouts/AuthLayout'
import AuthPage from './pages/authpage/AuthPage'


import ErrorBoundary from './pages/ErrorBoundary'
import TestsLayout from './pages/tests/TestsLayout'
import OverviewPage from './pages/overviewpage/OverviewPage'



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
          // { path: 'create', element: <div>Create test</div> /* add create test page here */ },
          { path: 'create', element: <TestCreationPage /> /* add create test page here */ },
          { path: "edit-set", element: <div>Edit set</div> /*add questions page here*/ },
          { path: "questions", element: <QuestionsPage /> /*add questions page here*/ },
          { path: "settings", element: <QuestionModifierPage /> },
          { path: "questions/create", element: <QuestionModifierPage /> },
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
        path:"test",element:<TestNavigationProvider><TestConductLayout/></TestNavigationProvider>

      },
      {
        path:"face",element:<FaceVerification/>
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
  return (
    <RouterProvider router={router} future={{
      v7_startTransition: true,
    }} />
  )
}

export default App