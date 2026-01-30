import Container from "../components/layout/Container";
import surahs from "../api/surahList.api.json";
import { Link } from "react-router-dom";

export default function Quran() {
  return (
    <Container>
      {/* Page Title */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-emerald-700 mb-2">
          القرآن الكريم
        </h1>
        <p className="text-gray-600">
          Select a surah to begin reading
        </p>
      </div>

      {/* Surah List */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {surahs.map((surah, index) => {
          const surahId = index + 1;

          return (
            <Link
              key={surahId}
              to={`/quran/${surahId}`}
              className="group bg-white rounded-xl p-6 shadow-sm border border-emerald-50 hover:shadow-md transition"
            >
              <div className="flex justify-between items-center mb-4">
                {/* Surah Number */}
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-semibold">
                  {surahId}
                </div>

                {/* Revelation Place */}
                <span className="text-sm text-gray-500">
                  {surah.revelationPlace}
                </span>
              </div>

              {/* Arabic Name */}
              <h2 className="text-right text-2xl font-arabic text-emerald-900 mb-2">
                {surah.surahNameArabicLong}
              </h2>

              {/* English Name */}
              <p className="text-gray-600 text-sm">
                {surah.surahName} • {surah.surahNameTranslation}
              </p>

              {/* Ayah Count */}
              <p className="text-xs text-gray-500 mt-2">
                {surah.totalAyah} Ayahs
              </p>
            </Link>
          );
        })}
      </div>
    </Container>
  );
}
