const API_BASE = 'http://localhost:8080/api';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, options);
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.detail || body.message || 'The server could not complete the request.');
  }
  return response.json();
}

export function searchPrices({ city, treatment }) {
  const params = new URLSearchParams({ city, treatment });
  return request(`/public/prices?${params}`);
}

export function getTreatments() {
  return request('/public/treatments');
}

export function getPublicHospitals(city) {
  return request(`/public/hospitals?${new URLSearchParams({ city })}`);
}

export function getCities() {
  return request('/public/cities');
}

export function hospitalLogin(email, password) {
  return request('/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
}

export function hospitalSignup(details) {
  return request('/auth/signup', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(details) });
}

export function setUpManualHospitalAccount(token, password) {
  return request('/auth/manual-account/setup-password', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token, password }) });
}

export function submitManualVerification(formData) {
  return request('/hospital-verifications', { method: 'POST', body: formData });
}

export function submitPatientReceipt(formData) {
  return request('/patient-receipts', { method: 'POST', body: formData });
}

export function adminLogin(email, password) {
  return request('/admin/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
}

export function adminLogout(token) {
  return request('/admin/auth/logout', { method: 'POST', headers: { Authorization: `Bearer ${token}` } });
}

export function getVerificationRequests(token, status = 'PENDING', page = 0) {
  return request(`/admin/verification-requests?status=${status}&page=${page}&size=10`, { headers: { Authorization: `Bearer ${token}` } });
}

export function approveVerificationRequest(token, id, { latitude, longitude, city, locality, hospitalImage }) {
  const formData = new FormData();
  formData.append('latitude', latitude);
  formData.append('longitude', longitude);
  formData.append('city', city);
  formData.append('locality', locality);
  formData.append('hospitalImage', hospitalImage);
  return request(`/admin/verification-requests/${id}/approve`, { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: formData });
}

export function declineVerificationRequest(token, id) {
  return request(`/admin/verification-requests/${id}/decline`, { method: 'POST', headers: { Authorization: `Bearer ${token}` } });
}

export function getPatientReceipts(token, status = 'ALL', page = 0) {
  return request(`/admin/patient-receipts?status=${status}&page=${page}&size=10`, { headers: { Authorization: `Bearer ${token}` } });
}
export function approvePatientReceipt(token, id) { return request(`/admin/patient-receipts/${id}/approve`, { method: 'POST', headers: { Authorization: `Bearer ${token}` } }); }
export function declinePatientReceipt(token, id) { return request(`/admin/patient-receipts/${id}/decline`, { method: 'POST', headers: { Authorization: `Bearer ${token}` } }); }
export async function getPatientReceiptDocument(token, id, fileName) { const response = await fetch(`${API_BASE}/admin/patient-receipts/${id}/documents/${encodeURIComponent(fileName)}`, { headers: { Authorization: `Bearer ${token}` } }); if (!response.ok) throw new Error('The receipt document could not be opened.'); return response.blob(); }

export async function getVerificationDocument(token, id, fileName) {
  const response = await fetch(`${API_BASE}/admin/verification-requests/${id}/documents/${encodeURIComponent(fileName)}`, { headers: { Authorization: `Bearer ${token}` } });
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.detail || body.message || 'The document could not be opened.');
  }
  return response.blob();
}

export function getHospitalPrices(token) {
  return request('/hospital/prices', { headers: { Authorization: `Bearer ${token}` } });
}

export function updateHospitalPrice(token, treatmentId, price, note) {
  return request(`/hospital/prices/${treatmentId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ price, note }) });
}

export function createHospitalTreatment(token, treatment) {
  return request('/hospital/prices', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(treatment) });
}
