import fs from "fs";
import path from "path";
import fetch from "node-fetch";

// Folder where files will be stored
const OUTPUT_DIR = path.resolve("./public/narrateurs");

// Create folder if it doesn't exist
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function fetchHadithNarrateurs() {
  const url = `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions.json`;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Failed to fetch hadith narrateurs (status ${res.status})`);
    }

    const data = await res.json();

    const filePath = path.join(OUTPUT_DIR, `hadith_narrateurs.json`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    console.log(`✅ Saved hadith_narrateurs.json`);
  } catch (error) {
    console.error(`❌ Error fetching hadith narrateurs:`, error.message);
  }
}

async function fetchAllHadithNarrateurs() {
    await fetchHadithNarrateurs();

}

// Run
fetchAllHadithNarrateurs();
