import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchSurah } from "../api/quran.api";
import Loader from "../components/common/Loader";
import Container from "../components/layout/Container";
import { ArrowLeft } from "lucide-react";

export default function Surah() {
  const { id } = useParams();
  const [surah, setSurah] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSurah() {
      try {
        setLoading(true);
        const data = await fetchSurah(id);
        setSurah(data);
        console.log(data)
      } finally {
        setLoading(false);
      }
    }

    loadSurah();
  }, [id]);

  if (loading) {
    return (
      <Container>
        <Loader />
      </Container>
    );
  }

  if (!surah) return null;

  return (
    <Container>
      <div className="max-w-4xl mx-auto">

        {/* Back */}
        <Link
          to="/quran"
          className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 mb-6"
        >
          <ArrowLeft size={18} />
          Back to Surahs
        </Link>

        {/* Surah Header */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8 text-center border border-emerald-100">
          <h1 className="text-4xl font-bold text-emerald-700 mb-2">
            {surah.name}
          </h1>
          <p className="text-gray-500">
            {surah.englishName} • {surah.numberOfAyahs} Ayahs
          </p>
        </div>

        {/* Ayahs */}
        <div className="space-y-5">
          {surah.ayahs.map((ayah, index) => (
            <div
              key={ayah.number}
              className={`rounded-xl p-6 shadow-sm border border-emerald-50 transition ${
                index % 2 === 0
                  ? "bg-gradient-to-r from-white to-emerald-50/40"
                  : "bg-white"
              }`}
            >
              <div className="flex items-start gap-4">
                
                {/* Ayah Number */}
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-semibold">
                    {ayah.numberInSurah}
                  </div>
                </div>

                {/* Arabic Text */}
                <p className="flex-1 text-right text-2xl leading-loose text-emerald-900 font-arabic">
                  {ayah.text}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </Container>
  );
}
