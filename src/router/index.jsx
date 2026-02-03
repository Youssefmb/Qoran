import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Home from "../pages/Home";
import Surah from "../pages/Quran/Surah";
import SurahList from "../pages/Quran/SurahList";
import Hadith from "../pages/Hadith/Hadith";
import HadithList from "../pages/Hadith/HadithList";
import RouterError from "../pages/RouterError";
import Reciters from "../pages/Quran/Reciters";
import HadithBook from "../pages/Hadith/hadithBook";
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
        element: <Reciters />
      },
      {
        path: "quran/:identifier/:name",
        element: <SurahList />
      },
      {
        path: "quran/:identifier/:name/:id",
        element: <Surah />
      },
      {
        path: "hadith",
        element: <Hadith />
      },
      {
        path: "hadith/:name",
        element: <HadithBook />
      },
      {
        path: "hadith/:name/:identifier/:id",
        element: <HadithList />
      },
    ]
  }
]);
