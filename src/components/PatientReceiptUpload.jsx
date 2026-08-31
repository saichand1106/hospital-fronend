import { useEffect, useState } from 'react';
import { getPublicHospitals, getTreatments, submitPatientReceipt } from '../api.js';
import { cities } from '../data.js';

const formatIndianAmount = (value) => {
  const digits = value.replace(/\D/g, '').replace(/^0+(?=\d)/, '');
  if (!digits) return '';
  const lastThree = digits.slice(-3); const rest = digits.slice(0, -3);
  return rest ? `${rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',')},${lastThree}` : lastThree;
};

export default function PatientReceiptUpload({ onClose }) {
  const [message, setMessage] = useState(''); const [error, setError] = useState(''); const [sending, setSending] = useState(false);
  const [treatments, setTreatments] = useState([]); const [treatment, setTreatment] = useState(''); const [hospitalCity, setHospitalCity] = useState(''); const [hospitalId, setHospitalId] = useState(''); const [hospitals, setHospitals] = useState([]); const [treatmentPrice, setTreatmentPrice] = useState(''); const [showSuggestions, setShowSuggestions] = useState(false);
  useEffect(() => { getTreatments().then(setTreatments).catch(() => {}); }, []);
  useEffect(() => {
    setHospitalId(''); setHospitals([]);
    if (!hospitalCity) return;
    getPublicHospitals(hospitalCity).then(setHospitals).catch((err) => setError(err.message));
  }, [hospitalCity]);
  const submit = async (event) => {
    event.preventDefault(); setSending(true); setError('');
    try {
      const formData = new FormData(event.currentTarget);
      formData.set('treatmentPrice', `₹${treatmentPrice}`);
      await submitPatientReceipt(formData);
      setMessage('Your receipt has been submitted for review.'); setHospitalCity(''); setHospitalId(''); setTreatmentPrice(''); event.currentTarget.reset();
    } catch (err) { setError(err.message); } finally { setSending(false); }
  };
  const matches = treatments.filter((item) => item.name.toLowerCase().includes(treatment.toLowerCase())).slice(0, 6);
  if (message) return <div className="modal" role="presentation"><div className="modal-box thank-you" role="dialog"><div className="success-icon">✓</div><h2>Receipt submitted</h2><p>Your receipt is now waiting for administrator review.</p><div className="modal-actions"><button className="primary" onClick={onClose} type="button">Back to home</button></div></div></div>;
  return <div className="modal" onClick={(event) => event.stopPropagation()} role="presentation"><div className="modal-box receipt-upload-modal" onClick={(event) => event.stopPropagation()} role="dialog"><button className="modal-close" onClick={onClose} type="button" aria-label="Close receipt upload">×</button><h2>Upload a patient receipt</h2><p>Select the hospital so an approved receipt is added to the correct hospital’s verified prices.</p><form onSubmit={submit}><label>Hospital city<select value={hospitalCity} onChange={(event) => setHospitalCity(event.target.value)} required><option value="" disabled>Select a city</option>{cities.map((city) => <option key={city} value={city}>{city}</option>)}</select></label><label>Hospital<select name="hospitalId" value={hospitalId} onChange={(event) => setHospitalId(event.target.value)} disabled={!hospitalCity || hospitals.length === 0} required><option value="" disabled>{!hospitalCity ? 'Select a city first' : hospitals.length ? 'Select a hospital' : 'No listed hospitals in this city'}</option>{hospitals.map((hospital) => <option key={hospital.id} value={hospital.id}>{hospital.name} — {hospital.locality}</option>)}</select></label><label className="receipt-treatment-picker">Treatment<input name="treatment" value={treatment} onChange={(event) => { setTreatment(event.target.value); setShowSuggestions(true); }} onFocus={() => setShowSuggestions(true)} onBlur={() => window.setTimeout(() => setShowSuggestions(false), 150)} placeholder="Type a treatment" required />{showSuggestions && treatment && <div className="receipt-treatment-suggestions">{matches.map((item) => <button key={item.id} onMouseDown={(event) => event.preventDefault()} onClick={() => { setTreatment(item.name); setShowSuggestions(false); }} type="button">{item.name}</button>)}</div>}<button className="receipt-not-listed" onMouseDown={(event) => event.preventDefault()} onClick={() => setShowSuggestions(false)} type="button">Not listed?</button></label><label>Treatment price<input name="treatmentPrice" value={treatmentPrice ? `₹${treatmentPrice}` : ''} onChange={(event) => setTreatmentPrice(formatIndianAmount(event.target.value))} placeholder="₹45,000" inputMode="numeric" required /></label><label>Receipt documents<input name="documents" type="file" accept=".pdf,.png,.jpg,.jpeg" multiple required /></label><p className="text-small">Enter digits only; the price is automatically formatted in ₹ with Indian commas.</p><p className="text-small">Upload 1–5 PDF, PNG, or JPG receipt documents.</p>{error && <p className="login-error">{error}</p>}<div className="modal-actions"><button className="secondary" onClick={onClose} type="button">Close</button><button className="primary" disabled={sending} type="submit">{sending ? 'Submitting…' : 'Submit receipt'}</button></div></form></div></div>;
}
