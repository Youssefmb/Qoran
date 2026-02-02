export async function fetchHadithSection(id = 1) {
    try {
      const res = await fetch(
            `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ara-bukhari1/sections/${id}.json`
            );
  
      if (!res.ok) throw new Error("Failed to fetch surah");
  
      const data = await res.json();
      return data;
    } catch (err) {
      console.error(err);
      return [];
    }
  }
  