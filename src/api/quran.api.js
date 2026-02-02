
  export async function fetchSurah(id = 1) {
    const local = localStorage.getItem(`surah_${id}`);
    if (local) return JSON.parse(local);
  
    try {
      const res = await fetch(
        `https://api.alquran.cloud/v1/surah/${id}/ar.alafasy`
      );
      const data = await res.json();
      localStorage.setItem(`surah_${id}`, JSON.stringify(data.data));
      return data.data;
    } catch (err) {
      console.error(err);
      return [];
    }
  }
  