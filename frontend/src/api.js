const API_URL = "http://localhost:5000";

export async function testBackend() {
  const res = await fetch(`${API_URL}/`);
  return res.text();
}
