export async function fetchReciters() {

    const local = localStorage.getItem('Reciters');
    if (local) {
      return JSON.parse(local);
    }
  
    try {
      const localRes = await fetch(`/qoran/qoran.json`);
  
      if (localRes.ok) {
        const localData = await localRes.json();
        localStorage.setItem('Reciters', JSON.stringify(localData));
        return localData;
      }
    } catch (err) {
      console.warn(`Local Reciters.json not found`);
    }
  
    try {
      const apiRes = await fetch(
        `http://api.alquran.cloud/v1/edition?format=text&language=ar`
      );
  
      if (!apiRes.ok) {
        throw new Error("Failed to fetch Reciters from API");
      }
  
      const apiData = await apiRes.json();
      localStorage.setItem('Reciters', JSON.stringify(apiData.data));
      return apiData.data;
    } catch (err) {
      console.error("Reciters fetch failed:", err);
      throw err;
    }
  }
  