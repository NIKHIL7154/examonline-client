// import { BrowserRouter, Route, Routes } from "react-router";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import AppLayout from "./layouts/AppLayout";
import Dashboard from "./pages/Dashboard";
import Tests from "./pages/Tests";
import QuestionSets from "./pages/QuestionSets";
import { Toaster } from "react-hot-toast";
import SetEditorPage from "./pages/SetEditorPage";

import RootLayout from "./layouts/RootLayout";
import IndexPage from "./pages/IndexPage";
import AuthLayout from "./layouts/AuthLayout";
import AuthPage from "./pages/AuthPage";
import ErrorBoundary from "./pages/ErrorBoundary";
import SetPage from "./pages/SetPage";
import TestPage from "./pages/TestPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Settings from "./pages/Settings";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <IndexPage /> },
      {
        path: "auth", element: <AuthLayout />, children: [
          { path: "", element: <AuthPage /> },
        ]
      },
      {
        path: 'app',
        element: <AppLayout />,
        children: [
          {
            index: true,
            element: <Navigate replace to="dashboard" />,
          },
          { path: 'dashboard', element: <Dashboard /> },
          { path: 'create', element: <div>Create</div> },
          { path: 'tests', element: <Tests /> },
          { path: 'tests/:testId', element: <TestPage /> },
          { path: 'questions', element: <QuestionSets /> },
          { path: 'questions/edit', element: <SetEditorPage /> },
          { path: 'questions/:setId', element: <SetPage /> },
          { path: 'settings', element: <Settings/> },

        ],
      }, { path: "*", element: <div> page not found </div> }
    ],
    errorElement: <ErrorBoundary />
  }
])

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
        // staleTime: 60 * 1000,
      },
    }
  });
  return (
    <>
      {/* <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />} >

            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="create" element={<div>Create test</div>} />
            <Route path="tests" element={<Tests />} />
            <Route path="questions" element={<QuestionSets />} />
            <Route path="questions/edit" element={<SetEditorPage />} />
          </Route>

          <Route path="*" element={<div> page not found </div>} />
        </Routes>
      </BrowserRouter>
      */}
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <RouterProvider router={router} />
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
              backgroundColor: "white",
              color: "oklch(0.373 0.034 259.733)",
            }
          }}
        />
      </QueryClientProvider>

    </>
  );
}

export default App;
