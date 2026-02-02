export async function fetchHadithSection(id = 1) {
  const local = localStorage.getItem(`hadith_${id}`);
  if (local) return JSON.parse(local);

  try {
    const res = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ara-bukhari1/sections/${id}.json`);
    const data = await res.json();
    localStorage.setItem(`hadith_${id}`, JSON.stringify(data));
    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
}
