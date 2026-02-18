import { Link } from "react-router-dom";
import Container from "../components/layout/Container";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Home() {
    const [currentTime, setCurrentTime] = useState(new Date());
    
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const getArabicGreeting = () => {
        const hours = currentTime.getHours();
        if (hours < 12) return "صباح الخير";
        if (hours < 17) return "مساء الخير";
        return "مساء النور";
    };

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    const staggerChildren = {
        animate: {
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    return (
        <Container>
            {/* Hero Section with Islamic Pattern */}
            <section className="position-relative overflow-hidden py-5 mb-5" dir="rtl">
                {/* Islamic Pattern Overlay */}
                <div 
                    className="position-absolute top-0 start-0 w-100 h-100 opacity-10"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cpath d='M20 0 L40 20 L20 40 L0 20 Z' fill='%23C49A2B' opacity='0.3'/%3E%3C/svg%3E")`,
                        backgroundSize: '60px 60px',
                    }}
                />

                {/* Decorative Arabic Calligraphy Pattern */}
                <div className="position-absolute top-0 start-0 mt-4 ms-4 opacity-10">
                    <svg width="120" height="120" viewBox="0 0 100 100">
                        <text x="10" y="50" fontFamily="'Amiri', serif" fontSize="40" fill="#C49A2B">
                            ﷽
                        </text>
                    </svg>
                </div>

                <motion.div 
                    className="row min-vh-50 align-items-center text-center"
                    initial="initial"
                    animate="animate"
                    variants={staggerChildren}
                >
                    <div className="col-lg-8 mx-auto">
                        <motion.div variants={fadeInUp}>
                            <span className="badge bg-warning-soft text-warning mb-3 px-4 py-2 rounded-pill" 
                                  style={{ fontFamily: "'Amiri', serif", fontSize: '1.2rem' }}>
                                <i className="bi bi-moon-stars ms-2"></i>
                                {getArabicGreeting()} - السلام عليكم ورحمة الله
                            </span>
                        </motion.div>

                        <motion.h1 
                            className="display-2 fw-bold mb-4"
                            variants={fadeInUp}
                            style={{ 
                                fontFamily: "'Amiri', 'Traditional Arabic', serif",
                                color: '#1E4D2E',
                                textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                                lineHeight: 1.8
                            }}
                        >
                            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                        </motion.h1>

                        <motion.h2 
                            className="display-4 fw-bold mb-3"
                            variants={fadeInUp}
                            style={{ 
                                fontFamily: "'Amiri', serif",
                                color: '#B48B3A'
                            }}
                        >
                            القرآن الكريم والحديث الشريف
                        </motion.h2>

                        <motion.p 
                            className="lead mb-4 mx-auto"
                            style={{ 
                                maxWidth: '800px',
                                fontFamily: "'Amiri', serif",
                                fontSize: '1.5rem',
                                color: '#2C5F2D'
                            }}
                            variants={fadeInUp}
                        >
                            "ذَٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ"
                            <span className="d-block mt-2 text-muted" style={{ fontSize: '1.2rem' }}>
                                (سورة البقرة، الآية 2)
                            </span>
                        </motion.p>
                    </div>
                </motion.div>
            </section>

            {/* Cards Section with Arabic Text */}
            <motion.section 
                className="row g-4 justify-content-center py-5"
                initial="initial"
                animate="animate"
                variants={staggerChildren}
                dir="rtl"
            >
                {/* Quran Card */}
                <motion.div className="col-md-5" variants={fadeInUp}>
                    <div 
                        className="card border-0 shadow-lg h-100 overflow-hidden"
                        style={{ 
                            borderRadius: '25px',
                            background: 'linear-gradient(145deg, #F5F7F0 0%, #FFFFFF 100%)',
                            borderRight: '5px solid #1E4D2E'
                        }}
                    >
                        <div className="position-relative">
                            {/* Arabic Decoration */}
                            <div 
                                className="position-absolute top-0 end-0 m-3"
                                style={{
                                    fontFamily: "'Amiri', serif",
                                    fontSize: '3rem',
                                    opacity: 0.1,
                                    color: '#1E4D2E',
                                    transform: 'rotate(-10deg)'
                                }}
                            >
                                ﷽
                            </div>
                            
                            <div className="card-body p-4 p-lg-5">
                                <div className="d-flex align-items-center mb-4">
                                    <div 
                                        className="rounded-circle p-3 ms-3 d-flex align-items-center justify-content-center"
                                        style={{ 
                                            background: 'linear-gradient(135deg, #1E4D2E 0%, #2C5F2D 100%)',
                                            boxShadow: '0 10px 20px rgba(30,77,46,0.2)',
                                            width: '70px',
                                            height: '70px'
                                        }}
                                    >
                                        <i className="bi bi-book-half fs-1 text-white"></i>
                                    </div>
                                    <div>
                                        <h2 className="h1 fw-bold mb-1" style={{ color: '#1E4D2E', fontFamily: "'Amiri', serif" }}>
                                            القرآن الكريم
                                        </h2>
                                        <p className="text-muted mb-0" style={{ fontFamily: "'Amiri', serif", fontSize: '1.1rem' }}>
                                            Al-Qur'an Al-Kareem
                                        </p>
                                    </div>
                                </div>

                                <p className="text-muted mb-4 fs-5" style={{ fontFamily: "'Amiri', serif", lineHeight: 1.8 }}>
                                    انغمس في الوحي الإلهي. اقرأ مع الترجمة والتفسير 
                                    والاستماع إلى التلاوات الجميلة.
                                </p>

                                {/* Features in Arabic */}
                                <div className="mb-4">
                                    <div className="d-flex align-items-center mb-3">
                                        <i className="bi bi-check-circle-fill text-success ms-2" style={{ fontSize: '1.2rem' }}></i>
                                        <span style={{ fontFamily: "'Amiri', serif", fontSize: '1.1rem' }}>ترجمات متعددة</span>
                                    </div>
                                    <div className="d-flex align-items-center mb-3">
                                        <i className="bi bi-check-circle-fill text-success ms-2" style={{ fontSize: '1.2rem' }}></i>
                                        <span style={{ fontFamily: "'Amiri', serif", fontSize: '1.1rem' }}>تلاوات صوتية</span>
                                    </div>
                                    <div className="d-flex align-items-center mb-3">
                                        <i className="bi bi-check-circle-fill text-success ms-2" style={{ fontSize: '1.2rem' }}></i>
                                        <span style={{ fontFamily: "'Amiri', serif", fontSize: '1.1rem' }}>تحليل كلمة بكلمة</span>
                                    </div>
                                </div>

                                <Link 
                                    to="/quran" 
                                    className="btn btn-lg w-100 text-white"
                                    style={{ 
                                        background: 'linear-gradient(135deg, #1E4D2E 0%, #2C5F2D 100%)',
                                        borderRadius: '50px',
                                        padding: '15px',
                                        fontFamily: "'Amiri', serif",
                                        fontSize: '1.3rem'
                                    }}
                                >
                                    <i className="bi bi-book-open ms-2"></i>
                                    ابدأ رحلتك
                                </Link>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Hadith Card */}
                <motion.div className="col-md-5" variants={fadeInUp}>
                    <div 
                        className="card border-0 shadow-lg h-100 overflow-hidden"
                        style={{ 
                            borderRadius: '25px',
                            background: 'linear-gradient(145deg, #FDF9F0 0%, #FFFFFF 100%)',
                            borderLeft: '5px solid #B48B3A'
                        }}
                    >
                        <div className="position-relative">
                            {/* Hadith Decoration */}
                            <div 
                                className="position-absolute bottom-0 start-0 m-3"
                                style={{
                                    fontFamily: "'Amiri', serif",
                                    fontSize: '2.5rem',
                                    opacity: 0.1,
                                    color: '#B48B3A'
                                }}
                            >
                                ﷺ
                            </div>
                            
                            <div className="card-body p-4 p-lg-5">
                                <div className="d-flex align-items-center mb-4">
                                    <div 
                                        className="rounded-circle p-3 ms-3 d-flex align-items-center justify-content-center"
                                        style={{ 
                                            background: 'linear-gradient(135deg, #B48B3A 0%, #8B691F 100%)',
                                            boxShadow: '0 10px 20px rgba(180,139,58,0.2)',
                                            width: '70px',
                                            height: '70px'
                                        }}
                                    >
                                        <i className="bi bi-chat-quote fs-1 text-white"></i>
                                    </div>
                                    <div>
                                        <h2 className="h1 fw-bold mb-1" style={{ color: '#8B691F', fontFamily: "'Amiri', serif" }}>
                                            الحديث الشريف
                                        </h2>
                                        <p className="text-muted mb-0" style={{ fontFamily: "'Amiri', serif", fontSize: '1.1rem' }}>
                                            Al-Hadith Al-Shareef
                                        </p>
                                    </div>
                                </div>

                                <p className="text-muted mb-4 fs-5" style={{ fontFamily: "'Amiri', serif", lineHeight: 1.8 }}>
                                    استكشف الأحاديث النبوية مع المجموعات الصحيحة 
                                    والشروحات والتصنيفات.
                                </p>

                                {/* Hadith Collections in Arabic */}
                                <div className="mb-4">
                                    <div className="d-flex flex-wrap gap-2 justify-content-end">
                                        <span className="badge bg-warning-soft text-warning px-3 py-2" 
                                              style={{ fontFamily: "'Amiri', serif", fontSize: '1rem' }}>
                                            صحيح البخاري
                                        </span>
                                        <span className="badge bg-warning-soft text-warning px-3 py-2"
                                              style={{ fontFamily: "'Amiri', serif", fontSize: '1rem' }}>
                                            صحيح مسلم
                                        </span>
                                        <span className="badge bg-warning-soft text-warning px-3 py-2"
                                              style={{ fontFamily: "'Amiri', serif", fontSize: '1rem' }}>
                                            سنن أبي داود
                                        </span>
                                        <span className="badge bg-warning-soft text-warning px-3 py-2"
                                              style={{ fontFamily: "'Amiri', serif", fontSize: '1rem' }}>
                                            جامع الترمذي
                                        </span>
                                    </div>
                                </div>

                                <Link 
                                    to="/hadith" 
                                    className="btn btn-lg w-100 text-white"
                                    style={{ 
                                        background: 'linear-gradient(135deg, #B48B3A 0%, #8B691F 100%)',
                                        borderRadius: '50px',
                                        padding: '15px',
                                        fontFamily: "'Amiri', serif",
                                        fontSize: '1.3rem'
                                    }}
                                >
                                    <i className="bi bi-journal-bookmark-fill ms-2"></i>
                                    اكتشف الحكمة
                                </Link>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.section>

            {/* Additional Islamic Quote */}
            <motion.div 
                className="text-center my-5 py-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
            >
                <div className="position-relative">
                    <div className="position-absolute top-0 start-50 translate-middle-x">
                        <i className="bi bi-quote display-1 text-warning opacity-25"></i>
                    </div>
                    <p className="fs-3 fst-italic text-muted mb-2" style={{ fontFamily: "'Amiri', serif", paddingTop: '30px' }}>
                        "خيركم من تعلم القرآن وعلمه"
                    </p>
                    <p className="text-success" style={{ fontFamily: "'Amiri', serif" }}>
                        - النبي محمد ﷺ
                    </p>
                </div>
            </motion.div>

            <style jsx>{`
                @import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&display=swap');
                @import url('https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.11.3/font/bootstrap-icons.min.css');
                
                .bg-success-soft {
                    background-color: rgba(30, 77, 46, 0.1);
                }
                .bg-warning-soft {
                    background-color: rgba(180, 139, 58, 0.1);
                }
                
                body {
                    font-family: 'Amiri', serif;
                }
                
                [dir="rtl"] {
                    text-align: right;
                }
                
                .card {
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }
                
                .card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 20px 30px rgba(0,0,0,0.1) !important;
                }
            `}</style>
        </Container>
    );
}