import Container from "../../components/layout/Container";
import surahs from "../../api/surahList.api.json";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Quran() {
    const { identifier, name } = useParams();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedJuz, setSelectedJuz] = useState("all");

    // Filter surahs based on search
    const filteredSurahs = surahs.filter(surah => 
        surah.surahNameArabicLong?.includes(searchTerm) ||
        surah.surahNameArabicShort?.includes(searchTerm) ||
        surah.surahNameEnglish?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        surah.surahNameTranslation?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Group surahs by Juz (simplified - you might want to add actual Juz data)
    const juzOptions = ["all", "1-5", "6-10", "11-15", "16-20", "21-30"];

    // Animation variants
    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 }
    };

    const staggerContainer = {
        animate: {
            transition: {
                staggerChildren: 0.05
            }
        }
    };

    // Get total stats
    const totalAyahs = surahs.reduce((acc, surah) => acc + surah.totalAyah, 0);
    const totalSurahs = surahs.length;

    return (
        <Container>
            {/* Header Section with Islamic Pattern */}
            <section className="position-relative overflow-hidden py-5 mb-4">
                {/* Islamic Pattern Overlay */}
                <div 
                    className="position-absolute top-0 start-0 w-100 h-100 opacity-10"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cpath d='M20 0 L40 20 L20 40 L0 20 Z' fill='%2300632f' opacity='0.2'/%3E%3C/svg%3E")`,
                        backgroundSize: '60px 60px',
                    }}
                />

                {/* Decorative Arabic Text */}
                <div className="position-absolute top-0 end-0 mt-4 me-4 opacity-10">
                    <span style={{ fontFamily: "'Amiri', serif", fontSize: '4rem', color: '#0B4619' }}>﷽</span>
                </div>

                <motion.div 
                    className="row align-items-center"
                    initial="initial"
                    animate="animate"
                    variants={staggerContainer}
                >
                    <div className="col-12 text-center">
                        <motion.div variants={fadeInUp}>
                            <span className="badge bg-success-soft text-success mb-3 px-4 py-2 rounded-pill">
                                <i className="bi bi-book-half me-2"></i>
                                القرآن الكريم
                            </span>
                        </motion.div>

                        <motion.h1 
                            className="display-4 fw-bold mb-3"
                            variants={fadeInUp}
                            style={{ 
                                fontFamily: "'Amiri', serif",
                                color: '#0B4619',
                                fontSize: 'clamp(2rem, 5vw, 4rem)'
                            }}
                        >
                            سور القرآن الكريم
                        </motion.h1>

                        <motion.p 
                            className="lead text-muted mb-4 mx-auto"
                            style={{ maxWidth: '700px' }}
                            variants={fadeInUp}
                        >
                            "This is the Book about which there is no doubt, a guidance for those conscious of Allah"
                            <span className="d-block mt-2 text-success">(Qur'an 2:2)</span>
                        </motion.p>

                        {/* Stats Cards */}
                        <motion.div 
                            className="d-flex justify-content-center gap-3 flex-wrap mb-4"
                            variants={fadeInUp}
                        >
                            <div className="bg-white p-3 rounded-4 shadow-sm" style={{ minWidth: '120px' }}>
                                <div className="h3 fw-bold text-success mb-0">{totalSurahs}</div>
                                <small className="text-muted">Surahs</small>
                            </div>
                            <div className="bg-white p-3 rounded-4 shadow-sm" style={{ minWidth: '120px' }}>
                                <div className="h3 fw-bold text-success mb-0">{totalAyahs}</div>
                                <small className="text-muted">Verses</small>
                            </div>
                            <div className="bg-white p-3 rounded-4 shadow-sm" style={{ minWidth: '120px' }}>
                                <div className="h3 fw-bold text-success mb-0">30</div>
                                <small className="text-muted">Juz</small>
                            </div>
                        </motion.div>

                        {/* Search and Filter */}
                        <motion.div 
                            className="row g-3 justify-content-center"
                            variants={fadeInUp}
                        >
                            <div className="col-md-6">
                                <div className="input-group">
                                    <span className="input-group-text bg-white border-end-0">
                                        <i className="bi bi-search text-success"></i>
                                    </span>
                                    <input
                                        type="text"
                                        className="form-control form-control-lg border-start-0"
                                        placeholder="Search surah (البقرة...)"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        style={{
                                            borderLeft: 'none',
                                            boxShadow: 'none'
                                        }}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            {/* Surahs Grid */}
            <motion.div 
                className="row g-4"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
            >
                {filteredSurahs.length > 0 ? (
                    filteredSurahs.map((surah, index) => {
                        const surahId = index + 1;
                        const isMeccan = surah.revelationType === "Meccan";
                        
                        return (
                            <motion.div 
                                key={surahId} 
                                className="col-12 col-sm-6 col-lg-4 col-xl-3"
                                variants={fadeInUp}
                            >
                                <Link
                                    to={`/quran/${identifier || 'reciter'}/${name || 'name'}/${surahId}`}
                                    className="text-decoration-none"
                                >
                                    <motion.div 
                                        className="card h-100 border-0 shadow-sm overflow-hidden"
                                        style={{ 
                                            borderRadius: '20px',
                                            background: 'linear-gradient(135deg, #ffffff 0%, #f8fff9 100%)',
                                            transition: 'all 0.3s ease'
                                        }}
                                        whileHover={{ 
                                            y: -5,
                                            boxShadow: '0 20px 30px rgba(0,99,47,0.1)'
                                        }}
                                    >
                                        {/* Colored top bar based on revelation type */}
                                        <div 
                                            className="position-relative"
                                            style={{
                                                height: '6px',
                                                background: isMeccan 
                                                    ? 'linear-gradient(90deg, #B48B3A, #8B691F)'
                                                    : 'linear-gradient(90deg, #1B6B3F, #0B4619)'
                                            }}
                                        />
                                        
                                        <div className="card-body p-4">
                                            {/* Surah Number Badge */}
                                            <div className="d-flex justify-content-between align-items-start mb-3">
                                                <span 
                                                    className="badge rounded-circle d-flex align-items-center justify-content-center"
                                                    style={{
                                                        width: '35px',
                                                        height: '35px',
                                                        background: 'rgba(27, 107, 63, 0.1)',
                                                        color: '#1B6B3F',
                                                        fontSize: '0.9rem'
                                                    }}
                                                >
                                                    {String(surahId).padStart(2, '0')}
                                                </span>
                                                <span className={`badge ${isMeccan ? 'bg-warning-soft text-warning' : 'bg-success-soft text-success'}`}>
                                                    {surah.revelationType}
                                                </span>
                                            </div>

                                            {/* Arabic Name */}
                                            <h2
                                                className="text-center mb-2"
                                                style={{ 
                                                    fontFamily: "'Amiri', serif", 
                                                    fontSize: "2rem",
                                                    color: "#0B4619",
                                                    lineHeight: 1.4
                                                }}
                                            >
                                                {surah.surahNameArabicLong}
                                            </h2>

                                            {/* Surah Info */}
                                            <div className="d-flex justify-content-center gap-3 mb-3">
                                                <span className="text-muted small">
                                                    <i className="bi bi-book me-1"></i>
                                                    {surah.totalAyah} Ayahs
                                                </span>
                                                {surah.juz && (
                                                    <span className="text-muted small">
                                                        <i className="bi bi-layers me-1"></i>
                                                        Juz {surah.juz}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Read Button */}
                                            <div className="mt-3">
                                                <span 
                                                    className="btn w-100 text-white"
                                                    style={{ 
                                                        background: 'linear-gradient(135deg, #1B6B3F 0%, #0B4619 100%)',
                                                        borderRadius: '50px',
                                                        padding: '10px'
                                                    }}
                                                >
                                                    <i className="bi bi-book-open me-2"></i>
                                                    Read Surah
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                </Link>
                            </motion.div>
                        );
                    })
                ) : (
                    // No results found
                    <motion.div 
                        className="col-12 text-center py-5"
                        variants={fadeInUp}
                    >
                        <div 
                            className="mx-auto d-flex align-items-center justify-content-center mb-4"
                            style={{
                                width: '100px',
                                height: '100px',
                                background: 'rgba(0,99,47,0.1)',
                                borderRadius: '50%'
                            }}
                        >
                            <i className="bi bi-search fs-1 text-success"></i>
                        </div>
                        <h3 className="h4 mb-2">No surahs found</h3>
                        <p className="text-muted">
                            Try searching with a different name or term
                        </p>
                        <button 
                            className="btn btn-outline-success rounded-pill px-4 mt-3"
                            onClick={() => {
                                setSearchTerm("");
                                setSelectedJuz("all");
                            }}
                        >
                            Clear Filters
                        </button>
                    </motion.div>
                )}
            </motion.div>

            {/* Featured Verse */}
            <motion.div 
                className="row mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
            >
                <div className="col-12">
                    <div 
                        className="card border-0 shadow-sm overflow-hidden"
                        style={{ 
                            borderRadius: '20px',
                            background: 'linear-gradient(135deg, #0B4619 0%, #1B6B3F 100%)'
                        }}
                    >
                        <div className="card-body p-4 p-lg-5 text-white text-center">
                            <p className="fs-3 mb-3" style={{ fontFamily: "'Amiri', serif" }}>
                                "إِنَّ هَٰذَا الْقُرْآنَ يَهْدِي لِلَّتِي هِيَ أَقْوَمُ"
                            </p>
                            <p className="mb-0 opacity-75">
                                "Indeed, this Qur'an guides to that which is most suitable" (Qur'an 17:9)
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Custom Styles */}
            <style jsx>{`
                @import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&display=swap');
                @import url('https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.11.3/font/bootstrap-icons.min.css');
                
                .bg-success-soft {
                    background-color: rgba(27, 107, 63, 0.1);
                }
                .bg-warning-soft {
                    background-color: rgba(180, 139, 58, 0.1);
                }
                
                .form-control, .form-select {
                    border-radius: 50px;
                    border: 1px solid #dee2e6;
                }
                
                .form-control:focus, .form-select:focus {
                    border-color: #1B6B3F;
                    box-shadow: 0 0 0 0.2rem rgba(27, 107, 63, 0.1);
                }
                
                .input-group .input-group-text {
                    border-radius: 50px 0 0 50px;
                }
                
                .input-group .form-control {
                    border-radius: 0 50px 50px 0;
                }
                
                /* Smooth scrolling */
                html {
                    scroll-behavior: smooth;
                }
            `}</style>
        </Container>
    );
}