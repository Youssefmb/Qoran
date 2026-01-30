import Container from "../components/layout/Container";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Container>
      {/* Hero Section */}
      <section className="text-center py-12 md:py-20 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        
        <div className="relative z-10">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="bg-emerald-100 text-emerald-600 p-3 rounded-full">
              <span className="text-3xl">🕌</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent mb-6">
            Divine Guidance & Wisdom
          </h1>
          <p className="text-lg md:text-xl text-emerald-600 max-w-3xl mx-auto leading-relaxed">
            A serene space to immerse yourself in the sacred words of Allah (SWT) 
            and the profound teachings of the Prophet Muhammad ﷺ
          </p>
        </div>
      </section>

      {/* Cards Section */}
      <section className="py-12">
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Quran Card */}
          <div className="group relative bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 border border-emerald-100 overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-full"></div>
            <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-emerald-100 p-3 rounded-lg">
                  <span className="text-2xl text-emerald-600">📖</span>
                </div>
                <h3 className="text-2xl font-bold text-emerald-800">
                  Holy Qur'an
                </h3>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Read and reflect upon all 114 surahs with clear translations, 
                tafsir references, and beautiful recitations in a distraction-free environment.
              </p>
              <Link
                to="/quran"
                className="inline-flex items-center justify-center bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl group-hover:scale-105"
              >
                Start Reading
                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>

          {/* Hadith Card */}
          <div className="group relative bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 border border-emerald-100 overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-full"></div>
            <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-emerald-100 p-3 rounded-lg">
                  <span className="text-2xl text-emerald-600">📜</span>
                </div>
                <h3 className="text-2xl font-bold text-emerald-800">
                  Sacred Hadith
                </h3>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Explore authentic collections of Hadith with detailed explanations, 
                categorization by topic, and easy navigation to deepen your understanding.
              </p>
              <Link
                to="/hadith"
                className="inline-flex items-center justify-center bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl group-hover:scale-105"
              >
                Explore Hadith
                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-emerald-50">
            <div className="text-emerald-600 text-2xl mb-3">🌟</div>
            <h4 className="font-semibold text-emerald-700 mb-2">Authentic Sources</h4>
            <p className="text-sm text-gray-600">Verified content from trusted Islamic scholars</p>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-emerald-50">
            <div className="text-emerald-600 text-2xl mb-3">📱</div>
            <h4 className="font-semibold text-emerald-700 mb-2">Mobile Friendly</h4>
            <p className="text-sm text-gray-600">Optimized for reading on any device</p>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-emerald-50">
            <div className="text-emerald-600 text-2xl mb-3">🕋</div>
            <h4 className="font-semibold text-emerald-700 mb-2">Daily Reminders</h4>
            <p className="text-sm text-gray-600">Regular ayat and hadith for reflection</p>
          </div>
        </div>
      </section>
    </Container>
  );
}