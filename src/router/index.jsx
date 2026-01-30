import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Home from "../pages/Home";
import Surah from "../pages/Surah";
import SurahList from "../pages/SurahList";

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
        path: "/", 
        element: <Home /> // You might want to create a QuranList page here
      },
      { 
        path: "/qoran", 
        element: <SurahList /> // You might want to create a QuranList page here
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