import fs from "fs";
import path from "path";
import fetch from "node-fetch";

// Folder where files will be stored
const OUTPUT_DIR = path.resolve("./public/hadith");

// Create folder if it doesn't exist
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function fetchHadith() {
  const url = `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ara-bukhari1.json`;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Failed to fetch hadith (status ${res.status})`);
    }

    const data = await res.json();

    const filePath = path.join(OUTPUT_DIR, `hadith.json`);
    fs.writeFileSync(filePath, JSON.stringify(data.metadata, null, 2));

    console.log(`✅ Saved hadith.json`);
  } catch (error) {
    console.error(`❌ Error fetching hadith:`, error.message);
  }
}

async function fetchAllHadiths() {
    await fetchHadith();

}

// Run
fetchAllHadiths();
