import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function RouterError() {
  const error = useRouteError();
  const [funnyMessage, setFunnyMessage] = useState("");

  // Array of funny/relatable error messages
  const errorMessages = [
    "Looks like this page went for a coffee break ☕",
    "Even the best websites have bad days 😅",
    "404: Page not found. It's probably exploring the internet somewhere 🌐",
    "Oops! This page took a wrong turn at Albuquerque 🗺️",
    "Our servers are doing yoga right now. Please be patient 🧘",
    "This page is under construction. Wearing a hard hat? ⛑️",
    "Error: Page got lost in the matrix 🕶️",
    "We can't find this page, but we found you a joke instead: Why don't scientists trust atoms? Because they make up everything! 😄",
    "This page is playing hide and seek. And it's really good at hiding 🙈",
    "Our hamsters stopped running on the wheel. Giving them a break! 🐹"
  ];

  useEffect(() => {
    setFunnyMessage(errorMessages[Math.floor(Math.random() * errorMessages.length)]);
  }, []);

  // Animation variants
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

  // Get appropriate icon based on error status
  const getErrorIcon = (status) => {
    switch(status) {
      case 404:
        return "🔍";
      case 403:
        return "🚫";
      case 500:
        return "🔧";
      default:
        return "⚠️";
    }
  };

  // Get helpful message based on error status
  const getHelpfulMessage = (status) => {
    switch(status) {
      case 404:
        return "The page you're looking for doesn't exist or has been moved.";
      case 403:
        return "You don't have permission to access this page.";
      case 500:
        return "Something went wrong on our end. We're working on it!";
      default:
        return "Don't worry, even the best explorers get lost sometimes.";
    }
  };

  if (isRouteErrorResponse(error)) {
    return (
      <motion.div 
        className="min-vh-100 d-flex align-items-center justify-content-center p-4"
        style={{
          background: 'linear-gradient(135deg, #f5f7fa 0%, #e9ecef 100%)'
        }}
        initial="initial"
        animate="animate"
        variants={staggerChildren}
      >
        <div className="container">
          <div className="row justify-content-center">
            <motion.div 
              className="col-lg-8 col-xl-6 text-center"
              variants={fadeInUp}
            >
              {/* Error Image/Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.2
                }}
                className="mb-4"
              >
                <div 
                  className="mx-auto d-flex align-items-center justify-content-center"
                  style={{
                    width: '150px',
                    height: '150px',
                    background: 'white',
                    borderRadius: '50%',
                    boxShadow: '0 20px 30px rgba(0,0,0,0.1)',
                    fontSize: '5rem'
                  }}
                >
                  {getErrorIcon(error.status)}
                </div>
              </motion.div>

              {/* Error Status */}
              <motion.h1 
                className="display-1 fw-bold mb-3"
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: '6rem'
                }}
                variants={fadeInUp}
              >
                {error.status}
              </motion.h1>

              {/* Error Title */}
              <motion.h2 
                className="h2 mb-3"
                variants={fadeInUp}
              >
                {error.statusText || "Oops! Something went wrong"}
              </motion.h2>

              {/* Error Description */}
              <motion.p 
                className="text-muted mb-4 fs-5"
                variants={fadeInUp}
              >
                {getHelpfulMessage(error.status)}
              </motion.p>

              {/* Funny Message */}
              <motion.div 
                className="bg-white p-4 rounded-4 shadow-sm mb-4"
                variants={fadeInUp}
                style={{
                  borderLeft: '5px solid #667eea'
                }}
              >
                <p className="mb-0 fst-italic">
                  {funnyMessage}
                </p>
              </motion.div>

              {/* Action Buttons */}
              <motion.div 
                className="d-flex flex-wrap gap-3 justify-content-center"
                variants={fadeInUp}
              >
                <Link 
                  to="/" 
                  className="btn btn-primary btn-lg px-5 py-3 rounded-pill"
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    border: 'none',
                    boxShadow: '0 10px 20px rgba(102,126,234,0.3)'
                  }}
                >
                  <i className="bi bi-house-door-fill me-2"></i>
                  Go Home
                </Link>
                
                <button 
                  onClick={() => window.location.reload()}
                  className="btn btn-outline-secondary btn-lg px-5 py-3 rounded-pill"
                  style={{
                    border: '2px solid #dee2e6'
                  }}
                >
                  <i className="bi bi-arrow-clockwise me-2"></i>
                  Try Again
                </button>

                <button 
                  onClick={() => window.history.back()}
                  className="btn btn-outline-secondary btn-lg px-5 py-3 rounded-pill"
                  style={{
                    border: '2px solid #dee2e6'
                  }}
                >
                  <i className="bi bi-arrow-left me-2"></i>
                  Go Back
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Fallback for unexpected errors
  return (
    <motion.div 
      className="min-vh-100 d-flex align-items-center justify-content-center p-4"
      style={{
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e9ecef 100%)'
      }}
      initial="initial"
      animate="animate"
      variants={staggerChildren}
    >
      <div className="container">
        <div className="row justify-content-center">
          <motion.div 
            className="col-lg-8 col-xl-6 text-center"
            variants={fadeInUp}
          >
            {/* Error Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.2
              }}
              className="mb-4"
            >
              <div 
                className="mx-auto d-flex align-items-center justify-content-center"
                style={{
                  width: '150px',
                  height: '150px',
                  background: 'white',
                  borderRadius: '50%',
                  boxShadow: '0 20px 30px rgba(0,0,0,0.1)',
                  fontSize: '5rem'
                }}
              >
                🤔
              </div>
            </motion.div>

            {/* Error Title */}
            <motion.h1 
              className="display-4 fw-bold mb-3"
              style={{
                background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5253 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
              variants={fadeInUp}
            >
              Unexpected Error
            </motion.h1>

            {/* Error Message */}
            <motion.div 
              className="bg-white p-4 rounded-4 shadow-sm mb-4"
              variants={fadeInUp}
              style={{
                borderLeft: '5px solid #ff6b6b'
              }}
            >
              <p className="h5 mb-0">
                {error?.message || "Something unexpected happened. We're looking into it!"}
              </p>
            </motion.div>

            {/* Technical Details (Optional - can be hidden behind a toggle) */}
            <motion.details 
              className="mb-4 text-start bg-light p-3 rounded-3"
              variants={fadeInUp}
            >
              <summary className="fw-bold text-muted">
                <i className="bi bi-code-slash me-2"></i>
                Technical Details
              </summary>
              <pre className="mt-3 mb-0 p-3 bg-dark text-white rounded-3" style={{ fontSize: '0.9rem' }}>
                {JSON.stringify(error, null, 2)}
              </pre>
            </motion.details>

            {/* Action Buttons */}
            <motion.div 
              className="d-flex flex-wrap gap-3 justify-content-center"
              variants={fadeInUp}
            >
              <Link 
                to="/" 
                className="btn btn-primary btn-lg px-5 py-3 rounded-pill"
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none',
                  boxShadow: '0 10px 20px rgba(102,126,234,0.3)'
                }}
              >
                <i className="bi bi-house-door-fill me-2"></i>
                Go Home
              </Link>
              
              <button 
                onClick={() => window.location.reload()}
                className="btn btn-outline-secondary btn-lg px-5 py-3 rounded-pill"
              >
                <i className="bi bi-arrow-clockwise me-2"></i>
                Try Again
              </button>
            </motion.div>

            {/* Support Message */}
            <motion.p 
              className="mt-4 text-muted"
              variants={fadeInUp}
            >
              If this problem persists, please{" "}
              <Link to="/contact" className="text-decoration-none">
                contact our support team
              </Link>
            </motion.p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}