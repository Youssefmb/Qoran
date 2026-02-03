export async function fetchSurah(id = 1,identifier ,name) {
  const cacheKey = `${name}/surah_${id}`;

  const local = localStorage.getItem(cacheKey);
  if (local) {
    return JSON.parse(local);
  }

  try {
    const localRes = await fetch(`/quran/${name}/surah_${id}.json`);

    if (localRes.ok) {
      const localData = await localRes.json();
      localStorage.setItem(cacheKey, JSON.stringify(localData));
      return localData;
    }
  } catch (err) {
    console.warn(`Local ${name}/surah_${id}.json not found`);
  }

  try {
    const apiRes = await fetch(
      `https://api.alquran.cloud/v1/surah/${id}/${identifier}`
    );

    if (!apiRes.ok) {
      throw new Error("Failed to fetch surah from API");
    }

    const apiData = await apiRes.json();
    localStorage.setItem(cacheKey, JSON.stringify(apiData.data));
    return apiData.data;
  } catch (err) {
    console.error("Surah fetch failed:", err);
    throw err;
  }
}
