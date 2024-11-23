import Layout from "@components/Layout";
import About from "@pages/About";
import Home from "@pages/Home";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: 'home', element: <Home /> },
      { path: 'about', element: <About /> },
    ],
  }
]);

export default router;