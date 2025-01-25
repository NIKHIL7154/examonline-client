import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import DashboardLayout from './layouts/DashboardLayout'
import IndexPage from './pages/indexpage/IndexPage'
import AuthLayout from './layouts/AuthLayout'
import AuthPage from './pages/authpage/AuthPage'


import ErrorBoundary from './pages/ErrorBoundary'
import TestsLayout from './pages/tests/TestsLayout'
import OverviewPage from './pages/overviewpage/OverviewPage'



import QuestionsPage from './pages/questionSet/QuestionsPage'
import TestCreationPage from './pages/testCreationPage/TestCreationPage'
import QuestionModifierPage from './pages/questionMakerPage/QuestionModifierPage'

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
          { path: '', element: <OverviewPage/> /* add overview page here */ },
          { path: 'tests', element: <TestsLayout /> },
          // { path: 'create', element: <div>Create test</div> /* add create test page here */ },
          { path: 'create', element: <TestCreationPage/> /* add create test page here */ },
          {path:"edit-set",element:<div>Edit set</div> /*add questions page here*/},
          {path:"questions",element:<QuestionsPage/> /*add questions page here*/},
          {path:"settings",element:<QuestionModifierPage/>},
          {path:"questions/create",element:<QuestionModifierPage/>}

        ],
      },
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