const isServer = typeof window === 'undefined';
const API_URL = isServer ? 'https://backend-he9t.onrender.com/eventos' : '/api/eventos';

export async function getAllEvents() {
  const res = await fetch(API_URL);
  return res.json();
}

export async function getEventById(id) {
  const res = await fetch(`${API_URL}?id=${id}`);
  return res.json();
}
