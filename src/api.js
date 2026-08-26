const API_BASE = 'http://localhost:8080/api';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, options);
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.detail || body.message || 'The server could not complete the request.');
  }
  return response.json();
}

export function searchPrices({ city, locality, treatment }) {
  const params = new URLSearchParams({ city, locality, treatment });
  return request(`/public/prices?${params}`);
}

export function hospitalLogin(email, password) {
  return request('/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
}

export function getHospitalPrices(token) {
  return request('/hospital/prices', { headers: { Authorization: `Bearer ${token}` } });
}

export function updateHospitalPrice(token, treatmentId, price, note) {
  return request(`/hospital/prices/${treatmentId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ price, note }) });
}
