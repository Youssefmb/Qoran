import { useEffect, useState } from "react";
import Container from "../../components/layout/Container";
import Loader from "../../components/common/Loader";
import { fetchHadithSection } from "../../api/hadithSection"; // import your API function

export default function HadithList({ sectionId = 1 }) {
  const [hadiths, setHadiths] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedHadith, setExpandedHadith] = useState(null); // currently expanded hadith number

  useEffect(() => {
    async function loadHadiths(id) {
      setLoading(true);
      try {
        const data = await fetchHadithSection(id); // use the external function
        setHadiths(data.hadiths || []);
      } catch (err) {
        console.error(err);
        setHadiths([]);
      } finally {
        setLoading(false);
      }
    }

    loadHadiths(sectionId);
  }, [sectionId]);

  const toggleHadith = (hadithNumber) => {
    setExpandedHadith(expandedHadith === hadithNumber ? null : hadithNumber);
  };

  if (loading) return <Loader />;

  return (
    <Container>
      <ul className="list-group">
        {hadiths.map((hadith) => (
          <li key={hadith.hadithnumber} className="list-group-item">
            <div
              className="cursor-pointer text-success font-medium"
              onClick={() => toggleHadith(hadith.hadithnumber)}
            >
              Hadith {hadith.hadithnumber}
            </div>
            {expandedHadith === hadith.hadithnumber && (
              <p className="mt-2 text-gray-700">{hadith.text}</p>
            )}
          </li>
        ))}
      </ul>
    </Container>
  );
}
