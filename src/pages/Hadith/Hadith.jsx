import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from "../../components/layout/Container";
import { fetchHadith } from "../../api/hadith";
import Loader from "../../components/common/Loader";
import { motion } from "framer-motion";

export default function Hadith() {
  const [hadithData, setHadithData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const data = await fetchHadith();
        setHadithData(data);
      } catch (error) {
        console.error("Error loading hadith collections:", error);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, []);

  // Filter collections based on search
  const filteredCollections = hadithData 
    ? Object.entries(hadithData).filter(([_, collection]) => 
        collection.name?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

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

  // Get total stats
  const totalCollections = hadithData ? Object.keys(hadithData).length : 0;
  const totalBooks = hadithData 
    ? Object.values(hadithData).reduce((acc, collection) => acc + (collection.collection?.length || 0), 0)
    : 0;

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
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cpath d='M20 0 L40 20 L20 40 L0 20 Z' fill='%23B48B3A' opacity='0.2'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Decorative Hadith Symbol */}
        <div className="position-absolute top-0 end-0 mt-4 me-4 opacity-10">
          <span style={{ fontFamily: "'Amiri', serif", fontSize: '4rem', color: '#B48B3A' }}>ﷺ</span>
        </div>

        <motion.div 
          className="row align-items-center"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <div className="col-12 text-center">
            <motion.div variants={fadeInUp}>
              <span className="badge bg-warning-soft text-warning mb-3 px-4 py-2 rounded-pill">
                <i className="bi bi-chat-quote me-2"></i>
                الأحاديث النبوية
              </span>
            </motion.div>

            <motion.h1 
              className="display-4 fw-bold mb-3"
              variants={fadeInUp}
              style={{ 
                fontFamily: "'Amiri', serif",
                color: '#8B691F',
                fontSize: 'clamp(2rem, 5vw, 4rem)'
              }}
            >
              Sacred Hadith Collections
            </motion.h1>

            <motion.p 
              className="lead text-muted mb-4 mx-auto"
              style={{ maxWidth: '700px' }}
              variants={fadeInUp}
            >
              "Whoever follows a path in pursuit of knowledge, Allah makes easy for him a path to Paradise."
              <span className="d-block mt-2" style={{ color: '#B48B3A' }}>(Sahih Muslim)</span>
            </motion.p>

            {/* Stats Cards */}
            <motion.div 
              className="d-flex justify-content-center gap-3 flex-wrap mb-4"
              variants={fadeInUp}
            >
              <div className="bg-white p-3 rounded-4 shadow-sm" style={{ minWidth: '120px' }}>
                <div className="h3 fw-bold mb-0" style={{ color: '#B48B3A' }}>{totalCollections}</div>
                <small className="text-muted">Collections</small>
              </div>
              <div className="bg-white p-3 rounded-4 shadow-sm" style={{ minWidth: '120px' }}>
                <div className="h3 fw-bold mb-0" style={{ color: '#B48B3A' }}>{totalBooks}</div>
                <small className="text-muted">Books</small>
              </div>
              <div className="bg-white p-3 rounded-4 shadow-sm" style={{ minWidth: '120px' }}>
                <div className="h3 fw-bold mb-0" style={{ color: '#B48B3A' }}>+40,000</div>
                <small className="text-muted">Hadith</small>
              </div>
            </motion.div>

            {/* Search Bar */}
            <motion.div 
              className="mx-auto mb-4"
              style={{ maxWidth: '500px' }}
              variants={fadeInUp}
            >
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0">
                  <i className="bi bi-search" style={{ color: '#B48B3A' }}></i>
                </span>
                <input
                  type="text"
                  className="form-control form-control-lg border-start-0"
                  placeholder="Search collection (Bukhari, Muslim...)"
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
          </div>
        </motion.div>
      </section>

      {/* Collections Grid */}
      <motion.div 
        className="row g-4"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {filteredCollections.length > 0 ? (
          filteredCollections.map(([collectionKey, collection], index) => {
            // Determine if it's one of the major collections
            const isMajor = ['bukhari', 'muslim', 'abudawud', 'tirmidhi', 'nasai', 'ibnmajah'].includes(collectionKey.toLowerCase());
            
            return (
              <motion.div 
                key={collectionKey} 
                className="col-12 col-sm-6 col-lg-4 col-xl-3"
                variants={fadeInUp}
              >
                <Link
                  to={`/hadith/${collection.name}`}
                  className="text-decoration-none"
                >
                  <motion.div 
                    className="card h-100 border-0 shadow-sm overflow-hidden"
                    style={{ 
                      borderRadius: '20px',
                      background: 'linear-gradient(135deg, #ffffff 0%, #fdf9f0 100%)',
                      transition: 'all 0.3s ease',
                      borderLeft: isMajor ? '5px solid #B48B3A' : 'none'
                    }}
                    whileHover={{ 
                      y: -5,
                      boxShadow: '0 20px 30px rgba(180,139,58,0.15)'
                    }}
                  >
                    {/* Decorative Top Bar */}
                    <div 
                      className="position-relative"
                      style={{
                        height: '8px',
                        background: 'linear-gradient(90deg, #B48B3A, #8B691F)'
                      }}
                    />
                    
                    <div className="card-body p-4">
                      {/* Collection Icon */}
                      <div className="text-center mb-3">
                        <div 
                          className="mx-auto d-flex align-items-center justify-content-center"
                          style={{
                            width: '80px',
                            height: '80px',
                            background: 'rgba(180, 139, 58, 0.1)',
                            borderRadius: '50%'
                          }}
                        >
                          <i className="bi bi-journal-bookmark-fill fs-1" style={{ color: '#B48B3A' }}></i>
                        </div>
                      </div>

                      {/* Collection Name in Arabic (if available) */}
                      <h3
                        className="text-center mb-2"
                        style={{ 
                          fontFamily: "'Amiri', serif", 
                          fontSize: "1.8rem",
                          color: "#8B691F",
                          lineHeight: 1.4
                        }}
                      >
                        {collection.name}
                      </h3>

                      {/* English Name (if different) */}
                      {collection.englishName && (
                        <p className="text-center text-muted mb-3">
                          {collection.englishName}
                        </p>
                      )}

                      {/* Collection Details */}
                      <div className="d-flex justify-content-center gap-3 mb-3">
                        <span className="text-muted small">
                          <i className="bi bi-book me-1"></i>
                          {collection.collection?.length || 0} Books
                        </span>
                        {isMajor && (
                          <span className="text-muted small">
                            <i className="bi bi-star-fill me-1" style={{ color: '#B48B3A' }}></i>
                            Major Collection
                          </span>
                        )}
                      </div>

                      {/* Hadith Count Badge (if available) */}
                      {collection.totalHadith && (
                        <div className="text-center mb-3">
                          <span className="badge bg-warning-soft text-warning px-3 py-2">
                            {collection.totalHadith}+ Hadith
                          </span>
                        </div>
                      )}

                      {/* Explore Button */}
                      <div className="mt-3">
                        <span 
                          className="btn w-100 text-white"
                          style={{ 
                            background: 'linear-gradient(135deg, #B48B3A 0%, #8B691F 100%)',
                            borderRadius: '50px',
                            padding: '12px'
                          }}
                        >
                          <i className="bi bi-journal-bookmark-fill me-2"></i>
                          Explore Collection
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
                background: 'rgba(180, 139, 58, 0.1)',
                borderRadius: '50%'
              }}
            >
              <i className="bi bi-search fs-1" style={{ color: '#B48B3A' }}></i>
            </div>
            <h3 className="h4 mb-2">No collections found</h3>
            <p className="text-muted">
              Try searching with a different name
            </p>
            <button 
              className="btn btn-outline-warning rounded-pill px-4 mt-3"
              onClick={() => setSearchTerm("")}
              style={{ borderColor: '#B48B3A', color: '#B48B3A' }}
            >
              Clear Search
            </button>
          </motion.div>
        )}
      </motion.div>

      {/* Featured Hadith Section */}
      <motion.div 
        className="row mt-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="col-12">
          <div 
            className="card border-0 shadow-sm overflow-hidden"
            style={{ 
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #B48B3A 0%, #8B691F 100%)'
            }}
          >
            <div className="card-body p-4 p-lg-5 text-white">
              <div className="row align-items-center">
                <div className="col-lg-8">
                  <i className="bi bi-quote display-1 mb-3 opacity-50"></i>
                  <p className="fs-3 mb-3" style={{ fontFamily: "'Amiri', serif" }}>
                    "إنما الأعمال بالنيات، وإنما لكل امرئ ما نوى"
                  </p>
                  <p className="mb-0 opacity-75">
                    "Actions are judged by intentions, and everyone will be rewarded according to what they intended"
                  </p>
                </div>
                <div className="col-lg-4 text-lg-end mt-3 mt-lg-0">
                  <p className="small opacity-75 mb-1">Sahih Bukhari & Muslim</p>
                  <p className="fw-bold mb-0">Hadith 1</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Info About Major Collections */}
      <motion.div 
        className="row mt-4 g-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <div className="col-md-4">
          <div className="bg-light p-3 rounded-4 text-center h-100">
            <i className="bi bi-bookmark-star fs-2" style={{ color: '#B48B3A' }}></i>
            <h6 className="mt-2 mb-1">Sahihain</h6>
            <p className="small text-muted mb-0">Bukhari & Muslim - The most authentic collections</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="bg-light p-3 rounded-4 text-center h-100">
            <i className="bi bi-collection fs-2" style={{ color: '#B48B3A' }}></i>
            <h6 className="mt-2 mb-1">Sunan</h6>
            <p className="small text-muted mb-0">Abu Dawud, Tirmidhi, Nasai, Ibn Majah</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="bg-light p-3 rounded-4 text-center h-100">
            <i className="bi bi-chat-square-text fs-2" style={{ color: '#B48B3A' }}></i>
            <h6 className="mt-2 mb-1">Other Collections</h6>
            <p className="small text-muted mb-0">Musnad Ahmad, Muwatta Malik, and more</p>
          </div>
        </div>
      </motion.div>

      {/* Custom Styles */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&display=swap');
        @import url('https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.11.3/font/bootstrap-icons.min.css');
        
        .bg-warning-soft {
          background-color: rgba(180, 139, 58, 0.1);
        }
        
        .form-control, .form-select {
          border-radius: 50px;
          border: 1px solid #dee2e6;
        }
        
        .form-control:focus, .form-select:focus {
          border-color: #B48B3A;
          box-shadow: 0 0 0 0.2rem rgba(180, 139, 58, 0.1);
        }
        
        .input-group .input-group-text {
          border-radius: 50px 0 0 50px;
        }
        
        .input-group .form-control {
          border-radius: 0 50px 50px 0;
        }
        
        .btn-outline-warning:hover {
          background: linear-gradient(135deg, #B48B3A 0%, #8B691F 100%);
          border-color: #B48B3A;
        }
        
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </Container>
  );
}