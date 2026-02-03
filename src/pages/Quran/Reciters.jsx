import Container from "../../components/layout/Container";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchReciters } from "../../api/reciters";
import Loader from "../../components/common/Loader";

export default function Reciters() {

    const [list, setList] = useState([]);
    const [loading, setLoading] = useState([]);

    useEffect(() => {
        async function loadSurah() {
            try {
                setLoading(true);
                const data = await fetchReciters();
                setList(data.data);
            } finally {
                setLoading(false);
            }
        }
        loadSurah();
    }, []);

    if (loading) return (
        <Container>
            <Loader />
        </Container>
    );

    return (
        <Container>
            <div className="row g-4">
                {list.map((reciter, index) => {
                    return (
                        <div key={index} className="col-12 col-sm-6 col-lg-4 col-xl-3">
                            <Link
                                to={`/quran/${reciter.identifier}/${reciter.name}`}
                                className="card h-100 text-decoration-none shadow-sm border-0 hover-shadow"
                            >
                                <div className="card-body d-flex flex-column justify-content-between">
                                    <h2
                                        className="text-center "
                                        style={{ fontFamily: "'Noto Naskh Arabic', serif", fontSize: "1.5rem", color: "#065f46" }}
                                    >
                                        {reciter.name}
                                    </h2>
                                    <span className="badge bg-success">
                                        {reciter.englishName}
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
