export async function fetchTafsir(id = 1) {
    try {
      const res = await fetch(
        `https://api.alquran.cloud/v1/surah/${id}/ar.muyassar`
        );
  
      if (!res.ok) throw new Error("Failed to fetch surah");
  
      const data = await res.json();
      return data.data;
    } catch (err) {
      console.error(err);
      return [];
    }
  }
  