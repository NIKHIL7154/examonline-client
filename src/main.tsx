
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import DashboardLayout from './layouts/DashboardLayout'
import IndexPage from './pages/indexpage/IndexPage'

import App from './App'
import ErrorBoundary from './pages/ErrorBoundary'
//import LoginPage from './pages/authpage/LoginPage'
//import RegisterPage from './pages/authpage/RegisterPage'
import AuthLayout from './layouts/AuthLayout'
import AuthPage from './pages/authpage/AuthPage'

//<SignIn redirectUrl="/app" path="/login" />
//<SignUp redirectUrl="/app"  path="/register"/>
//whole app routes
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
          { path: '', element: <App /> },

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


createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} future={{
    v7_startTransition: true,
  }} />

)
