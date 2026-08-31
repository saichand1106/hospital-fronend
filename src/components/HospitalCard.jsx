export default function HospitalCard({ hospital, city, onEstimate }) {
  return <article className={`hospital ${hospital.best ? 'best' : ''}`}>
    {hospital.best && <span className="badge">Verified price</span>}
    {hospital.patientReported && <span className="badge patient-reported">Patient-reported receipt</span>}
    <h3>{hospital.name}</h3>
    <div className="place">{hospital.distance} · {city}</div>
    <div className="price-label">Estimated package price</div>
    <div className="price">{hospital.price}</div>
    <div className="includes">Includes hospital package*</div>
    <div className="details"><div>Estimated stay<strong>{hospital.stay}</strong></div><div>Package note<strong>{hospital.note}</strong></div></div>
    <button className="compare" onClick={() => onEstimate(hospital)} type="button">Request detailed estimate</button>
  </article>;
}
