import { Scheme, Office } from '../types';

export const SCHEMES: Scheme[] = [
  {
    id: 'pm-kisan',
    name: 'PM-KISAN Samman Nidhi',
    category: 'Agriculture',
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    description: 'Financial support of ₹6,000 per year to farmer families across India in three equal installments.',
    eligibility: ['Small and marginal farmers', 'Land holding up to 2 hectares', 'Valid Aadhaar card required'],
    benefits: ['₹6,000 per year', 'Direct bank transfer', 'Three installments of ₹2,000'],
    documents: ['Aadhaar Card', 'Land Records', 'Bank Account Details', 'Mobile Number'],
    applyUrl: 'https://pmkisan.gov.in',
    tag: 'Popular',
  },
  {
    id: 'ayushman-bharat',
    name: 'Ayushman Bharat PM-JAY',
    category: 'Healthcare',
    ministry: 'Ministry of Health & Family Welfare',
    description: 'Health insurance coverage of ₹5 lakh per family per year for secondary and tertiary hospitalization.',
    eligibility: ['BPL families', 'SECC database beneficiaries', 'No income ceiling for specific categories'],
    benefits: ['₹5 lakh health coverage', 'Cashless treatment', '25,000+ empanelled hospitals'],
    documents: ['Aadhaar Card', 'Ration Card', 'Income Certificate', 'Caste Certificate (if applicable)'],
    applyUrl: 'https://pmjay.gov.in',
    tag: 'Popular',
  },
  {
    id: 'pm-awas',
    name: 'PM Awas Yojana (Gramin)',
    category: 'Housing',
    ministry: 'Ministry of Rural Development',
    description: 'Financial assistance for construction of pucca houses for rural households living in kutcha houses.',
    eligibility: ['Rural households', 'Homeless or kutcha house dwellers', 'SECC list beneficiaries'],
    benefits: ['₹1.2 lakh in plains', '₹1.3 lakh in hilly areas', 'Free LPG connection', 'Toilet construction'],
    documents: ['Aadhaar Card', 'BPL Certificate', 'Land Documents', 'Bank Account'],
    applyUrl: 'https://pmayg.nic.in',
    tag: 'New',
  },
  {
    id: 'nsp',
    name: 'National Scholarship Portal',
    category: 'Education',
    ministry: 'Ministry of Education',
    description: 'Single-stop solution for students to apply for central and state government scholarships.',
    eligibility: ['Students from class 1 to PhD', 'Income below ₹2.5 lakh per annum', 'Minimum 50% marks'],
    benefits: ['₹500 to ₹50,000 per year', 'Book allowance', 'Hostel charges'],
    documents: ['Aadhaar Card', 'Income Certificate', 'Marksheet', 'Bank Account', 'Caste Certificate'],
    applyUrl: 'https://scholarships.gov.in',
  },
  {
    id: 'passport-seva',
    name: 'Passport Seva Program',
    category: 'Public Services',
    ministry: 'Ministry of External Affairs',
    description: 'Streamlined passport application and renewal services through Passport Seva Kendras across India.',
    eligibility: ['Indian citizens', 'Valid documents', 'No criminal record'],
    benefits: ['Fresh passport in 30 days', 'Tatkal in 3-5 days', 'Online tracking'],
    documents: ['Birth Certificate', 'Aadhaar Card', 'Address Proof', 'Photo ID'],
    applyUrl: 'https://passportindia.gov.in',
  },
  {
    id: 'aadhaar',
    name: 'Aadhaar Enrollment & Services',
    category: 'Public Services',
    ministry: 'UIDAI',
    description: 'Unique identification system for Indian residents providing a 12-digit identity number.',
    eligibility: ['All Indian residents', 'Children with parental consent', 'Foreign nationals with 182+ days stay'],
    benefits: ['Digital identity proof', 'DBT subsidy receipt', 'eKYC services'],
    documents: ['Proof of Identity', 'Proof of Address', 'Date of Birth proof'],
    applyUrl: 'https://uidai.gov.in',
  },
  {
    id: 'digilocker',
    name: 'DigiLocker',
    category: 'Public Services',
    ministry: 'Ministry of Electronics & IT',
    description: 'Digital platform for storage and sharing of government-issued documents in digital format.',
    eligibility: ['All Indian citizens', 'Mobile number linked to Aadhaar'],
    benefits: ['1 GB free storage', 'Legally valid documents', 'Paperless access'],
    documents: ['Aadhaar Card', 'Mobile Number'],
    applyUrl: 'https://digilocker.gov.in',
  },
  {
    id: 'mudra-yojana',
    name: 'PM Mudra Yojana',
    category: 'Employment',
    ministry: 'Ministry of Finance',
    description: 'Micro loans up to ₹10 lakh for small and micro businesses to promote entrepreneurship.',
    eligibility: ['Small business owners', 'Micro enterprises', 'Age 18-65 years'],
    benefits: ['Loans up to ₹10 lakh', 'No collateral required', 'Low interest rates'],
    documents: ['Aadhaar Card', 'PAN Card', 'Business Plan', 'Bank Statement'],
    applyUrl: 'https://mudra.org.in',
    tag: 'Popular',
  },
  {
    id: 'sukanya-samriddhi',
    name: 'Sukanya Samriddhi Yojana',
    category: 'Women',
    ministry: 'Ministry of Finance',
    description: 'Small savings scheme for the welfare of the girl child with attractive interest rates.',
    eligibility: ['Girl child below 10 years', 'One account per girl', 'Indian residents only'],
    benefits: ['8.2% interest rate', 'Tax exemption under 80C', 'Maturity at 21 years'],
    documents: ['Birth Certificate of Girl', 'Parent Aadhaar', 'Address Proof', 'Photo'],
    applyUrl: 'https://nsiindia.gov.in',
  },
  {
    id: 'pm-ujjwala',
    name: 'PM Ujjwala Yojana',
    category: 'Women',
    ministry: 'Ministry of Petroleum & Natural Gas',
    description: 'Free LPG connections to women from BPL households for clean cooking fuel.',
    eligibility: ['Women from BPL households', 'Age 18+', 'No existing LPG connection'],
    benefits: ['Free LPG connection', 'Subsidy on cylinders', 'Clean cooking fuel'],
    documents: ['BPL Ration Card', 'Aadhaar Card', 'Bank Account'],
    applyUrl: 'https://pmuy.gov.in',
  },
  {
    id: 'e-shram',
    name: 'e-Shram Portal',
    category: 'Employment',
    ministry: 'Ministry of Labour & Employment',
    description: 'National database of unorganized workers providing social security benefits.',
    eligibility: ['Unorganized workers', 'Age 16-59 years', 'Not an EPFO/ESIC member'],
    benefits: ['₹2 lakh accident insurance', 'Social security access', 'Portable UAN'],
    documents: ['Aadhaar Card', 'Mobile Number', 'Bank Account'],
    applyUrl: 'https://eshram.gov.in',
  },
  {
    id: 'kisan-credit-card',
    name: 'Kisan Credit Card',
    category: 'Agriculture',
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    description: 'Credit facility for farmers to meet agricultural and allied activities expenses.',
    eligibility: ['Farmers with land ownership', 'Tenant farmers', 'Self-help groups'],
    benefits: ['Credit up to ₹3 lakh', '4% interest rate', 'Flexible repayment'],
    documents: ['Land Records', 'Aadhaar Card', 'Bank Account', 'Photograph'],
    applyUrl: 'https://nabard.org',
  },
];

export const OFFICES: Office[] = [
  {
    id: '1',
    name: 'Common Service Centre (CSC)',
    type: 'CSC Centre',
    address: 'Village Panchayat Office, Ward 3, Thiruvananthapuram',
    distance: '0.8 km',
    status: 'Open',
    timing: '9:00 AM - 6:00 PM',
    phone: '1800-121-3468',
  },
  {
    id: '2',
    name: 'Collectorate Office',
    type: 'Collector Office',
    address: 'District Collectorate, MG Road, Thiruvananthapuram',
    distance: '2.3 km',
    status: 'Open',
    timing: '10:00 AM - 5:00 PM',
    phone: '0471-2321360',
  },
  {
    id: '3',
    name: 'Passport Seva Kendra',
    type: 'Passport Seva Kendra',
    address: 'Technopark Phase 1, Thiruvananthapuram',
    distance: '4.1 km',
    status: 'Open',
    timing: '9:00 AM - 4:30 PM',
    phone: '1800-258-1800',
  },
  {
    id: '4',
    name: 'Government General Hospital',
    type: 'Government Hospital',
    address: 'Medical College Road, Thiruvananthapuram',
    distance: '1.6 km',
    status: 'Open',
    timing: '24 Hours',
    phone: '0471-2528386',
  },
  {
    id: '5',
    name: 'Police Station',
    type: 'Police Station',
    address: 'Museum Road, Thiruvananthapuram',
    distance: '1.2 km',
    status: 'Open',
    timing: '24 Hours',
    phone: '100',
  },
  {
    id: '6',
    name: 'Grama Panchayat Office',
    type: 'Panchayat Office',
    address: 'Kazhakootam, Thiruvananthapuram',
    distance: '3.4 km',
    status: 'Open',
    timing: '9:00 AM - 5:00 PM',
    phone: '0471-2413213',
  },
  {
    id: '7',
    name: 'Village Office',
    type: 'Village Office',
    address: 'Vattiyoorkavu, Thiruvananthapuram',
    distance: '2.9 km',
    status: 'Limited Hours',
    timing: '10:00 AM - 3:00 PM',
    phone: '0471-2360142',
  },
  {
    id: '8',
    name: 'Regional Transport Office',
    type: 'RTO',
    address: 'Kowdiar, Thiruvananthapuram',
    distance: '3.7 km',
    status: 'Open',
    timing: '9:30 AM - 5:00 PM',
    phone: '0471-2724750',
  },
];

export const QUICK_PROMPTS = [
  { icon: '🏛', label: 'Find government schemes', query: 'What government schemes am I eligible for?' },
  { icon: '🚜', label: 'Farmer schemes', query: 'What schemes are available for farmers in India?' },
  { icon: '🎓', label: 'Student scholarships', query: 'What scholarships are available for students?' },
  { icon: '🏥', label: 'Health insurance', query: 'Tell me about Ayushman Bharat health insurance scheme' },
  { icon: '🪪', label: 'Aadhaar services', query: 'How do I update my Aadhaar card details?' },
  { icon: '🛂', label: 'Passport application', query: 'How to apply for a new passport in India?' },
  { icon: '🚗', label: 'Driving licence', query: 'What is the process to get a driving licence?' },
  { icon: '🏠', label: 'Housing schemes', query: 'Tell me about PM Awas Yojana housing scheme' },
];

export const CATEGORY_ICONS: Record<string, string> = {
  Agriculture: '🌾',
  Education: '🎓',
  Healthcare: '🏥',
  Housing: '🏠',
  Employment: '💼',
  Women: '👩',
  'Public Services': '🏛',
  Business: '🏢',
  'Senior Citizens': '👴',
  Students: '📚',
};

export const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'ml', name: 'Malayalam' },
  { code: 'hi', name: 'Hindi' },
  { code: 'ta', name: 'Tamil' },
  { code: 'kn', name: 'Kannada' },
];

export const MOCK_AI_RESPONSES: Record<string, string> = {
  default: `I'm CivicSense, your AI-powered Government Services Assistant. I can help you with:

**Government Schemes & Benefits**
- Find schemes you're eligible for based on your profile
- Explain eligibility criteria and application process

**Document Services**
- Aadhaar, PAN, Passport, Driving Licence
- Birth Certificate, Income Certificate, Caste Certificate

**Application Guidance**
- Step-by-step application procedures
- Required documents checklist
- Official portal links

Please ask me anything about government services, and I'll provide accurate information sourced from official government portals. What would you like to know?`,
  
  farmer: `## Farmer Schemes in India

Here are the major government schemes available for farmers:

### 1. PM-KISAN Samman Nidhi
- **Benefit:** ₹6,000/year in 3 installments
- **Eligibility:** Small & marginal farmers with up to 2 hectares land
- **Apply:** [pmkisan.gov.in](https://pmkisan.gov.in)

### 2. Kisan Credit Card (KCC)
- **Benefit:** Credit up to ₹3 lakh at 4% interest
- **Eligibility:** All farmers with land ownership
- **Apply:** Through nearest bank branch

### 3. PM Fasal Bima Yojana
- **Benefit:** Crop insurance coverage
- **Eligibility:** All farmers growing notified crops
- **Apply:** Through banks/insurance companies

### 4. Soil Health Card Scheme
- **Benefit:** Free soil testing & nutrient recommendations
- **Eligibility:** All farmers
- **Apply:** Through nearest Krishi Vigyan Kendra

Would you like detailed information about any specific scheme?`,

  passport: `## Passport Application Process

### How to Apply for a Fresh Passport

**Step 1: Register Online**
Visit [passportindia.gov.in](https://passportindia.gov.in) and create an account

**Step 2: Fill Application**
Complete Form DS-11 with personal details, family information

**Step 3: Upload Documents**
- Birth Certificate or 10th Marksheet
- Aadhaar Card (mandatory)
- Address Proof
- Recent Passport Photo

**Step 4: Book Appointment**
Select nearest Passport Seva Kendra and choose appointment slot

**Step 5: Visit PSK**
Carry original documents and application form printout

**Step 6: Biometrics & Verification**
Fingerprints and photo capture at PSK

### Fees
| Type | Normal | Tatkal |
|------|--------|--------|
| Fresh (36 pages) | ₹1,500 | ₹3,500 |
| Fresh (60 pages) | ₹2,000 | ₹4,000 |
| Renewal | ₹1,500 | ₹3,500 |

### Processing Time
- Normal: 30-45 days
- Tatkal: 3-5 days

Need help with any specific step?`,
};
