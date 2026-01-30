import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchSurah } from "../api/quran.api";
import Loader from "../components/common/Loader";
import Container from "../components/layout/Container";
import { ArrowLeft } from "lucide-react";

export default function Surah() {
  const { id } = useParams();
  const [ayahs, setAyahs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSurah() {
      setLoading(true);
      const data = await fetchSurah(id);
      setAyahs(data);
      setLoading(false);
    }
    loadSurah();
  }, [id]);

  return (
    <Container>
      {loading ? (
        <Loader />
      ) : (
        <div className="max-w-4xl mx-auto">

          {/* Verses */}
          <div className="space-y-4">
            {ayahs.map((ayah, index) => (
              <div 
                key={ayah.verse}
                className={`bg-white rounded-xl p-6 shadow-sm border border-emerald-50 hover:shadow-md transition-shadow duration-300 ${
                  index % 2 === 0 ? 'bg-gradient-to-r from-white to-emerald-50/30' : ''
                }`}
              >
                <div className="flex items-start space-x-4">
                  {/* Verse Number */}
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-semibold">
                      {ayah.verse}
                    </div>
                  </div>
                  
                  {/* Arabic Text */}
                  <div className="flex-grow">
                    <p className="text-right text-2xl font-arabic leading-loose text-emerald-800 mb-4">
                      {ayah.text}
                    </p>
                    
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Container>
  );
}