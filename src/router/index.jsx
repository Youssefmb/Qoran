import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Home from "../pages/Home";
import Surah from "../pages/Surah";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { 
        index: true, 
        element: <Home /> 
      },
      { 
        path: "/quran", 
        element: <Home /> // You might want to create a QuranList page here
      },
      { 
        path: "/quran/:id", 
        element: <Surah /> 
      },
      { 
        path: "/hadith", 
        element: <Home /> // You might want to create a HadithList page here
      }
    ]
  }
]);