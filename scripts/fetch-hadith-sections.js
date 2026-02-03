import fs from "fs";
import path from "path";
import fetch from "node-fetch";

// Folder where files will be stored
const OUTPUT_DIR = path.resolve("./public/hadith-sections");

// Create folder if it doesn't exist
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function fetchHadithSections(id) {
  const url = `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ara-bukhari1/sections/${id}.json`;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Failed to fetch hadith sections ${id} (status ${res.status})`);
    }

    const data = await res.json();

    const filePath = path.join(OUTPUT_DIR, `${id}.json`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    console.log(`✅ Saved ${id}.json`);
  } catch (error) {
    console.error(`❌ Error fetching hadith sections ${id}:`, error.message);
  }
}

async function fetchAllHadithSections() {
    for (let id = 1; id <= 97; id++) {
        await fetchHadithSections(id);
    
        // small delay to avoid API rate limits
        await new Promise((r) => setTimeout(r, 300));
      }
}

// Run
fetchAllHadithSections();
