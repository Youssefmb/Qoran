import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from "../../components/layout/Container";
import { fetchHadith } from "../../api/hadith";
import Loader from "../../components/common/Loader"; // optional spinner

export default function Hadith() {
  const [hadithData, setHadithData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      const data = await fetchHadith();
      console.log(data);
      setHadithData(data);
      setLoading(false);
    }
    getData();
  }, []);

  if (loading) return <Loader />;

  return (
    <Container>
      <div className="text-center mb-5">
        <h1 className="display-4 text-success mb-3">{hadithData.name}</h1>
        <p className="text-muted">Select a section to explore its hadiths</p>
      </div>

      <div className="row g-3">
        {Object.entries(hadithData.sections).map(([key, sectionName]) => {
          if (!sectionName) return null; // skip empty sections
          return (
            <div key={key} className="col-6 col-md-4 col-lg-3">
              <Link
                to={`/hadith/section/${key}`}
                className="text-decoration-none"
              >
                <div className="card h-100 shadow-sm border-success">
                  <div className="card-body text-center">
                    <h5 className="card-title text-success">{sectionName}</h5>
                    <p className="card-text text-muted">Section {key}</p>
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
