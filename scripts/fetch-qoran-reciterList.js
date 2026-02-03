import fs from "fs";
import path from "path";
import fetch from "node-fetch";

// Folder where files will be stored
const OUTPUT_DIR = path.resolve("./public/qoran");

// Create folder if it doesn't exist
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function fetchQoranReciterList() {
  const url = `http://api.alquran.cloud/v1/edition?format=text&language=ar`;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Failed to fetch qoran reciter list (status ${res.status})`);
    }

    const data = await res.json();

    const filePath = path.join(OUTPUT_DIR, `qoran.json`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    console.log(`✅ Saved qoran.json`);
  } catch (error) {
    console.error(`❌ Error fetching qoran reciter list:`, error.message);
  }
}

async function fetchAllQoranReciterList() {
    await fetchQoranReciterList();

}

// Run
fetchAllQoranReciterList();
