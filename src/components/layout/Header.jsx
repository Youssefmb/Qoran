import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-primary">
          🕌 Quran & Hadith
        </h1>

        <nav className="space-x-6 text-gray-700">
          <Link className="hover:text-primary" to="/">Home</Link>
          <Link className="hover:text-primary" to="/quran">Qur’an</Link>
          <Link className="hover:text-primary" to="/hadith">Hadith</Link>
        </nav>
      </div>
    </header>
  );
}
