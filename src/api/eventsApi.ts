const API_URL = "http://localhost:3000/eventos";

export async function getAllEvents() {
  const res = await fetch(API_URL);
  return res.json();
}

export async function getEventById(id) {
  const res = await fetch(`${API_URL}?id=${id}`);
  return res.json();
}
