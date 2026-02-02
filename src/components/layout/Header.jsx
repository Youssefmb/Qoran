import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="bg-white shadow-sm">
            <nav className="navbar navbar-expand-md container py-2">
                {/* Brand */}
                <Link className="navbar-brand fw-semibold fs-4" to="/">
                    🕌 Quran & Hadith
                </Link>

                {/* Nav links */}
                <div className="ms-auto">
                    <ul className="navbar-nav flex-row gap-4">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/quran">Qur’an</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/hadith">Hadith</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}
