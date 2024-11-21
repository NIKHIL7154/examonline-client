
import { createRoot } from 'react-dom/client'
import './index.css'
import {  createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import DashboardLayout from './layouts/DashboardLayout'
import IndexPage from './pages/indexpage/IndexPage'
import { SignIn, SignUp } from '@clerk/clerk-react'
import App from './App'


//whole app routes
const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <IndexPage /> },
      
      { path: '/login/*', element: <SignIn redirectUrl="/app" path="/login" /> },
      { path: '/register/*', element: <SignUp redirectUrl="/app"  path="/register"/> },
      {
        element: <DashboardLayout />,
        path: 'app',
        children: [
          { path: '', element: <App /> },
          
        ],
      },
    ],
  },
],{
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
