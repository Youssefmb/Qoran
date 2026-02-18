import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchSurah } from "../../api/quran.api";
import Loader from "../../components/common/Loader";
import Container from "../../components/layout/Container";
import { motion, AnimatePresence } from "framer-motion";

export default function Surah() {
    const { id, identifier, name } = useParams();
    const [surah, setSurah] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedAyah, setSelectedAyah] = useState(null);
    const [showTafsir, setShowTafsir] = useState(false);
    const [fontSize, setFontSize] = useState(1.5);
    const [translation, setTranslation] = useState(true);
    const [bookmarkedAyahs, setBookmarkedAyahs] = useState([]);
    
    const ayahRefs = useRef([]);

    useEffect(() => {
        async function loadSurah() {
            try {
                setLoading(true);
                const data = await fetchSurah(id, identifier, name);
                setSurah(data);
                
                // Load bookmarks from localStorage
                const saved = localStorage.getItem(`bookmarks-${id}`);
                if (saved) {
                    setBookmarkedAyahs(JSON.parse(saved));
                }
            } catch (error) {
                console.error("Error loading surah:", error);
            } finally {
                setLoading(false);
            }
        }
        loadSurah();
    }, [id, identifier, name]);

    // Toggle bookmark for an ayah
    const toggleBookmark = (ayahNumber) => {
        setBookmarkedAyahs(prev => {
            const newBookmarks = prev.includes(ayahNumber)
                ? prev.filter(num => num !== ayahNumber)
                : [...prev, ayahNumber];
            
            localStorage.setItem(`bookmarks-${id}`, JSON.stringify(newBookmarks));
            return newBookmarks;
        });
    };

    // Scroll to specific ayah
    const scrollToAyah = (ayahNumber) => {
        ayahRefs.current[ayahNumber]?.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    };

    // Animation variants
    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 }
    };

    if (loading) {
        return (
            <Container>
                <div className="min-vh-100 d-flex align-items-center justify-content-center">
                    <Loader />
                </div>
            </Container>
        );
    }

    if (!surah) {
        return (
            <Container>
                <div className="text-center py-5">
                    <i className="bi bi-exclamation-triangle fs-1 text-warning mb-3"></i>
                    <h3>Surah not found</h3>
                    <Link to="/quran" className="btn btn-success mt-3">
                        Back to Quran
                    </Link>
                </div>
            </Container>
        );
    }

    return (
        <Container>
            {/* Header with Islamic Pattern */}
            <section className="position-relative overflow-hidden py-4 mb-4">
                {/* Islamic Pattern Overlay */}
                <div 
                    className="position-absolute top-0 start-0 w-100 h-100 opacity-10"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cpath d='M20 0 L40 20 L20 40 L0 20 Z' fill='%2300632f' opacity='0.2'/%3E%3C/svg%3E")`,
                        backgroundSize: '60px 60px',
                    }}
                />

                <motion.div 
                    className="row align-items-center"
                    initial="initial"
                    animate="animate"
                    variants={fadeInUp}
                >
                    <div className="col-12">
                        {/* Breadcrumb */}
                        <nav aria-label="breadcrumb" className="mb-3">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to="/quran" className="text-success text-decoration-none">Quran</Link>
                                </li>
                                <li className="breadcrumb-item">
                                    <Link to={`/quran/${identifier}/${name}`} className="text-success text-decoration-none">
                                        {name || 'Reciter'}
                                    </Link>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">
                                    Surah {surah.englishName}
                                </li>
                            </ol>
                        </nav>

                        {/* Surah Info Card */}
                        <div 
                            className="card border-0 shadow-lg overflow-hidden"
                            style={{ 
                                borderRadius: '25px',
                                background: 'linear-gradient(135deg, #0B4619 0%, #1B6B3F 100%)'
                            }}
                        >
                            <div className="card-body p-4 p-lg-5 text-white">
                                <div className="row align-items-center">
                                    <div className="col-lg-8">
                                        <div className="d-flex align-items-center gap-3 mb-3">
                                          
                                        </div>
                                        
                                        <h1 
                                            className="display-3 fw-bold mb-3"
                                            style={{ 
                                                fontFamily: "'Amiri', serif",
                                                textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
                                            }}
                                        >
                                            {surah.name}
                                        </h1>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="d-flex flex-wrap gap-3 justify-content-between align-items-center mt-4">
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Bismillah */}
            <motion.div 
                className="text-center mb-5"
                variants={fadeInUp}
                initial="initial"
                animate="animate"
            >
                <div 
                    className="d-inline-block p-4 rounded-4"
                    style={{ 
                        background: 'rgba(27, 107, 63, 0.05)',
                        borderLeft: '5px solid #1B6B3F'
                    }}
                >
                    <p 
                        className="fs-1 fw-bold mb-2"
                        style={{ 
                            fontFamily: "'Amiri', serif",
                            color: '#0B4619'
                        }}
                    >
                        بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                    </p>
                </div>
            </motion.div>

            {/* Verses */}
            <motion.div 
                className="accordion" 
                id="surahAccordion"
                variants={fadeInUp}
                initial="initial"
                animate="animate"
            >
                <AnimatePresence>
                    {surah.ayahs?.map((ayah, index) => {
                        const isBookmarked = bookmarkedAyahs.includes(ayah.numberInSurah);
                        
                        return (
                            <motion.div
                                key={ayah.number}
                                ref={el => ayahRefs.current[ayah.numberInSurah] = el}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.02 }}
                                className="mb-3"
                                id={`ayah-${ayah.numberInSurah}`}
                            >
                                <div 
                                    className={`card border-0 shadow-sm overflow-hidden ${isBookmarked ? 'border-warning' : ''}`}
                                    style={{ 
                                        borderRadius: '20px',
                                        borderRight: isBookmarked ? '5px solid #B48B3A' : 'none'
                                    }}
                                >
                                    {/* Verse Header */}
                                    <div 
                                        className="card-header bg-white p-3 d-flex align-items-center"
                                        style={{ 
                                            cursor: 'pointer',
                                            borderBottom: '1px solid rgba(0,0,0,0.05)'
                                        }}
                                        onClick={() => setSelectedAyah(selectedAyah === ayah.numberInSurah ? null : ayah.numberInSurah)}
                                    >
                                        <span 
                                            className="badge rounded-circle d-flex align-items-center justify-content-center me-3"
                                            style={{
                                                width: '35px',
                                                height: '35px',
                                                background: 'rgba(27, 107, 63, 0.1)',
                                                color: '#1B6B3F',
                                                fontSize: '0.9rem'
                                            }}
                                        >
                                            {ayah.numberInSurah}
                                        </span>
                                        
                                        <div className="flex-grow-1">
                                            <p 
                                                className="mb-0 text-end"
                                                style={{ 
                                                    fontSize: `${fontSize}rem`,
                                                    fontFamily: "'Amiri', serif",
                                                    lineHeight: 1.8,
                                                    color: '#0B4619'
                                                }}
                                            >
                                                {ayah.text}
                                            </p>
                                        </div>

                                        <div className="d-flex gap-2 ms-3">
                                            <button 
                                                className={`btn btn-sm ${isBookmarked ? 'btn-warning' : 'btn-outline-warning'} rounded-circle`}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleBookmark(ayah.numberInSurah);
                                                }}
                                                style={{ width: '35px', height: '35px' }}
                                            >
                                                <i className={`bi ${isBookmarked ? 'bi-bookmark-fill' : 'bi-bookmark'}`}></i>
                                            </button>
                                            <button 
                                                className="btn btn-sm btn-outline-success rounded-circle"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    // Copy verse to clipboard
                                                    navigator.clipboard.writeText(ayah.text);
                                                    // Show toast notification (you can implement this)
                                                }}
                                                style={{ width: '35px', height: '35px' }}
                                            >
                                                <i className="bi bi-files"></i>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Verse Content (Expandable) */}
                                    <AnimatePresence>
                                        {selectedAyah === ayah.numberInSurah && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="overflow-hidden"
                                            >
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </motion.div>

            {/* Bottom Navigation */}
            <motion.div 
                className="d-flex justify-content-between align-items-center mt-5 pt-4 border-top"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                <Link 
                    to={`/quran/${identifier}/${name}`}
                    className="btn btn-outline-success rounded-pill px-4"
                >
                    <i className="bi bi-arrow-left me-2"></i>
                    Back to Surahs
                </Link>
                
                <div className="d-flex gap-2">
                    <button 
                        className="btn btn-success rounded-circle"
                        style={{ width: '45px', height: '45px' }}
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                        <i className="bi bi-arrow-up"></i>
                    </button>
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
                
                .scrollable-menu {
                    max-height: 300px;
                    overflow-y: auto;
                }
                
                .card-header {
                    transition: background-color 0.3s ease;
                }
                
                .card-header:hover {
                    background-color: rgba(27, 107, 63, 0.02) !important;
                }
                
                audio {
                    border-radius: 50px;
                }
                
                audio::-webkit-media-controls-panel {
                    background-color: #f8f9fa;
                }
                
                /* Smooth scrolling */
                html {
                    scroll-behavior: smooth;
                }
            `}</style>
        </Container>
    );
}