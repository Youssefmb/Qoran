export async function fetchHadithSection(id = 1 ,name ,identifier) {
  const cacheKey = `${name}_${identifier}_${id}`;

  const local = localStorage.getItem(cacheKey);
  if (local) {
    return JSON.parse(local);
  }

  try {
    const fileRes = await fetch(`/hadith-by-narrateur/${name}/${name}_${id}.json`);

    if (fileRes.ok) {
      const fileData = await fileRes.json();
      localStorage.setItem(cacheKey, JSON.stringify(fileData));
      return fileData;
    }
  } catch (err) {
    console.warn(`Local hadith section ${id}.json not found`);
  }
  try {
    const apiRes = await fetch(
      `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/${identifier}/sections/${id}.json`
    );

    if (!apiRes.ok) {
      throw new Error("Failed to fetch hadith section from API");
    }

    const apiData = await apiRes.json();
    localStorage.setItem(cacheKey, JSON.stringify(apiData));
    return apiData;
  } catch (err) {
    console.error("Hadith section fetch failed:", err);
    throw err;
  }
}
