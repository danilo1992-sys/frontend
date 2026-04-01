const url = "http://localhost:3000/eventos";

export default async function Getevents() {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Error");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error", error);
    return [];
  }
}
