const diagnosticHospitals = (lowestPrice, middlePrice, highestPrice, note = 'Report included') => [
  { name: 'Sankalp Diagnostics', distance: '1.6 km away', price: lowestPrice, stay: 'Same day', note, best: true },
  { name: 'Indiranagar Multi-speciality', distance: '2.4 km away', price: middlePrice, stay: 'Same day', note: 'Doctor review extra' },
  { name: 'East Bengaluru Hospital', distance: '3.7 km away', price: highestPrice, stay: 'Same day', note: 'Digital report included' },
];

export const treatments = {
  angioplasty: {
    label: 'Angioplasty / stent',
    hospitals: [
      { name: 'Sankalp Heart Centre', distance: '1.8 km away', price: '₹1,42,000', stay: '1 day', note: 'Doctor fee included', best: true },
      { name: 'Indiranagar Multi-speciality', distance: '2.4 km away', price: '₹1,68,000', stay: '2 days', note: 'Stent extra' },
      { name: 'East Bengaluru Hospital', distance: '3.7 km away', price: '₹2,05,000', stay: '2 days', note: 'ICU included' },
    ],
  },
  cataract: {
    label: 'Cataract surgery',
    hospitals: [
      { name: 'VisionCare Eye Hospital', distance: '1.1 km away', price: '₹28,000', stay: 'Same day', note: 'Standard lens included', best: true },
      { name: 'ClearSight Clinic', distance: '2.8 km away', price: '₹35,000', stay: 'Same day', note: 'Premium lens extra' },
      { name: 'Indiranagar Multi-speciality', distance: '2.4 km away', price: '₹49,000', stay: '1 day', note: 'Premium lens included' },
    ],
  },
  fracture: {
    label: 'Fracture treatment',
    hospitals: [
      { name: 'Ortho First Hospital', distance: '1.4 km away', price: '₹45,000', stay: '1 day', note: 'X-ray and plaster included', best: true },
      { name: 'East Bengaluru Hospital', distance: '3.7 km away', price: '₹62,000', stay: '2 days', note: 'Implant extra' },
      { name: 'Indiranagar Multi-speciality', distance: '2.4 km away', price: '₹78,000', stay: '2 days', note: 'Physiotherapy included' },
    ],
  },
  delivery: {
    label: 'Normal delivery',
    hospitals: [
      { name: 'Mother & Child Care', distance: '1.6 km away', price: '₹38,000', stay: '2 days', note: 'Doctor fee included', best: true },
      { name: 'Indiranagar Multi-speciality', distance: '2.4 km away', price: '₹52,000', stay: '2 days', note: 'Private room upgrade extra' },
      { name: 'East Bengaluru Hospital', distance: '3.7 km away', price: '₹67,000', stay: '3 days', note: 'Newborn care included' },
    ],
  },
  bloodTests: { label: 'Blood tests', hospitals: diagnosticHospitals('₹450', '₹650', '₹900', 'Basic panel included') },
  urineTests: { label: 'Urine tests', hospitals: diagnosticHospitals('₹250', '₹350', '₹500') },
  ecg: { label: 'ECG', hospitals: diagnosticHospitals('₹300', '₹450', '₹700', 'ECG report included') },
  echocardiogram: { label: 'Echocardiogram', hospitals: diagnosticHospitals('₹1,500', '₹2,000', '₹2,800', 'Cardiologist report included') },
  xRay: { label: 'X-ray', hospitals: diagnosticHospitals('₹450', '₹650', '₹950', 'Single-view X-ray included') },
  ultrasound: { label: 'Ultrasound', hospitals: diagnosticHospitals('₹1,000', '₹1,400', '₹2,000', 'Radiology report included') },
  ctScan: { label: 'CT scan', hospitals: diagnosticHospitals('₹3,000', '₹4,500', '₹6,500', 'Contrast may cost extra') },
  mri: { label: 'MRI', hospitals: diagnosticHospitals('₹4,500', '₹6,500', '₹9,000', 'Contrast may cost extra') },
  petScan: { label: 'PET scan', hospitals: diagnosticHospitals('₹12,000', '₹16,000', '₹22,000', 'Radiotracer included') },
  mammogram: { label: 'Mammogram', hospitals: diagnosticHospitals('₹1,200', '₹1,600', '₹2,400', 'Digital mammogram included') },
  endoscopy: { label: 'Endoscopy', hospitals: diagnosticHospitals('₹3,500', '₹5,000', '₹7,500', 'Sedation may cost extra') },
  colonoscopy: { label: 'Colonoscopy', hospitals: diagnosticHospitals('₹5,000', '₹7,000', '₹10,000', 'Sedation may cost extra') },
  bronchoscopy: { label: 'Bronchoscopy', hospitals: diagnosticHospitals('₹7,000', '₹10,000', '₹14,000', 'Sedation included') },
  biopsy: { label: 'Biopsy', hospitals: diagnosticHospitals('₹2,000', '₹3,000', '₹5,000', 'Pathology report included') },
  geneticTesting: { label: 'Genetic testing', hospitals: diagnosticHospitals('₹6,000', '₹10,000', '₹18,000', 'Panel scope varies') },
  boneMarrow: { label: 'Bone marrow examination', hospitals: diagnosticHospitals('₹8,000', '₹12,000', '₹18,000', 'Pathology review included') },
  pathology: { label: 'Pathology testing', hospitals: diagnosticHospitals('₹600', '₹900', '₹1,500', 'Report included') },
  microbiology: { label: 'Microbiology / culture tests', hospitals: diagnosticHospitals('₹700', '₹1,000', '₹1,600', 'Culture and sensitivity included') },
};

export const cities = ['Agartala', 'Agra', 'Ahmedabad', 'Ahmednagar', 'Aizawl', 'Ajmer', 'Akola', 'Alappuzha', 'Aligarh', 'Alwar', 'Amaravati', 'Ambala', 'Amravati', 'Amritsar', 'Anand', 'Anantapur', 'Asansol', 'Aurangabad', 'Ayodhya', 'Azamgarh', 'Bahadurgarh', 'Ballari', 'Bengaluru', 'Berhampur', 'Bhagalpur', 'Bharatpur', 'Bhavnagar', 'Bhilai', 'Bhiwandi', 'Bhiwani', 'Bhopal', 'Bhubaneswar', 'Bhusawal', 'Bidar', 'Bikaner', 'Bilaspur', 'Bokaro', 'Chandigarh', 'Chandrapur', 'Chennai', 'Chittorgarh', 'Coimbatore', 'Cuttack', 'Darbhanga', 'Darjeeling', 'Davangere', 'Dehradun', 'Delhi', 'Dewas', 'Dhanbad', 'Dharmavaram', 'Dharwad', 'Dibrugarh', 'Dimapur', 'Dindigul', 'Durg', 'Durgapur', 'Erode', 'Etawah', 'Faridabad', 'Farrukhabad', 'Fatehpur', 'Firozabad', 'Gandhinagar', 'Gangtok', 'Gaya', 'Ghaziabad', 'Gorakhpur', 'Greater Noida', 'Gulbarga', 'Guntur', 'Gurugram', 'Guwahati', 'Gwalior', 'Haldia', 'Haridwar', 'Hisar', 'Hospet', 'Hubballi', 'Hyderabad', 'Ichalkaranji', 'Imphal', 'Indore', 'Jabalpur', 'Jaipur', 'Jalandhar', 'Jalgaon', 'Jalna', 'Jammu', 'Jamnagar', 'Jamshedpur', 'Jhansi', 'Jodhpur', 'Junagadh', 'Kakinada', 'Kalaburagi', 'Kalyan-Dombivli', 'Kanchipuram', 'Kannur', 'Kanpur', 'Karimnagar', 'Karnal', 'Katihar', 'Kavali', 'Kharagpur', 'Kochi', 'Kolhapur', 'Kolkata', 'Kollam', 'Korba', 'Kota', 'Kottayam', 'Kozhikode', 'Kurnool', 'Kushinagar', 'Latur', 'Ludhiana', 'Lucknow', 'Madurai', 'Malegaon', 'Mangaluru', 'Mathura', 'Meerut', 'Mirzapur', 'Moradabad', 'Morbi', 'Mumbai', 'Muzaffarnagar', 'Muzaffarpur', 'Mysuru', 'Nadiad', 'Nagaon', 'Nagpur', 'Nanded', 'Nashik', 'Navi Mumbai', 'Nellore', 'Noida', 'North Lakhimpur', 'Ongole', 'Ooty', 'Palakkad', 'Panchkula', 'Panipat', 'Panvel', 'Patiala', 'Patna', 'Phagwara', 'Pimpri-Chinchwad', 'Pondicherry', 'Pune', 'Puri', 'Purnia', 'Raichur', 'Raiganj', 'Raipur', 'Rajahmundry', 'Rajkot', 'Ranchi', 'Ratlam', 'Rewa', 'Rewari', 'Rohtak', 'Rourkela', 'Sagar', 'Saharanpur', 'Salem', 'Sambalpur', 'Sangli', 'Sasaram', 'Satara', 'Shillong', 'Shimla', 'Shivamogga', 'Sikar', 'Siliguri', 'Silvassa', 'Solapur', 'Sonipat', 'Srinagar', 'Surat', 'Surendranagar', 'Thane', 'Thanjavur', 'Thiruvananthapuram', 'Thoothukudi', 'Tiruchirappalli', 'Tirunelveli', 'Tirupati', 'Tiruppur', 'Tumakuru', 'Udaipur', 'Udupi', 'Ujjain', 'Ulhasnagar', 'Vadodara', 'Varanasi', 'Vasai-Virar', 'Vellore', 'Vijayawada', 'Visakhapatnam', 'Vizianagaram', 'Warangal', 'Yamunanagar'];
export const localities = ['Indiranagar', 'Whitefield', 'Koramangala'];
