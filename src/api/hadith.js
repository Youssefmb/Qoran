export async function fetchHadith() {
  const cacheKey = "narrateurs";

  const local = localStorage.getItem(cacheKey);
  if (local) {
    return JSON.parse(local);
  }

  try {
    const fileRes = await fetch("/narrateurs/narrateurs.json");
    if (fileRes.ok) {
      const fileData = await fileRes.json();
      localStorage.setItem(cacheKey, JSON.stringify(fileData));
      return fileData;
    }
  } catch (err) {
    console.warn("Local hadith metadata.json not found");
  }

  try {
    const apiRes = await fetch(
      "https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions.json"
    );

    if (!apiRes.ok) {
      throw new Error("Failed to fetch hadith metadata from API");
    }

    const apiData = await apiRes.json();
    const metadata = apiData.metadata;

    localStorage.setItem(cacheKey, JSON.stringify(metadata));
    return metadata;
  } catch (err) {
    console.error("Hadith metadata fetch failed:", err);
    throw err;
  }
}
