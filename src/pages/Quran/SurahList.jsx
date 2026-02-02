import Container from "../../components/layout/Container";
import surahs from "../../api/surahList.api.json";
import { Link } from "react-router-dom";

export default function Quran() {
    return (
        <Container>
            <div className="text-center mb-5">
                <h1 className="display-4 fw-bold mb-3" style={{ fontFamily: "'Noto Naskh Arabic', serif" }}>
                    القرآن الكريم
                </h1>
            </div>

            <div className="row g-4">
                {surahs.map((surah, index) => {
                    const surahId = index + 1;

                    return (
                        <div key={surahId} className="col-12 col-sm-6 col-lg-4 col-xl-3">
                            <Link
                                to={`/quran/${surahId}`}
                                className="card h-100 text-decoration-none shadow-sm border-0 hover-shadow"
                            >
                                <div className="card-body d-flex flex-column justify-content-between">
                                    <h2
                                        className="text-center "
                                        style={{ fontFamily: "'Noto Naskh Arabic', serif", fontSize: "1.5rem", color: "#065f46" }}
                                    >
                                        {surah.surahNameArabicLong}
                                    </h2>
                                    <span className="badge bg-success">
                                        {surah.totalAyah} Ayahs
                                    </span>
                                </div>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </Container>
    );
}
