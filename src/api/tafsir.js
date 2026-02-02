export async function fetchTafsir(id = 1) {
    const local = localStorage.getItem(`tafsir_${id}`);
    if (local) return JSON.parse(local);
  
    try {
      const res = await fetch(
       `https://api.alquran.cloud/v1/surah/${id}/ar.muyassar`
      );
      const data = await res.json();
      localStorage.setItem(`tafsir_${id}`, JSON.stringify(data.data));
      return data.data;
    } catch (err) {
      console.error(err);
      return [];
    }
  }
  