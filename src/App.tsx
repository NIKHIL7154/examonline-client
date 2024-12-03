import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import DashboardLayout from './layouts/DashboardLayout'
import IndexPage from './pages/indexpage/IndexPage'
import AuthLayout from './layouts/AuthLayout'
import AuthPage from './pages/authpage/AuthPage'
import LoginPage from './pages/authpage/LoginPage'

import ErrorBoundary from './pages/ErrorBoundary'

const router = createBrowserRouter([
    {
      element: <RootLayout />,
      children: [
        { path: '/', element: <IndexPage /> },
        {
          path: "auth", element: <AuthLayout />, children: [
            {path:"",element:<AuthPage/>},
          ]
        }
        , {
          element: <DashboardLayout />,
          path: 'app',
          children: [
            { path: '', element: <LoginPage /> },
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