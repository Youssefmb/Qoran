import Container from "../../components/layout/Container";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchReciters } from "../../api/reciters";
import Loader from "../../components/common/Loader";
import { motion } from "framer-motion";

export default function Reciters() {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        async function loadReciters() {
            try {
                setLoading(true);
                const data = await fetchReciters();
                setList(data.data || []);
            } catch (error) {
                console.error("Error loading reciters:", error);
            } finally {
                setLoading(false);
            }
        }
        loadReciters();
    }, []);

    // Filter reciters based on search
    const filteredReciters = list.filter(reciter => 
        reciter.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reciter.englishName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Animation variants
    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 }
    };

    const staggerContainer = {
        animate: {
            transition: {
                staggerChildren: 0.1
            }
        }
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

                <motion.div 
                    className="row align-items-center"
                    initial="initial"
                    animate="animate"
                    variants={staggerContainer}
                >
                    <div className="col-12 text-center">
                        <motion.div variants={fadeInUp}>
                            <span className="badge bg-success-soft text-success mb-3 px-4 py-2 rounded-pill">
                                <i className="bi bi-mic me-2"></i>
                                Reciters & Qaris
                            </span>
                        </motion.div>

                        <motion.h1 
                            className="display-4 fw-bold mb-3"
                            variants={fadeInUp}
                            style={{ 
                                fontFamily: "'Amiri', serif",
                                color: '#0B4619'
                            }}
                        >
                            القرآن الكريم بصوت
                        </motion.h1>

                        <motion.p 
                            className="lead text-muted mb-4 mx-auto"
                            style={{ maxWidth: '600px' }}
                            variants={fadeInUp}
                        >
                            Listen to the beautiful recitation of the Qur'an by renowned reciters from around the world
                        </motion.p>

                        {/* Search Bar */}
                        <motion.div 
                            className="mx-auto mb-4"
                            style={{ maxWidth: '500px' }}
                            variants={fadeInUp}
                        >
                            <div className="input-group">
                                <span className="input-group-text bg-white border-end-0">
                                    <i className="bi bi-search text-success"></i>
                                </span>
                                <input
                                    type="text"
                                    className="form-control form-control-lg border-start-0"
                                    placeholder="Search reciter..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    style={{
                                        borderLeft: 'none',
                                        boxShadow: 'none'
                                    }}
                                />
                                {searchTerm && (
                                    <button 
                                        className="btn btn-outline-secondary border-start-0"
                                        onClick={() => setSearchTerm("")}
                                        type="button"
                                    >
                                        <i className="bi bi-x"></i>
                                    </button>
                                )}
                            </div>
                        </motion.div>

                        {/* Stats */}
                        <motion.div 
                            className="d-flex justify-content-center gap-4"
                            variants={fadeInUp}
                        >
                            <div className="text-center">
                                <div className="h3 fw-bold text-success mb-0">{list.length}</div>
                                <small className="text-muted">Total Reciters</small>
                            </div>
                            <div className="text-center">
                                <div className="h3 fw-bold text-success mb-0">
                                    {new Set(list.map(r => r.englishName?.split(' ').pop())).size}
                                </div>
                                <small className="text-muted">Nationalities</small>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            {/* Reciters Grid */}
            <motion.div 
                className="row g-4"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
            >
                {filteredReciters.length > 0 ? (
                    filteredReciters.map((reciter, index) => (
                        <motion.div 
                            key={reciter.identifier || index} 
                            className="col-12 col-sm-6 col-lg-4 col-xl-3"
                            variants={fadeInUp}
                        >
                            <Link
                                to={`/quran/${reciter.identifier}/${reciter.name}`}
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
                                    {/* Decorative Element */}
                                    <div 
                                        className="position-relative"
                                        style={{
                                            height: '8px',
                                            background: 'linear-gradient(90deg, #1B6B3F, #0B4619)'
                                        }}
                                    />
                                    
                                    <div className="card-body p-4">
                                        {/* Quran Icon */}
                                        <div className="text-center mb-3">
                                            <div 
                                                className="mx-auto d-flex align-items-center justify-content-center"
                                                style={{
                                                    width: '80px',
                                                    height: '80px',
                                                    background: 'rgba(27, 107, 63, 0.1)',
                                                    borderRadius: '50%'
                                                }}
                                            >
                                                <i className="bi bi-mic fs-1" style={{ color: '#1B6B3F' }}></i>
                                            </div>
                                        </div>

                                        {/* Arabic Name */}
                                        <h2
                                            className="text-center mb-2"
                                            style={{ 
                                                fontFamily: "'Amiri', serif", 
                                                fontSize: "1.8rem",
                                                color: "#0B4619",
                                                lineHeight: 1.4
                                            }}
                                        >
                                            {reciter.name}
                                        </h2>

                                        {/* Badges */}
                                        <div className="d-flex flex-wrap gap-2 justify-content-center">
                                            {reciter.englishName?.includes(' ') && (
                                                <span className="badge bg-success-soft text-success px-3 py-2">
                                                    <i className="bi bi-geo-alt me-1"></i>
                                                    {reciter.englishName.split(' ').pop()}
                                                </span>
                                            )}
                                            <span className="badge bg-warning-soft text-warning px-3 py-2">
                                                <i className="bi bi-headphones me-1"></i>
                                                Recitations
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            </Link>
                        </motion.div>
                    ))
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
                        <h3 className="h4 mb-2">No reciters found</h3>
                        <p className="text-muted">
                            Try searching with a different name or term
                        </p>
                        <button 
                            className="btn btn-outline-success rounded-pill px-4 mt-3"
                            onClick={() => setSearchTerm("")}
                        >
                            Clear Search
                        </button>
                    </motion.div>
                )}
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
                
                .hover-shadow {
                    transition: all 0.3s ease;
                }
                
                .hover-shadow:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 20px 30px rgba(0,0,0,0.1) !important;
                }
                
                .input-group-text {
                    border-radius: 50px 0 0 50px;
                    border: 1px solid #dee2e6;
                }
                
                .form-control {
                    border-radius: 0 50px 50px 0;
                    border: 1px solid #dee2e6;
                }
                
                .form-control:focus {
                    border-color: #1B6B3F;
                    box-shadow: 0 0 0 0.2rem rgba(27, 107, 63, 0.1);
                }
            `}</style>
        </Container>
    );
}