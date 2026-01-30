import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Home from "../pages/Home";
import Surah from "../pages/Surah";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
        { path: "/", element: <Home /> },
        { path: "/quran", element: <Home /> },
        { path: "/quran/:id", element: <Surah /> }
    ]
  }
]);
