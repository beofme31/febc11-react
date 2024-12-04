import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

const Layout = lazy(() => import("@components/Layout"));
const About = lazy(() => import("@pages/About"));
const ErrorPage = lazy(() => import("@pages/ErrorPage"));
const Home = lazy(() => import("@pages/Home"));
const TodoAdd = lazy(() => import("@pages/TodoAdd"));
const TodoDetail = lazy(() => import("@pages/TodoDetail"));
const TodoEdit = lazy(() => import("@pages/TodoEdit"));
const TodoList = lazy(() => import("@pages/TodoList"));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Navigate to="/home" /> },
      { path: 'home', element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'list', element: <TodoList /> },
      { path: 'list/add', element: <TodoAdd /> },
      { 
        // path: 'list/:_id/:hello/:world', // list/3/a/b => { _id: 3, hello: 'a', world: 'b' }
        path: 'list/:_id',
        element: <TodoDetail />,
        children: [
          { path: 'edit', element: <TodoEdit /> },
        ]
      },
    ],
  }
], {
  future: {
    // 없으면 콘솔에 경고 표시
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_relativeSplatPath: true,
    v7_skipActionErrorRevalidation: true,
  },
});

export default router;