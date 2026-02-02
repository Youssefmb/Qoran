  export async function fetchHadith() {
    const local = localStorage.getItem(`hadith`);
    if (local) return JSON.parse(local);
  
    try {
      const res = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ara-bukhari1.json`);
      const data = await res.json();
      localStorage.setItem(`hadith`, JSON.stringify(data.metadata));
      return data.metadata;
    } catch (err) {
      console.error(err);
      return [];
    }
  }
  
  