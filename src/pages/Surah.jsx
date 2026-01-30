import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchSurah } from "../api/quran.api";
import Loader from "../components/common/Loader";
import Container from "../components/layout/Container";

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
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-3xl font-bold text-primary mb-6">
            Surah {id}
          </h2>
          <div className="space-y-4">
            {ayahs.map((ayah) => (
              <p key={ayah.verse} className="text-right text-lg leading-relaxed">
                {ayah.verse}. {ayah.text}
              </p>
            ))}
          </div>
        </div>
      )}
    </Container>
  );
}
