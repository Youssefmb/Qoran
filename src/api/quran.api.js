export async function fetchSurah(id = 1) {
    try {
      const res = await fetch(
        `https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ara-quranacademy/${id}.json`
      );
  
      if (!res.ok) throw new Error("Failed to fetch surah");
  
      const data = await res.json();
      return data.chapter; // Array of ayahs
    } catch (err) {
      console.error(err);
      return [];
    }
  }
  