import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Home from "../pages/Home";
import Surah from "../pages/Quran/Surah";
import SurahList from "../pages/Quran/SurahList";
import Hadith from "../pages/Hadith/Hadith";
import HadithList from "../pages/Hadith/HadithList";
import RouterError from "../pages/RouterError";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <RouterError />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "quran",
        element: <SurahList />
      },
      {
        path: "quran/:id",
        element: <Surah />
      },
      {
        path: "hadith",
        element: <Hadith />
      },
      {
        path: "hadith/section/:id",
        element: <HadithList />
      }
    ]
  }
]);
