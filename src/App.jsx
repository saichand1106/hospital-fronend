import { useState } from 'react';
import { cities, localities, treatments } from './data.js';

function HospitalCard({ hospital, onEstimate }) {
  return <article className={`hospital ${hospital.best ? 'best' : ''}`}>
    {hospital.best && <span className="badge">Most affordable</span>}
    <h3>{hospital.name}</h3>
    <div className="place">{hospital.distance} · Bengaluru</div>
    <div className="price-label">Estimated package price</div>
    <div className="price">{hospital.price}</div>
    <div className="includes">Includes hospital package*</div>
    <div className="details">
      <div>Estimated stay<strong>{hospital.stay}</strong></div>
      <div>Package note<strong>{hospital.note}</strong></div>
    </div>
    <button className="compare" onClick={() => onEstimate(hospital)} type="button">Request detailed estimate</button>
  </article>;
}

export default function App() {
  const [treatment, setTreatment] = useState('angioplasty');
  const [city, setCity] = useState('Bengaluru');
  const [locality, setLocality] = useState('Indiranagar');
  const [submitted, setSubmitted] = useState({ treatment: 'angioplasty', city: 'Bengaluru', locality: 'Indiranagar' });
  const [selectedHospital, setSelectedHospital] = useState(null);
  const selectedTreatment = treatments[submitted.treatment];
  const compare = (event) => {
    event.preventDefault();
    setSubmitted({ treatment, city, locality });
    document.getElementById('compare')?.scrollIntoView({ behavior: 'smooth' });
  };

  return <>
    <header><div className="wrap top"><div className="logo"><span className="cross">+</span> Swasthya Compare</div><nav><a href="#compare">Compare prices</a><a href="#how">How it works</a><button className="lang" type="button">English ▾</button></nav></div></header>
    <section className="hero"><div className="wrap"><div className="eyebrow">Clearer healthcare choices</div><h1>Know treatment prices before you choose a hospital.</h1><p>Compare estimated treatment packages from hospitals near you. Start with the price, then choose with the details you need.</p>
      <form className="finder" onSubmit={compare}>
        <label>Treatment<select value={treatment} onChange={(e) => setTreatment(e.target.value)}>{Object.entries(treatments).map(([key, item]) => <option key={key} value={key}>{item.label}</option>)}</select></label>
        <label>City<select value={city} onChange={(e) => setCity(e.target.value)}>{cities.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label>Locality<select value={locality} onChange={(e) => setLocality(e.target.value)}>{localities.map((item) => <option key={item}>{item}</option>)}</select></label>
        <button className="primary" type="submit">Compare prices</button>
      </form>
    </div></section>
    <main className="wrap" id="compare"><div className="section-head"><div><h2>{selectedTreatment.label} in {submitted.locality}</h2><div className="result">{selectedTreatment.hospitals.length} hospitals with price information</div></div><div className="result">Sorted by estimated package price</div></div>
      <div className="notice">Prices are indicative package estimates supplied by hospitals and may change based on the patient’s condition, room type, implants, medicines and complications. Confirm the final estimate directly with the hospital.</div>
      <div className="grid">{selectedTreatment.hospitals.map((hospital) => <HospitalCard key={hospital.name} hospital={hospital} onEstimate={setSelectedHospital} />)}</div>
      <section id="how"><div className="section-head"><h2>How Swasthya Compare works</h2></div><div className="how"><article className="step"><span className="number">1</span><h3>Search a treatment</h3><p>Choose a procedure and locality to see hospitals that have shared their price packages.</p></article><article className="step"><span className="number">2</span><h3>Compare what’s included</h3><p>See the package range, stay duration, doctor fee and what needs confirmation.</p></article><article className="step"><span className="number">3</span><h3>Talk to the hospital</h3><p>Request a written estimate before admission, then decide what works for you.</p></article></div></section>
    </main>
    <footer><div className="wrap">Demo prototype · No medical advice or final billing estimate is provided.</div></footer>
    {selectedHospital && <div className="modal" onClick={() => setSelectedHospital(null)} role="presentation"><div className="modal-box" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="modal-title"><h2 id="modal-title">Request an estimate</h2><p>You selected {selectedHospital.name}. Their current indicative package for {selectedTreatment.label} starts at {selectedHospital.price}. A real app would collect a contact preference and securely send an estimate request to the hospital.</p><div className="modal-actions"><button className="secondary" onClick={() => setSelectedHospital(null)} type="button">Close</button><button className="primary" type="button">Continue to hospital</button></div></div></div>}
  </>;
}
