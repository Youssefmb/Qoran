import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchSurah } from "../../api/quran.api";
import Loader from "../../components/common/Loader";
import Container from "../../components/layout/Container";

export default function Surah() {
    const { id, identifier, name } = useParams();
    const [surah, setSurah] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadSurah() {
            try {
                setLoading(true);
                const data = await fetchSurah(id, identifier ,name);
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

                    return (
                        <div
                            key={ayah.number}
                            className={`card mb-3 ${index % 2 === 0 ? "bg-light" : ""}`}
                        >
                            <div
                                className="card-header p-3 d-flex align-items-start"
                                style={{ cursor: "pointer" }}
                            >
                                <span className="badge bg-success me-3">{ayah.numberInSurah}</span>
                                <p className="mb-0 text-end flex-grow-1" style={{ fontSize: "1.25rem", fontFamily: "'Noto Naskh Arabic', serif" }}>
                                    {ayah.text}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Container>
    );
}
