import { useEffect, useState } from 'react';
import { adminLogin, adminLogout, approveVerificationRequest, declineVerificationRequest, getCities, getVerificationDocument, getVerificationRequests } from '../api.js';

export default function AdminHospitalReviews() {
  const [token, setToken] = useState(() => localStorage.getItem('admin-session-token') ?? '');
  const [data, setData] = useState(null);
  const [status, setStatus] = useState('ALL');
  const [selected, setSelected] = useState(null);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [city, setCity] = useState('');
  const [locality, setLocality] = useState('');
  const [hospitalImage, setHospitalImage] = useState(null);
  const [cities, setCities] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const load = async (nextStatus = status, page = 0, activeToken = token) => {
    setLoading(true); setError('');
    try { setData(await getVerificationRequests(activeToken, nextStatus, page)); setStatus(nextStatus); }
    catch (err) { setError(err.message); setData(null); }
    finally { setLoading(false); }
  };

  useEffect(() => { if (token) load('ALL', 0, token); }, []);
  useEffect(() => { getCities().then(setCities).catch((err) => setError(err.message)); }, []);

  const login = async (event) => {
    event.preventDefault(); const form = new FormData(event.currentTarget); setLoading(true); setError('');
    try { const session = await adminLogin(form.get('email'), form.get('password')); localStorage.setItem('admin-session-token', session.token); setToken(session.token); await load('ALL', 0, session.token); }
    catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };
  const open = (request) => {
    setSelected(request); setLatitude(request.latitude?.toString() ?? ''); setLongitude(request.longitude?.toString() ?? '');
    setCity(''); setLocality(''); setHospitalImage(null);
  };
  const approve = async () => {
    if (!latitude || !longitude || !city.trim() || !locality.trim() || !hospitalImage) {
      setError('Add the city, locality, GPS coordinates, and a hospital image before approving.'); return;
    }
    setLoading(true); setError('');
    try { await approveVerificationRequest(token, selected.id, { latitude, longitude, city, locality, hospitalImage }); setSelected(null); await load(status, data?.page ?? 0); }
    catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };
  const decline = async () => { try { await declineVerificationRequest(token, selected.id); setSelected(null); await load(status, data?.page ?? 0); } catch (err) { setError(err.message); } };
  const viewDocument = async (id, name) => { try { const blob = await getVerificationDocument(token, id, name); window.open(URL.createObjectURL(blob), '_blank', 'noopener,noreferrer'); } catch (err) { setError(err.message); } };
  const logout = async () => { try { await adminLogout(token); } finally { localStorage.removeItem('admin-session-token'); setToken(''); setData(null); } };

  return <div className="admin-page">
    <header><div className="wrap top"><div className="logo"><span className="cross">+</span> Swasthya Compare</div>{token ? <button className="secondary" onClick={logout} type="button">Logout</button> : <a className="secondary" href="/">Patient site</a>}</div></header>
    <main className="wrap portal">
      <div className="admin-review-switch"><span className="primary">Hospital</span><a className="secondary" href="/admin/patient-reviews">Patient</a></div>
      <div className="portal-heading"><div><div className="eyebrow">Restricted area</div><h1>Hospital verification review</h1><p>Review documents, then add the hospital location and image before approval.</p></div></div>
      {!token && <section className="portal-card"><form className="admin-key" onSubmit={login}><label>Admin email<input name="email" type="email" required /></label><label>Admin password<input name="password" type="password" required /></label><button className="primary" disabled={loading} type="submit">{loading ? 'Signing in…' : 'Admin login'}</button></form></section>}
      {token && data && <section className="service-list"><div className="admin-tabs">{['ALL', 'PENDING', 'APPROVED', 'DECLINED'].map((item) => <button className={status === item ? 'primary' : 'secondary'} key={item} onClick={() => load(item)} type="button">{item[0] + item.slice(1).toLowerCase()}</button>)}</div><h2>{status[0] + status.slice(1).toLowerCase()} requests</h2>{data.records.length === 0 ? <p className="empty">No {status.toLowerCase()} verification requests.</p> : <div className="table-wrap"><table className="admin-table"><thead><tr><th>Hospital</th><th>Gmail address</th><th>Submitted</th><th>Status</th></tr></thead><tbody>{data.records.map((request) => <tr key={request.id}><td><button className="hospital-name-link" onClick={() => open(request)} type="button">{request.hospitalName}</button></td><td>{request.workEmail}</td><td>{new Date(request.submittedAt).toLocaleDateString()}</td><td><span className="status">{request.status}</span></td></tr>)}</tbody></table></div>}<div className="pagination"><button className="secondary" disabled={!data.page} onClick={() => load(status, data.page - 1)} type="button">Previous</button><span>Page {data.page + 1} of {Math.max(data.totalPages, 1)} · {data.totalRecords} records</span><button className="secondary" disabled={data.page + 1 >= data.totalPages} onClick={() => load(status, data.page + 1)} type="button">Next</button></div></section>}
      {error && <p className="login-error" role="alert">{error}</p>}
      {selected && <div className="modal" onClick={() => setSelected(null)} role="presentation"><div className="modal-box review-details" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true"><div className="card-title"><h2>{selected.hospitalName}</h2><span className="status">{selected.status}</span></div><dl className="request-details"><div><dt>Address</dt><dd>{selected.address}</dd></div><div><dt>Contact number</dt><dd>{selected.contactNumber}</dd></div><div><dt>Gmail address</dt><dd>{selected.workEmail}</dd></div><div><dt>Documents</dt><dd><ul className="review-document-list">{selected.documentNames.map((name) => <li key={name}><span>{name}</span><button className="secondary" onClick={() => viewDocument(selected.id, name)} type="button">View document</button></li>)}</ul></dd></div></dl>{selected.status === 'PENDING' && <div className="portal-card"><h3>Hospital directory details</h3><p className="text-small">These details are saved to the database and shown in the patient apps after approval.</p><label>Hospital city<select value={city} onChange={(event) => setCity(event.target.value)} required><option value="" disabled>Select a city</option>{cities.map((item) => <option key={item} value={item}>{item}</option>)}</select></label><label>Hospital locality<input value={locality} onChange={(event) => setLocality(event.target.value)} placeholder="e.g. MVP Colony" required /></label><label>Latitude<input value={latitude} onChange={(event) => setLatitude(event.target.value)} inputMode="decimal" placeholder="e.g. 17.6868" required /></label><label>Longitude<input value={longitude} onChange={(event) => setLongitude(event.target.value)} inputMode="decimal" placeholder="e.g. 83.2185" required /></label><label>Hospital image<input accept="image/png,image/jpeg" onChange={(event) => setHospitalImage(event.target.files?.[0] ?? null)} type="file" required /></label>{hospitalImage && <p className="text-small">Selected image: {hospitalImage.name}</p>}</div>}{selected.status !== 'PENDING' && <p className="text-small">Latitude: {selected.latitude ?? 'Not set'} · Longitude: {selected.longitude ?? 'Not set'}</p>}<div className="modal-actions">{selected.status === 'PENDING' && <><button className="secondary" onClick={decline} type="button">Decline</button><button className="primary" disabled={loading} onClick={approve} type="button">Approve and create account</button></>}<button className="secondary" onClick={() => setSelected(null)} type="button">Close</button></div></div></div>}
    </main>
  </div>;
}
