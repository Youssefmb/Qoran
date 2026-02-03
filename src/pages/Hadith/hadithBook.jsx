import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Container from "../../components/layout/Container";
import { fetchHadith } from "../../api/hadith";
import Loader from "../../components/common/Loader";

export default function HadithBook() {
  const { name } = useParams(); 
  const [hadithData, setHadithData] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <Loader />;

  if (!hadithData) return <p className="text-center text-danger">No data available</p>;

  const collection = Object.values(hadithData).find(
    (col) => col.name === name
  );

  if (!collection)
    return (
      <Container>
        <p className="text-center text-danger">
          Collection "{name}" not found.
        </p>
      </Container>
    );

  return (
    <Container>
      <div className="text-center mb-5">
        <h1 className="display-4 text-success mb-3">{collection.name}</h1>
        <p className="text-muted">Select a book to explore its sections</p>
      </div>

      <div className="row g-3">
        {collection.collection.map((book, index) => {
          const currentIndex = index + 1;
          return (
            <div key={index} className="col-6 col-md-4 col-lg-3">
              <Link
                to={`/hadith/${book.book}/${book.name}/${currentIndex}`}
                className="card h-100 text-decoration-none shadow-sm border-0 hover-shadow"
              >
                <div className="card h-100 shadow-sm border-success">
                  <div className="card-body text-center">
                    <h5 className="card-title text-success">{book.name}</h5>
                    <p className="card-text text-muted">{book.language}</p>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </Container>
  );
}
