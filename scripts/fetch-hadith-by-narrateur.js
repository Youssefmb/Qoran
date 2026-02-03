import fs from "fs";
import path from "path";
import fetch from "node-fetch";

// Paths
const INDEX_FILE = path.resolve("public/narrateurs/narrateurs.json");
const OUTPUT_DIR = path.resolve("public/hadith-by-narrateur");

if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

// Read index file
const rawIndex = fs.readFileSync(INDEX_FILE, "utf-8");
const indexData = JSON.parse(rawIndex);

let counter = 1;

async function fetchAndSaveHadithByNarrateur(link, filename) {
  try {
    const res = await fetch(link);

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const data = await res.json();
    const filePath = path.join(OUTPUT_DIR, filename);

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`✅ Saved ${filename}`);
  } catch (err) {
    console.error(`❌ Failed ${filename}:`, err.message);
  }
}

async function run() {
  for (const bookKey of Object.keys(indexData)) {
    const book = indexData[bookKey];

    if (!book.collection || !Array.isArray(book.collection)) continue;

    for (const item of book.collection) {
      if (!item.link) continue;

      const filename = `${item.book}_${counter}.json`;
      await fetchAndSaveHadithByNarrateur(item.link, filename);

      counter++;

      await new Promise((r) => setTimeout(r, 300));
    }
  }
}

run();
