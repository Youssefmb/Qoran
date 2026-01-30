import Container from "../components/layout/Container";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Container>
      {/* Hero */}
      <section className="text-center py-12">
        <h2 className="text-4xl font-bold text-primary mb-4">
          Read the Qur’an & Ahadith
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          A peaceful place to read the words of Allah and the teachings of the Prophet ﷺ
        </p>
      </section>

      {/* Cards */}
      <section className="grid md:grid-cols-2 gap-8 mt-12">
        {/* Quran Card */}
        <div className="bg-white rounded-xl shadow-sm p-8 hover:shadow-md transition">
          <h3 className="text-2xl font-semibold text-primary mb-3">
            📖 Qur’an
          </h3>
          <p className="text-gray-600 mb-6">
            Read all 114 surahs with translations in a clean and focused interface.
          </p>
          <Link
            to="/quran"
            className="inline-block bg-primary text-white px-6 py-2 rounded-lg hover:opacity-90"
          >
            Read Qur’an
          </Link>
        </div>

        {/* Hadith Card */}
        <div className="bg-white rounded-xl shadow-sm p-8 hover:shadow-md transition">
          <h3 className="text-2xl font-semibold text-primary mb-3">
            📜 Hadith
          </h3>
          <p className="text-gray-600 mb-6">
            Explore authentic hadith collections with easy navigation.
          </p>
          <Link
            to="/hadith"
            className="inline-block bg-primary text-white px-6 py-2 rounded-lg hover:opacity-90"
          >
            Read Hadith
          </Link>
        </div>
      </section>
    </Container>
  );
}
