import fs from "fs";
import path from "path";

const EDITIONS_FILE = path.resolve("public/qoran/qoran.json");
const OUTPUT_ROOT = path.resolve("public/quran");

// Create folder if it doesn't exist
if (!fs.existsSync(OUTPUT_ROOT)) {
  fs.mkdirSync(OUTPUT_ROOT, { recursive: true });
}

// Read editions file
const raw = fs.readFileSync(EDITIONS_FILE, "utf-8");
const editionsData = JSON.parse(raw);

// Keep full objects (identifier + name)
const editions = editionsData.data.filter(
  item => item.identifier && item.name
);

// Make folder names filesystem-safe
function sanitizeFolderName(name) {
  return name
    .trim()
    .replace(/\s+/g, "_")
    .replace(/[\/\\:*?"<>|]/g, "")
    .replace(/_+/g, "_");
}

async function fetchSurah(identifier, surahId) {
  const url = `https://api.alquran.cloud/v1/surah/${surahId}/${identifier}`;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error(`❌ ${identifier} surah ${surahId} failed:`, err.message);
    return null;
  }
}

async function run() {
  for (const item of editions) {
    const identifier = item.identifier;
    const folderName = sanitizeFolderName(item.name);
    const dir = path.join(OUTPUT_ROOT, folderName);

    fs.mkdirSync(dir, { recursive: true });

    console.log(`📁 Fetching ${item.name} (${identifier})`);

    for (let surahId = 1; surahId <= 114; surahId++) {
      const data = await fetchSurah(identifier, surahId);
      if (!data) continue;

      const filePath = path.join(dir, `surah_${surahId}.json`);
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

      console.log(`  ✅ ${folderName}/surah_${surahId}.json`);

      // Delay to avoid rate limits
      await new Promise(r => setTimeout(r, 300));
    }
  }
}

run();
