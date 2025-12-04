export default async function fetching(endpoint) {
  try {
    const response = await fetch(import.meta.env.VITE_URL_DATA + endpoint);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(`Error: ${error.message}`)
  }
}
