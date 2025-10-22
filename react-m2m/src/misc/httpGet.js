// Generic HTTP GET helper
export async function httpGet(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json(); // parse JSON
      return data;
    } catch (err) {
      console.error(`Error fetching from ${url}:`, err);
      throw err;
    }
  }
  