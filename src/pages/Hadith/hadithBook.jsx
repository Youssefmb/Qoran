import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Container from "../../components/layout/Container";
import { fetchHadith } from "../../api/hadith";
import Loader from "../../components/common/Loader";
import { motion } from "framer-motion";

export default function HadithBook() {
  const { name } = useParams(); 
  const [hadithData, setHadithData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function getData() {
      try {
        const data = await fetchHadith(); 
        setHadithData(data);
      } catch (err) {
        console.error("Failed to fetch Hadith:", err);
        setHadithData({});
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, []);

  // Filter books based on search
  const filteredBooks = (books) => {
    return books.filter(book => 
      book.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.language?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

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

  if (!hadithData) {
    return (
      <Container>
        <div className="text-center py-5">
          <i className="bi bi-exclamation-triangle fs-1 text-warning mb-3"></i>
          <h3>No data available</h3>
          <Link to="/hadith" className="btn btn-outline-warning mt-3">
            Back to Collections
          </Link>
        </div>
      </Container>
    );
  }

  const collection = Object.values(hadithData).find(
    (col) => col.name === name
  );

  if (!collection) {
    return (
      <Container>
        <div className="text-center py-5">
          <div 
            className="mx-auto d-flex align-items-center justify-content-center mb-4"
            style={{
              width: '100px',
              height: '100px',
              background: 'rgba(180, 139, 58, 0.1)',
              borderRadius: '50%'
            }}
          >
            <i className="bi bi-journal-x fs-1" style={{ color: '#B48B3A' }}></i>
          </div>
          <h3 className="h4 mb-2">Collection Not Found</h3>
          <p className="text-muted mb-3">
            The collection "{name}" could not be found.
          </p>
          <Link 
            to="/hadith" 
            className="btn btn-warning text-white rounded-pill px-4"
            style={{ background: 'linear-gradient(135deg, #B48B3A 0%, #8B691F 100%)', border: 'none' }}
          >
            <i className="bi bi-arrow-left me-2"></i>
            Back to Collections
          </Link>
        </div>
      </Container>
    );
  }

  const books = collection.collection || [];
  const filteredBooksList = filteredBooks(books);
  const totalHadith = books.reduce((acc, book) => acc + (book.totalHadith || 0), 0);

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

        {/* Breadcrumb Navigation */}
        <motion.div 
          className="mb-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/hadith" className="text-warning text-decoration-none">
                  Hadith Collections
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page" style={{ color: '#8B691F' }}>
                {collection.name}
              </li>
            </ol>
          </nav>
        </motion.div>

        <motion.div 
          className="row align-items-center"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <div className="col-12 text-center">
            <motion.div variants={fadeInUp}>
              <span className="badge bg-warning-soft text-warning mb-3 px-4 py-2 rounded-pill">
                <i className="bi bi-journal-bookmark-fill me-2"></i>
                {collection.name} - كتب
              </span>
            </motion.div>

            <motion.h1 
              className="display-4 fw-bold mb-3"
              variants={fadeInUp}
              style={{ 
                fontFamily: "'Amiri', serif",
                color: '#8B691F',
                fontSize: 'clamp(2rem, 5vw, 3.5rem)'
              }}
            >
              {collection.name}
            </motion.h1>

            <motion.p 
              className="lead text-muted mb-4 mx-auto"
              style={{ maxWidth: '600px' }}
              variants={fadeInUp}
            >
              Explore the books of {collection.name} collection
            </motion.p>

            {/* Stats Cards */}
            <motion.div 
              className="d-flex justify-content-center gap-3 flex-wrap mb-4"
              variants={fadeInUp}
            >
              <div className="bg-white p-3 rounded-4 shadow-sm" style={{ minWidth: '120px' }}>
                <div className="h3 fw-bold mb-0" style={{ color: '#B48B3A' }}>{books.length}</div>
                <small className="text-muted">Books</small>
              </div>
              <div className="bg-white p-3 rounded-4 shadow-sm" style={{ minWidth: '120px' }}>
                <div className="h3 fw-bold mb-0" style={{ color: '#B48B3A' }}>{totalHadith}+</div>
                <small className="text-muted">Hadith</small>
              </div>
              <div className="bg-white p-3 rounded-4 shadow-sm" style={{ minWidth: '120px' }}>
                <div className="h3 fw-bold mb-0" style={{ color: '#B48B3A' }}>{books.length}</div>
                <small className="text-muted">Sections</small>
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
                  placeholder="Search books..."
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

      {/* Books Grid */}
      <motion.div 
        className="row g-4"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {filteredBooksList.length > 0 ? (
          filteredBooksList.map((book, index) => {
            const currentIndex = index + 1;
            
            return (
              <motion.div 
                key={index} 
                className="col-12 col-sm-6 col-lg-4 col-xl-3"
                variants={fadeInUp}
              >
                <Link
                  to={`/hadith/${book.book}/${book.name}/${currentIndex}`}
                  className="text-decoration-none"
                >
                  <motion.div 
                    className="card h-100 border-0 shadow-sm overflow-hidden"
                    style={{ 
                      borderRadius: '20px',
                      background: 'linear-gradient(135deg, #ffffff 0%, #fdf9f0 100%)',
                      transition: 'all 0.3s ease',
                      borderLeft: '5px solid #B48B3A'
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
                        height: '6px',
                        background: 'linear-gradient(90deg, #B48B3A, #8B691F)'
                      }}
                    />
                    
                    <div className="card-body p-4">
                      {/* Book Icon */}
                      <div className="text-center mb-3">
                        <div 
                          className="mx-auto d-flex align-items-center justify-content-center"
                          style={{
                            width: '70px',
                            height: '70px',
                            background: 'rgba(180, 139, 58, 0.1)',
                            borderRadius: '50%'
                          }}
                        >
                          <i className="bi bi-book fs-1" style={{ color: '#B48B3A' }}></i>
                        </div>
                      </div>

                      {/* Book Number Badge */}
                      <div className="position-absolute top-0 end-0 m-3">
                        <span 
                          className="badge rounded-circle d-flex align-items-center justify-content-center"
                          style={{
                            width: '30px',
                            height: '30px',
                            background: '#B48B3A',
                            color: 'white',
                            fontSize: '0.8rem'
                          }}
                        >
                          {String(currentIndex).padStart(2, '0')}
                        </span>
                      </div>

                      {/* Book Name */}
                      <h5
                        className="text-center mb-2"
                        style={{ 
                          fontFamily: "'Amiri', serif",
                          fontSize: "1.3rem",
                          color: "#8B691F",
                          fontWeight: "bold",
                          lineHeight: 1.4
                        }}
                      >
                        {book.name}
                      </h5>

                      {/* Language Badge */}
                      {book.language && (
                        <p className="text-center text-muted small mb-3">
                          {book.language}
                        </p>
                      )}

                      {/* Book Details */}
                      <div className="d-flex justify-content-center gap-2 mb-3">
                        {book.totalHadith && (
                          <span className="badge bg-warning-soft text-warning px-3 py-2">
                            <i className="bi bi-chat-quote me-1"></i>
                            {book.totalHadith} Hadith
                          </span>
                        )}
                        {book.sections && (
                          <span className="badge bg-warning-soft text-warning px-3 py-2">
                            <i className="bi bi-layers me-1"></i>
                            {book.sections} Sections
                          </span>
                        )}
                      </div>

                      {/* Explore Button */}
                      <div className="mt-3">
                        <span 
                          className="btn w-100 text-white"
                          style={{ 
                            background: 'linear-gradient(135deg, #B48B3A 0%, #8B691F 100%)',
                            borderRadius: '50px',
                            padding: '10px'
                          }}
                        >
                          <i className="bi bi-journal-bookmark-fill me-2"></i>
                          Explore Book
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
            <h3 className="h4 mb-2">No books found</h3>
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

      {/* Collection Information */}
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
              background: 'linear-gradient(135deg, #fdf9f0 0%, #ffffff 100%)',
              border: '1px solid rgba(180,139,58,0.2)'
            }}
          >
            <div className="card-body p-4">
              <div className="row align-items-center">
                <div className="col-lg-8">
                  <h5 className="mb-3" style={{ color: '#8B691F' }}>
                    <i className="bi bi-info-circle me-2"></i>
                    About {collection.name}
                  </h5>
                  <p className="text-muted mb-0">
                    This collection contains {books.length} books with approximately {totalHadith}+ hadith. 
                    Each book covers specific topics and chapters of Islamic jurisprudence, ethics, and teachings.
                  </p>
                </div>
                <div className="col-lg-4 text-lg-end mt-3 mt-lg-0">
                  <Link 
                    to="/hadith" 
                    className="btn btn-outline-warning rounded-pill px-4"
                    style={{ borderColor: '#B48B3A', color: '#B48B3A' }}
                  >
                    <i className="bi bi-arrow-left me-2"></i>
                    All Collections
                  </Link>
                </div>
              </div>
            </div>
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
        
        .breadcrumb-item + .breadcrumb-item::before {
          color: #B48B3A;
        }
        
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </Container>
  );
}