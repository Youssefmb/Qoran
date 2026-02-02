import { Link } from "react-router-dom";
import Container from "../components/layout/Container";

export default function Home() {
    return (
        <Container>
            {/* HERO */}
            <section className="text-center my-5">
                <h1 className="display-5 fw-bold mb-3">
                    Divine Guidance & Wisdom
                </h1>
                <p className="text-muted fs-5">
                    A peaceful place to read the Qur’an and explore authentic Hadith
                    with clarity and reflection.
                </p>
            </section>

            {/* CARDS */}
            <section className="row g-4 justify-content-center">
                <div className="col-md-5">
                    <div className="card shadow-sm h-100">
                        <div className="card-body">
                            <h3 className="card-title fw-semibold">
                                📖 Holy Qur’an
                            </h3>
                            <p className="card-text text-muted">
                                Read all surahs with tafsir in a clean, distraction-free layout.
                            </p>
                            <Link to="/quran" className="btn btn-success">
                                Start Reading
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="col-md-5">
                    <div className="card shadow-sm h-100">
                        <div className="card-body">
                            <h3 className="card-title fw-semibold">
                                📜 Sacred Hadith
                            </h3>
                            <p className="card-text text-muted">
                                Explore authentic Hadith collections with explanations.
                            </p>
                            <Link to="/hadith" className="btn btn-success">
                                Explore Hadith
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </Container>
    );
}
