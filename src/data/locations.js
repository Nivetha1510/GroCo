/* Country list plus India's states/cities for the checkout dropdowns.
   Other countries fall back to free-text State/City fields since we
   don't carry data for them. */
export const COUNTRIES = [
  'India',
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'United Arab Emirates',
  'Singapore',
];

export const INDIA_STATES_CITIES = {
  'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Tirupati'],
  'Delhi': ['New Delhi', 'Dwarka', 'Rohini', 'Saket'],
  'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot'],
  'Karnataka': ['Bengaluru', 'Mysuru', 'Mangaluru', 'Hubballi'],
  'Kerala': ['Kochi', 'Thiruvananthapuram', 'Kozhikode', 'Thrissur'],
  'Madhya Pradesh': ['Bhopal', 'Indore', 'Gwalior', 'Jabalpur'],
  'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Nashik'],
  'Punjab': ['Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala'],
  'Rajasthan': ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota'],
  'Tamil Nadu': [
    'Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem',
    'Tirunelveli', 'Erode', 'Vellore', 'Thoothukudi', 'Dindigul',
    'Thanjavur', 'Ranipet', 'Nagercoil', 'Tiruvannamalai', 'Tiruppur',
    'Avadi', 'Tambaram', 'Kanchipuram', 'Cuddalore', 'Karur', 'Hosur',
    'Pollachi', 'Sivakasi', 'Rajapalayam', 'Karaikudi', 'Kumbakonam',
    'Nagapattinam', 'Pudukkottai', 'Ramanathapuram', 'Sivaganga',
    'Namakkal', 'Krishnagiri', 'Dharmapuri', 'Udhagamandalam (Ooty)',
    'Kodaikanal', 'Virudhunagar', 'Theni', 'Ariyalur', 'Perambalur',
    'Villupuram', 'Tiruvarur',
  ],
  'Telangana': ['Hyderabad', 'Warangal', 'Nizamabad'],
  'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Noida', 'Varanasi'],
  'West Bengal': ['Kolkata', 'Howrah', 'Durgapur', 'Siliguri'],
};

export const INDIA_STATES = Object.keys(INDIA_STATES_CITIES);
