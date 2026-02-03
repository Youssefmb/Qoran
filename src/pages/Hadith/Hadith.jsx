import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from "../../components/layout/Container";
import { fetchHadith } from "../../api/hadith";
import Loader from "../../components/common/Loader";

export default function Hadith() {
  const [hadithData, setHadithData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      const data = await fetchHadith();
      setHadithData(data);
      setLoading(false);
    }
    getData();
  }, []);

  if (loading) return <Loader />;

  return (
    <Container>
      <div className="text-center mb-5">
        <h1 className="display-4 text-success mb-3">Hadith Collections</h1>
        <p className="text-muted">Select a collection to explore its books</p>
      </div>

      <div className="row g-3">
        {Object.entries(hadithData).map(([collectionKey, collection]) => {
          return (
            <div key={collectionKey} className="col-6 col-md-4 col-lg-3">
              <Link
                to={`/hadith/${collection.name}`}
                className="card h-100 text-decoration-none shadow-sm border-0 hover-shadow"
              >
                <div className="card h-100 shadow-sm border-success">
                  <div className="card-body text-center">
                    <h5 className="card-title text-success">{collection.name}</h5>
                    <p className="card-text text-muted">
                      {collection.collection.length} book(s)
                    </p>
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
