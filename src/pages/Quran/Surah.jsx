import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchSurah } from "../../api/quran.api";
import { fetchTafsir } from "../../api/tafsir";
import Loader from "../../components/common/Loader";
import Container from "../../components/layout/Container";

export default function Surah() {
    const { id } = useParams();
    const [surah, setSurah] = useState(null);
    const [tafsir, setTafsir] = useState(null);
    const [loading, setLoading] = useState(true);
    const [openAyah, setOpenAyah] = useState(null);

    const getTafsirByAyah = (numberInSurah) =>
        tafsir?.ayahs?.find(a => a.numberInSurah === numberInSurah);

    useEffect(() => {
        async function loadSurah() {
            try {
                setLoading(true);
                const data = await fetchSurah(id);
                const tafsirData = await fetchTafsir(id);
                setTafsir(tafsirData);
                setSurah(data);
            } finally {
                setLoading(false);
            }
        }
        loadSurah();
    }, [id]);

    if (loading) return (
        <Container>
            <Loader />
        </Container>
    );

    if (!surah) return null;

    return (
        <Container>
            <div className="accordion" id="surahAccordion">
                {surah.ayahs.map((ayah, index) => {
                    const isOpen = openAyah === ayah.numberInSurah;
                    const ayahTafsir = getTafsirByAyah(ayah.numberInSurah);

                    return (
                        <div
                            key={ayah.number}
                            className={`card mb-3 ${index % 2 === 0 ? "bg-light" : ""}`}
                        >
                            <div
                                className="card-header p-3 d-flex align-items-start"
                                onClick={() =>
                                    setOpenAyah(isOpen ? null : ayah.numberInSurah)
                                }
                                style={{ cursor: "pointer" }}
                            >
                                <span className="badge bg-success me-3">{ayah.numberInSurah}</span>
                                <p className="mb-0 text-end flex-grow-1" style={{ fontSize: "1.25rem", fontFamily: "'Noto Naskh Arabic', serif" }}>
                                    {ayah.text}
                                </p>
                            </div>

                            {isOpen && ayahTafsir && (
                                <div className="card-body bg-light text-muted small text-end">
                                    {ayahTafsir.text}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </Container>
    );
}
